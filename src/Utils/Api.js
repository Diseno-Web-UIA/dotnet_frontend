import axios from 'axios';
import env from './env';

export const apiRequest = async (metodo, ruta, body = null, params = null) => {
  try {
    // Configuración para desarrollo local vs producción
    const baseUrl = env("URL_API");
    const url = `${baseUrl}/${ruta}`;
    
    console.log(`🌐 Conectando a: ${url}`);
    console.log(`📤 Método: ${metodo}`);
    console.log(`📦 Datos:`, body);
    
    const req = await axios.request({
      url,
      method: metodo,
      params,
      data: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 15000,
    });
    
    console.log(`✅ Respuesta exitosa:`, req.data);
    
    return {
      success: true,
      data: req.data,
      message: 'Operación exitosa'
    };
  } catch (error) {
    console.error('❌ Error en apiRequest:', error);
    console.error('🔍 Detalles del error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message || 'Error de conexión'
    };
  }
};

export default apiRequest;