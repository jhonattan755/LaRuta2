import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Key, 
  CheckCircle, 
  XCircle,
  Search,
  HeartPulse
} from "lucide-react";

function PanelDeEmpleados() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado inicial con formato correcto
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      names: "Jhonattan Ulises", 
      lastNames: "Sanchez Martinez", 
      email: "admin@laruta.com", 
      pass: "admin123", 
      role: "Administrador", 
      status: "Activo",
      dui: "00000000-0",
      phone: "7000-0000",
      address: "San Salvador, El Salvador",
      birthDate: "2000-01-01",
      age: 26,
      nationality: "Salvadoreña",
      civilStatus: "Soltero/a",
      gender: "Masculino",
      bloodType: "O+"
    }
  ]);

  // Estados del Formulario
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formNames, setFormNames] = useState("");
  const [formLastNames, setFormLastNames] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPass, setFormPass] = useState("");
  const [formRole, setFormRole] = useState("Empleado");
  const [formStatus, setFormStatus] = useState("Activo");
  const [formDui, setFormDui] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formBirthDate, setFormBirthDate] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formNationality, setFormNationality] = useState("Salvadoreña");
  const [formCivilStatus, setFormCivilStatus] = useState("Soltero/a");
  const [formGender, setFormGender] = useState("Masculino");
  const [formBloodType, setFormBloodType] = useState("O+");

  const adminCount = employees.filter(emp => emp.role === "Administrador").length;

  // ─── VALIDACIONES Y MÁSCARAS EN TIEMPO REAL ───

  // Filtro estricto para solo letras y espacios (Nombres, Apellidos, Nacionalidad)
  const handleLetterInput = (value, setter) => {
    const onlyLetters = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
    setter(onlyLetters);
  };

  // Máscara automática para DUI (00000000-0) - Máximo 9 números
  const handleDuiChange = (value) => {
    const onlyNums = value.replace(/\D/g, ""); // Remueve lo que no sea número
    if (onlyNums.length > 9) return; // Limite estricto de números

    if (onlyNums.length > 8) {
      setFormDui(`${onlyNums.slice(0, 8)}-${onlyNums.slice(8)}`);
    } else {
      setFormDui(onlyNums);
    }
  };

  // Máscara automática para Teléfono (0000-0000) - Máximo 8 números
  const handlePhoneChange = (value) => {
    const onlyNums = value.replace(/\D/g, ""); // Remueve lo que no sea número
    if (onlyNums.length > 8) return; // Limite estricto de números

    if (onlyNums.length > 4) {
      setFormPhone(`${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`);
    } else {
      setFormPhone(onlyNums);
    }
  };

  // Calcula la edad automáticamente según la fecha seleccionada
  const handleBirthDateChange = (dateString) => {
    setFormBirthDate(dateString);
    if (!dateString) {
      setFormAge("");
      return;
    }
    const today = new Date();
    const birthDate = new Date(dateString);
    let ageCalculated = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      ageCalculated--;
    }
    setFormAge(ageCalculated >= 0 ? ageCalculated : 0);
  };

  // Guardar o Editar con Validación de longitudes finales
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formNames.trim() || !formLastNames.trim() || !formEmail.trim() || !formPass.trim()) {
      alert("⚠️ Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Validar longitudes reales antes de guardar
    if (formDui.length !== 10) {
      alert("⚠️ El DUI no está completo. Debe tener exactamente 9 dígitos (00000000-0).");
      return;
    }

    if (formPhone.length !== 9) {
      alert("⚠️ El número de teléfono no está completo. Debe tener exactamente 8 dígitos (0000-0000).");
      return;
    }

    const employeeData = {
      names: formNames.trim(),
      lastNames: formLastNames.trim(),
      email: formEmail.trim(),
      pass: formPass,
      role: formRole,
      status: formStatus,
      dui: formDui,
      phone: formPhone,
      address: formAddress.trim(),
      birthDate: formBirthDate,
      age: formAge,
      nationality: formNationality.trim(),
      civilStatus: formCivilStatus,
      gender: formGender,
      bloodType: formBloodType
    };

    if (isEditing) {
      setEmployees(employees.map(emp => emp.id === currentId ? { ...emp, ...employeeData } : emp));
      setIsEditing(false);
    } else {
      setEmployees([...employees, { id: Date.now(), ...employeeData }]);
    }

    resetForm();
  };

  const handleEdit = (emp) => {
    setIsEditing(true);
    setCurrentId(emp.id);
    setFormNames(emp.names);
    setFormLastNames(emp.lastNames);
    setFormEmail(emp.email);
    setFormPass(emp.pass);
    setFormRole(emp.role);
    setFormStatus(emp.status);
    setFormDui(emp.dui);
    setFormPhone(emp.phone);
    setFormAddress(emp.address);
    setFormBirthDate(emp.birthDate);
    setFormAge(emp.age);
    setFormNationality(emp.nationality);
    setFormCivilStatus(emp.civilStatus);
    setFormGender(emp.gender);
    setFormBloodType(emp.bloodType);
  };

  const handleDelete = (id, role) => {
    if (role === "Administrador" && adminCount <= 1) {
      alert("⚠️ No puedes eliminar al único Administrador del sistema.");
      return;
    }
    if (window.confirm("¿Estás seguro de que deseas eliminar este expediente?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormNames("");
    setFormLastNames("");
    setFormEmail("");
    setFormPass("");
    setFormRole("Empleado");
    setFormStatus("Activo");
    setFormDui("");
    setFormPhone("");
    setFormAddress("");
    setFormBirthDate("");
    setFormAge("");
    setFormNationality("Salvadoreña");
    setFormCivilStatus("Soltero/a");
    setFormGender("Masculino");
    setFormBloodType("O+");
  };

  const filteredEmployees = employees.filter(emp => 
    `${emp.names} ${emp.lastNames}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dui.includes(searchTerm) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="text-blue-900" /> Expedientes de Personal - La Ruta
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Módulo con validación estricta de formatos de identidad e información local.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* ─── FORMULARIO PROTEGIDO ─── */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserPlus size={16} className="text-blue-900" /> 
              {isEditing ? "Modificar Expediente" : "Nuevo Expediente"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
              
              {/* Bloque 1: Credenciales */}
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100 space-y-2">
                <span className="text-[10px] uppercase text-blue-900 block font-black">1. Credenciales y Sistema</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">Correo *</label>
                    <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="correo@laruta.com" className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 font-medium outline-none" required />
                  </div>
                  <div>
                    <label className="block mb-0.5">Contraseña *</label>
                    <input type="text" value={formPass} onChange={(e) => setFormPass(e.target.value)} placeholder="Pass" className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 font-mono font-medium outline-none" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">Rol de Permiso</label>
                    <select value={formRole} onChange={(e) => setFormRole(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 outline-none">
                      <option value="Administrador">Administrador</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Repartidor">Repartidor</option>
                      <option value="Usuario">Usuario</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-0.5">Estado</label>
                    <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 outline-none">
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bloque 2: Información Personal */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-slate-400 block font-black">2. Información Personal</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">Nombres *</label>
                    <input type="text" value={formNames} onChange={(e) => handleLetterInput(e.target.value, setFormNames)} placeholder="Solo letras" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium outline-none" required />
                  </div>
                  <div>
                    <label className="block mb-0.5">Apellidos *</label>
                    <input type="text" value={formLastNames} onChange={(e) => handleLetterInput(e.target.value, setFormLastNames)} placeholder="Solo letras" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">DUI *</label>
                    <input type="text" value={formDui} onChange={(e) => handleDuiChange(e.target.value)} placeholder="00000000-0" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-mono font-medium outline-none" required />
                  </div>
                  <div>
                    <label className="block mb-0.5">Teléfono *</label>
                    <input type="text" value={formPhone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="0000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-mono font-medium outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block mb-0.5">Fecha Nacimiento</label>
                    <input type="date" value={formBirthDate} onChange={(e) => handleBirthDateChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium outline-none" />
                  </div>
                  <div>
                    <label className="block mb-0.5">Edad</label>
                    <input type="text" value={formAge} readOnly placeholder="Auto" className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2 py-2 text-center text-slate-500 cursor-not-allowed font-mono" />
                  </div>
                </div>

                <div>
                  <label className="block mb-0.5">Dirección Exacta</label>
                  <textarea value={formAddress} onChange={(e) => setFormAddress(e.target.value)} placeholder="Dirección residencial..." rows="2" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium outline-none resize-none"></textarea>
                </div>
              </div>

              {/* Bloque 3: Datos Civiles y Médicos */}
              <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100 space-y-2">
                <span className="text-[10px] uppercase text-slate-400 block font-black">3. Datos Civiles y Salud</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">Nacionalidad</label>
                    <input type="text" value={formNationality} onChange={(e) => handleLetterInput(e.target.value, setFormNationality)} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium outline-none" />
                  </div>
                  <div>
                    <label className="block mb-0.5">Estado Civil</label>
                    <select value={formCivilStatus} onChange={(e) => setFormCivilStatus(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-1.5 outline-none">
                      <option value="Soltero/a">Soltero/a</option>
                      <option value="Casado/a">Casado/a</option>
                      <option value="Divorciado/a">Divorciado/a</option>
                      <option value="Viudo/a">Viudo/a</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-0.5">Género</label>
                    <select value={formGender} onChange={(e) => setFormGender(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-1.5 outline-none">
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-0.5">Tipo Sangre</label>
                    <select value={formBloodType} onChange={(e) => setFormBloodType(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-mono outline-none">
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center">
                  {isEditing ? "Actualizar" : "Guardar Expediente"}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-3 rounded-xl transition-all">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ─── TABLA DE EXPEDIENTES ─── */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden lg:col-span-2">
            
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, DUI o rol..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-blue-500 transition-all font-medium"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50">
                    <th className="py-3.5 px-4">Colaborador e Identidad</th>
                    <th className="py-3.5 px-4">Contacto y Ubicación</th>
                    <th className="py-3.5 px-4">Datos Personales</th>
                    <th className="py-3.5 px-4">Salud e Historial</th>
                    <th className="py-3.5 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/40 transition-all align-top">
                      
                      <td className="py-4 px-4 space-y-1">
                        <div>
                          <p className="font-black text-slate-900">{emp.names} {emp.lastNames}</p>
                          <span className="text-[11px] text-slate-500 font-mono block">DUI: {emp.dui}</span>
                        </div>
                        <div className="flex gap-1 items-center flex-wrap">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${
                            emp.role === "Administrador" ? "bg-purple-100 text-purple-700 border-purple-200" :
                            emp.role === "Repartidor" ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}>
                            {emp.role}
                          </span>
                          <span className={`text-[10px] font-bold ${emp.status === "Activo" ? "text-emerald-600" : "text-slate-400"}`}>
                            • {emp.status}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-medium space-y-0.5">
                        <span className="text-slate-900 font-mono block font-bold">{emp.phone}</span>
                        <span className="text-slate-500 text-[11px] block break-all">{emp.email}</span>
                        <p className="text-[11px] text-slate-400 italic font-normal line-clamp-2 max-w-[180px]">{emp.address || "Sin dirección registrada"}</p>
                      </td>

                      <td className="py-4 px-4 text-[11px] text-slate-600 font-medium space-y-0.5">
                        <p><span className="text-slate-400 font-bold">Edad:</span> {emp.age ? `${emp.age} años` : "—"}</p>
                        <p><span className="text-slate-400 font-bold">F. Nac:</span> {emp.birthDate || "—"}</p>
                        <p className="text-slate-500 font-normal">{emp.gender} • {emp.civilStatus}</p>
                      </td>

                      <td className="py-4 px-4 text-[11px] font-medium space-y-1">
                        <span className="text-slate-700 block">{emp.nationality}</span>
                        {emp.bloodType && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-md font-mono">
                            {emp.bloodType}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                        <button onClick={() => handleEdit(emp)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Editar Expediente">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDelete(emp.id, emp.role)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Eliminar Registro">
                          <Trash2 size={14} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default PanelDeEmpleados;