import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import CELLS from 'vanta/dist/vanta.cells.min.js';
import Avatar from '../components/ui/Avatar';
import { getUser, logout } from '../utils/authUtils';

const TecnicoLayout = () => {
  const location = useLocation();
  const vantaRef = useRef(null);
  const vantaInstanceRef = useRef(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar usuario
    const userGuardado = getUser();
    setUsuario(userGuardado);
    if (vantaRef.current && !vantaInstanceRef.current) {
      try {
        vantaInstanceRef.current = CELLS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color1: 0x8c8c,
          color2: 0x8cf4f4,
          size: 5.00,
          speed: 0.00
        });
      } catch (error) {
        console.error("Error al iniciar Vanta:", error);
      }
    }

    return () => {
      if (vantaInstanceRef.current) {
        vantaInstanceRef.current.destroy();
        vantaInstanceRef.current = null;
      }
    };
  }, []);

  const menuItems = [
    { name: 'Inicio', path: '/tecnico', icon: '🏠' },
    { name: 'Ajustes', path: '/tecnico/ajustes', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cyan-50">
      <header ref={vantaRef} className="shadow-lg px-6 py-4 flex justify-between items-center z-10 relative overflow-hidden min-h-[80px] bg-gradient-to-r from-gray-900 to-gray-800">
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 bg-opacity-50 pointer-events-none z-0"></div>

        <div className="relative z-10 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            {usuario && <Avatar name={usuario.nombre} size="md" />}
            <div>
              <h2 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(37,99,235,0.5)]">🔧 Panel Técnico</h2>
              {usuario && <p className="text-xs text-cyan-200">{usuario.nombre}</p>}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-20 mb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200/50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50">
        <ul className="flex justify-around items-center h-16">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="w-full">
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center h-full space-y-1 ${isActive ? 'text-cyan-500 font-bold' : 'text-gray-500 hover:text-cyan-500'} bg-transparent`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default TecnicoLayout;
