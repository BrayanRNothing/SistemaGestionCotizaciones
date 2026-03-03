/**
 * Utilidades para conversión de documentos
 * Convierte datos entre cotizaciones, órdenes de trabajo y reportes
 */

/**
 * Convierte una cotización en datos base para orden de trabajo
 * @param {Object} cotizacion - Datos de la cotización
 * @returns {Object} Datos pre-llenados para orden de trabajo
 */
export function convertirCotizacionAOrden(cotizacion) {
    if (!cotizacion) return {};

    return {
        cliente: cotizacion.cliente || {},
        direccionEntrega: cotizacion.cliente?.direccion || '',
        productos: cotizacion.productos?.map(p => ({
            partida: p.partida || 1,
            cantidad: p.cantidad || 1,
            clave: p.clave || '',
            descripcion: p.descripcion || '',
            medida: p.medida || '',
            unidad: p.unidad || ''
        })) || [],
        observaciones: cotizacion.notas || '',
        moneda: cotizacion.moneda || 'MXN',
        vigencia: cotizacion.vigencia || 30,
        // Referencias
        cotizacionNumero: cotizacion.numero,
        desdeCotizacion: true
    };
}

/**
 * Convierte una orden de trabajo en datos base para reporte
 * @param {Object} orden - Datos de la orden de trabajo
 * @returns {Object} Datos pre-llenados para reporte
 */
export function convertirOrdenAReporte(orden) {
    if (!orden) return {};

    return {
        cliente: orden.cliente || {},
        trabajosRealizados: orden.productos?.map(p => ({
            descripcion: p.descripcion || '',
            cantidad: p.cantidad || 1,
            completado: false
        })) || [],
        materialesUtilizados: [],
        tecnicoQueCompleto: orden.tecnicoAsignado || null,
        observaciones: orden.observaciones || '',
        // Referencias
        ordenNumero: orden.numero,
        desdeOrden: true
    };
}

/**
 * Genera un número de documento incremental
 * @param {string} tipo - Tipo de documento ('cotizacion', 'orden', 'reporte')
 * @returns {string} Número de documento generado
 */
export function generarNumeroDocumento(tipo) {
    const prefijos = {
        cotizacion: 'COT',
        orden: 'OT',
        reporte: 'RT'
    };

    const storageKeys = {
        cotizacion: 'lastCotizacionNumber',
        orden: 'lastOrdenNumber',
        reporte: 'lastReporteNumber'
    };

    const defaults = {
        cotizacion: 13000,
        orden: 3871,
        reporte: 1000
    };

    const prefijo = prefijos[tipo] || 'DOC';
    const key = storageKeys[tipo] || 'lastDocNumber';
    const defaultNum = defaults[tipo] || 1000;

    let currentNumber = parseInt(localStorage.getItem(key) || defaultNum.toString(), 10);
    currentNumber += 1;
    localStorage.setItem(key, currentNumber.toString());

    return `${prefijo}-${currentNumber}`;
}

/**
 * Formatea una fecha para mostrar
 * @param {string} fecha - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export function formatearFecha(fecha) {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Obtiene el icono para un tipo de documento
 * @param {string} tipo - Tipo de documento
 * @returns {string} Emoji del icono
 */
export function obtenerIconoDocumento(tipo) {
    const iconos = {
        cotizacion: '💰',
        orden_trabajo: '📋',
        reporte_trabajo: '✅'
    };
    return iconos[tipo] || '📄';
}

/**
 * Obtiene el color para un tipo de documento
 * @param {string} tipo - Tipo de documento
 * @returns {string} Clase de color de Tailwind
 */
export function obtenerColorDocumento(tipo) {
    const colores = {
        cotizacion: 'bg-blue-900 text-blue-50', // Azul oscuro
        orden_trabajo: 'bg-purple-700 text-purple-50', // Morado fuerte
        reporte_trabajo: 'bg-green-700 text-green-50' // Verde fuerte
    };
    return colores[tipo] || 'bg-gray-100 text-gray-800';
}
