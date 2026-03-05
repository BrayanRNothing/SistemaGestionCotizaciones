import React, { useRef, useState, useEffect } from 'react';
import ConfirmarEliminarModal from '../../components/ui/ConfirmarEliminarModal';
import toast from 'react-hot-toast';
import API_URL from '../../config/api';
import { logout } from '../../utils/authUtils';

const GestionTiposSolicitud = () => {
  const [tipos, setTipos] = useState([]);
  const [nuevoTipo, setNuevoTipo] = useState({ nombre: '', descripcion: '', icono: 'wrench', color: 'blue' });
  const [modalEliminar, setModalEliminar] = useState({ open: false, id: null });

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tipos-solicitud`);
      if (res.ok) {
        const data = await res.json();
        setTipos(data);
      }
    } catch (error) {
      console.error('Error fetching tipos:', error);
    }
  };

  const agregarTipo = async () => {
    if (!nuevoTipo.nombre) return toast.error('El nombre es obligatorio');
    try {
      const res = await fetch(`${API_URL}/api/tipos-solicitud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoTipo)
      });
      if (res.ok) {
        toast.success('Tipo agregado');
        setNuevoTipo({ nombre: '', descripcion: '', icono: 'wrench', color: 'blue' });
        fetchTipos();
      }
    } catch (error) {
      toast.error('Error al agregar');
    }
  };

  const eliminarTipo = async (id) => {
    setModalEliminar({ open: true, id });
  };

  const confirmarEliminarTipo = async () => {
    const id = modalEliminar.id;
    setModalEliminar({ open: false, id: null });
    try {
      const res = await fetch(`${API_URL}/api/tipos-solicitud/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Eliminado');
        fetchTipos();
      }
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const iconosDisponibles = {
    wrench: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tools: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    alert: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    laptop: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    design: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    box: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    document: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    build: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  };

  const colorMap = {
    blue: { 
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100', 
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'bg-blue-500 text-white',
      hover: 'hover:shadow-blue-200'
    },
    green: { 
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', 
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      icon: 'bg-emerald-500 text-white',
      hover: 'hover:shadow-emerald-200'
    },
    red: { 
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100', 
      border: 'border-rose-200',
      text: 'text-rose-700',
      icon: 'bg-rose-500 text-white',
      hover: 'hover:shadow-rose-200'
    },
    purple: { 
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100', 
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: 'bg-purple-500 text-white',
      hover: 'hover:shadow-purple-200'
    },
    orange: { 
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100', 
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: 'bg-amber-500 text-white',
      hover: 'hover:shadow-amber-200'
    },
    indigo: { 
      bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100', 
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      icon: 'bg-indigo-500 text-white',
      hover: 'hover:shadow-indigo-200'
    },
    teal: { 
      bg: 'bg-gradient-to-br from-teal-50 to-teal-100', 
      border: 'border-teal-200',
      text: 'text-teal-700',
      icon: 'bg-teal-500 text-white',
      hover: 'hover:shadow-teal-200'
    },
    pink: { 
      bg: 'bg-gradient-to-br from-pink-50 to-pink-100', 
      border: 'border-pink-200',
      text: 'text-pink-700',
      icon: 'bg-pink-500 text-white',
      hover: 'hover:shadow-pink-200'
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Tipos de Solicitud</h2>
      </div>
      
      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del tipo</label>
            <input 
              placeholder="Ej. Reparación urgente" 
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition outline-none"
              value={nuevoTipo.nombre}
              onChange={e => setNuevoTipo({...nuevoTipo, nombre: e.target.value})}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <input 
              placeholder="Descripción breve del tipo" 
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition outline-none"
              value={nuevoTipo.descripcion}
              onChange={e => setNuevoTipo({...nuevoTipo, descripcion: e.target.value})}
            />
          </div>
          <div className="min-w-[150px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Icono</label>
            <select 
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition outline-none bg-white cursor-pointer"
              value={nuevoTipo.icono}
              onChange={e => setNuevoTipo({...nuevoTipo, icono: e.target.value})}
            >
              <option value="wrench">⚙️ Configuración</option>
              <option value="tools">🔧 Herramientas</option>
              <option value="alert">⚠️ Alerta</option>
              <option value="laptop">💻 Computadora</option>
              <option value="design">🎨 Diseño</option>
              <option value="box">📦 Paquete</option>
              <option value="document">📄 Documento</option>
              <option value="build">🏗️ Construcción</option>
            </select>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
            <select 
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition outline-none bg-white cursor-pointer"
              value={nuevoTipo.color}
              onChange={e => setNuevoTipo({...nuevoTipo, color: e.target.value})}
            >
              <option value="blue">🔵 Azul</option>
              <option value="green">🟢 Verde</option>
              <option value="red">🔴 Rojo</option>
              <option value="purple">🟣 Morado</option>
              <option value="orange">🟠 Naranja</option>
              <option value="indigo">🔷 Índigo</option>
              <option value="teal">🐚 Turquesa</option>
              <option value="pink">💗 Rosa</option>
            </select>
          </div>
          <button 
            onClick={agregarTipo}
            className="bg-linear-to-r from-cyan-600 to-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 h-[46px] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tipos.map(t => {
          const colors = colorMap[t.color] || colorMap.blue;
          return (
            <div 
              key={t.id} 
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-5 shadow-md transition-all duration-200 ${colors.hover} hover:shadow-lg hover:scale-[1.02] group`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className={`${colors.icon} p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  {iconosDisponibles[t.icono] || iconosDisponibles['wrench']}
                </div>
                <button 
                  onClick={() => eliminarTipo(t.id)}
                  className="bg-white text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-all shadow-sm hover:shadow-md transform hover:scale-110 active:scale-95"
                  title="Eliminar tipo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div>
                <h3 className={`font-bold text-lg ${colors.text} mb-1`}>{t.nombre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.descripcion || 'Sin descripción'}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmarEliminarModal
        open={modalEliminar.open}
        titulo="¿Eliminar tipo de solicitud?"
        mensaje="Esta acción no se puede deshacer. ¿Deseas eliminar este tipo de solicitud?"
        onCancel={() => setModalEliminar({ open: false, id: null })}
        onConfirm={confirmarEliminarTipo}
      />
    </div>
  );
};

function Ajustes() {
  const API_BASE = API_URL;
  const [exportandoDb, setExportandoDb] = useState(false);
  const [importandoDb, setImportandoDb] = useState(false);
  const [reiniciandoDb, setReiniciandoDb] = useState(false);
  const importFileRef = useRef(null);

  const handleExportarDb = async () => {
    setExportandoDb(true);
    try {
      const res = await fetch(`${API_BASE}/api/db/export?includePasswords=true`);
      if (!res.ok) throw new Error('No se pudo exportar (backend no soporta o no está actualizado)');

      const data = await res.json();
      const snapshot = data?.snapshot;
      if (!data?.success || !snapshot) throw new Error('Respuesta inválida del servidor');

      const fecha = new Date();
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getDate()).padStart(2, '0');
      const filename = `infiniguard-backup-${yyyy}-${mm}-${dd}.json`;

      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success('✅ Backup descargado');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Error al exportar backup');
    } finally {
      setExportandoDb(false);
    }
  };

  const handleClickImportarDb = () => {
    importFileRef.current?.click();
  };

  const handleImportarDbFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportandoDb(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const snapshot = parsed?.snapshot || parsed;

      const res = await fetch(`${API_BASE}/api/db/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.message || 'No se pudo importar el backup');

      toast.success('✅ Backup importado');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Error al importar backup');
    } finally {
      setImportandoDb(false);
      e.target.value = '';
    }
  };

  const handleReiniciarDb = async () => {
    const confirmacion1 = confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los servicios de la base de datos.\n\n¿Estás seguro de continuar?');
    if (!confirmacion1) return;

    const confirmacion2 = confirm('🚨 ÚLTIMA CONFIRMACIÓN:\n\nEsta acción NO se puede deshacer.\nSe eliminarán todos los servicios permanentemente.\n\n¿Confirmar reinicio de base de datos?');
    if (!confirmacion2) return;

    setReiniciandoDb(true);
    try {
      const res = await fetch(`${API_BASE}/api/db/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Error al reiniciar la base de datos');

      toast.success('✅ Base de datos reiniciada correctamente');

      // Recargar la página después de 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Error al reiniciar la base de datos');
    } finally {
      setReiniciandoDb(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full h-screen overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ajustes</h1>
      </div>

      <GestionTiposSolicitud />

      {/* Sección de Perfil */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Mi Perfil</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm font-medium">Email (Opcional):</span>
            <input
              type="email"
              defaultValue={JSON.parse(sessionStorage.getItem('user') || '{}')?.email || ''}
              placeholder="correo@ejemplo.com"
              onBlur={async (e) => {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                try {
                  const res = await fetch(`${API_BASE}/api/usuarios/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      nombre: user.nombre,
                      email: e.target.value || null,
                      rol: user.rol,
                      telefono: user.telefono
                    })
                  });
                  if (res.ok) {
                    toast.success('✅ Email actualizado');
                    const updatedUser = { ...user, email: e.target.value };
                    sessionStorage.setItem('user', JSON.stringify(updatedUser));
                  }
                } catch (error) {
                  console.error(error);
                  toast.error('Error al actualizar');
                }
              }}
              className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm font-medium">Teléfono (Opcional):</span>
            <input
              type="tel"
              defaultValue={JSON.parse(sessionStorage.getItem('user') || '{}')?.telefono || ''}
              placeholder="+52 123 456 7890"
              onBlur={async (e) => {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                try {
                  const res = await fetch(`${API_BASE}/api/usuarios/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      nombre: user.nombre,
                      email: user.email,
                      rol: user.rol,
                      telefono: e.target.value || null
                    })
                  });
                  if (res.ok) {
                    toast.success('✅ Teléfono actualizado');
                    const updatedUser = { ...user, telefono: e.target.value };
                    sessionStorage.setItem('user', JSON.stringify(updatedUser));
                  }
                } catch (error) {
                  console.error(error);
                  toast.error('Error al actualizar');
                }
              }}
              className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Sección de Notificaciones */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Preferencias de Notificaciones</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-semibold text-gray-800">Recibir notificaciones por email</p>
            <p className="text-sm text-gray-500">Recibe actualizaciones sobre servicios y cambios en tu correo electrónico</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={!!JSON.parse(sessionStorage.getItem('user') || '{}')?.email}
              disabled={!JSON.parse(sessionStorage.getItem('user') || '{}')?.email}
              onChange={async (e) => {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                if (!user.email) {
                  toast.error('⚠️ Debes configurar un email primero');
                  e.target.checked = false;
                  return;
                }

                try {
                  const res = await fetch(`${API_BASE}/api/usuarios/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      nombre: user.nombre,
                      email: user.email,
                      rol: user.rol,
                      telefono: user.telefono,
                      notificaciones_activas: e.target.checked
                    })
                  });
                  
                  if (res.ok) {
                    if (e.target.checked) {
                      toast.success('✅ Notificaciones activadas');
                    } else {
                      toast.success('🔕 Notificaciones desactivadas');
                    }
                  } else {
                    toast.error('Error al actualizar preferencias');
                    e.target.checked = !e.target.checked; // Revertir
                  }
                } catch (error) {
                  console.error(error);
                  toast.error('Error de conexión');
                  e.target.checked = !e.target.checked; // Revertir
                }
              }}
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
          </label>
        </div>
        {!JSON.parse(sessionStorage.getItem('user') || '{}')?.email && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <span>⚠️</span> Configura tu email arriba para activar las notificaciones
          </p>
        )}
      </div>

      {/* Botón Cerrar Sesión */}
      <div className="mb-8">
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
              logout();
              window.location.href = '/';
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-95"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Ajustes;
