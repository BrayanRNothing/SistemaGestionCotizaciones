import React, { useRef, useState, useEffect } from 'react';
import ConfirmarEliminarModal from '../../components/ui/ConfirmarEliminarModal';
import toast from 'react-hot-toast';
import API_URL from '../../config/api';
import { logout } from '../../utils/authUtils';

const GestionTiposSolicitud = () => {
  const [tipos, setTipos] = useState([]);
  const [nuevoTipo, setNuevoTipo] = useState({ nombre: '', descripcion: '', icono: '🔧', color: 'blue' });
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
        setNuevoTipo({ nombre: '', descripcion: '', icono: '🔧', color: 'blue' });
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

  const colorMap = {
    blue: 'border-blue-500 text-blue-700 bg-blue-50',
    green: 'border-green-500 text-green-700 bg-green-50',
    red: 'border-red-500 text-red-700 bg-red-50',
    purple: 'border-purple-500 text-purple-700 bg-purple-50',
    orange: 'border-orange-500 text-orange-700 bg-orange-50',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Gestión de Tipos de Solicitud</h2>
      
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input 
            placeholder="Ej. Reparación" 
            className="w-full p-2 border rounded-lg"
            value={nuevoTipo.nombre}
            onChange={e => setNuevoTipo({...nuevoTipo, nombre: e.target.value})}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <input 
            placeholder="Breve descripción" 
            className="w-full p-2 border rounded-lg"
            value={nuevoTipo.descripcion}
            onChange={e => setNuevoTipo({...nuevoTipo, descripcion: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
          <select 
            className="p-2 border rounded-lg w-full"
            value={nuevoTipo.icono}
            onChange={e => setNuevoTipo({...nuevoTipo, icono: e.target.value})}
          >
            <option value="🏗️">🏗️</option>
            <option value="🔧">🔧</option>
            <option value="🚨">🚨</option>
            <option value="💻">💻</option>
            <option value="🎨">🎨</option>
            <option value="📦">📦</option>
            <option value="📄">📄</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <select 
            className="p-2 border rounded-lg w-full"
            value={nuevoTipo.color}
            onChange={e => setNuevoTipo({...nuevoTipo, color: e.target.value})}
          >
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="red">Rojo</option>
            <option value="purple">Morado</option>
            <option value="orange">Naranja</option>
          </select>
        </div>
        <button 
          onClick={agregarTipo}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition h-[42px]"
        >
          Agregar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tipos.map(t => (
          <div key={t.id} className={`p-4 rounded-xl border-l-4 shadow-sm flex justify-between items-center ${colorMap[t.color] || colorMap.blue}`}>
             <div className="flex items-center gap-3">
                <span className="text-3xl bg-white p-2 rounded-full shadow-sm">{t.icono}</span>
                <div>
                  <div className="font-bold text-gray-900">{t.nombre}</div>
                  <div className="text-sm opacity-75">{t.descripcion}</div>
                </div>
             </div>
             <button 
                onClick={() => eliminarTipo(t.id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                title="Eliminar"
             >
               🗑️
             </button>
          </div>
        ))}
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
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
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
