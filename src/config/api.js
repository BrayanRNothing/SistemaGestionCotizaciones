// Detección automática de entorno
const isDevelopment = import.meta.env.MODE === 'development';

const API_URL = 'http://localhost:4002'; // Backend local por defecto

export default API_URL;