// Detección automática de entorno
const isDevelopment = import.meta.env.MODE === 'development';

const API_URL = isDevelopment
    ? 'http://localhost:4002'
    : 'https://sistemagestioncotizaciones-production.up.railway.app';

export default API_URL;