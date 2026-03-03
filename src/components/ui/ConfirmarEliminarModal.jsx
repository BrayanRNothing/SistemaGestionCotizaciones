import React from 'react';

function ConfirmarEliminarModal({ open, titulo = '¿Eliminar?', mensaje = '¿Estás seguro que deseas eliminar este elemento?', onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onCancel}>
            <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-3">
                            <span className="text-3xl">🗑️</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{titulo}</h2>
                            <p className="text-red-100 text-sm">{mensaje}</p>
                        </div>
                    </div>
                </div>
                {/* Botones */}
                <div className="p-6 flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmarEliminarModal;
