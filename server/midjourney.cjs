const axios = require('axios');

const generateImage = async (prompt) => {
  const apiKey = process.env.STABILITY_API_KEY; // Tu API key para Stability.ai
  const apiUrl = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';

  if (!apiKey) {
    throw new Error('STABILITY_API_KEY is not defined in environment variables');
  }

  const data = {
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    samples: 1, // Número de imágenes a generar
  };

  const config = {
    method: 'post',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    data: JSON.stringify(data),
    timeout: 30000, // Timeout de 30 segundos
  };

  try {
    const response = await axios(config);
    return response.data; // Ajusta esto según la estructura de la respuesta de la API
  } catch (error) {
    console.error('Error generating image with Stable Diffusion:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { generateImage };
