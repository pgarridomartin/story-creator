const axios = require('axios');

const generateImage = async (prompt) => {
  const config = {
    method: 'post',
    url: 'https://api.mymidjourney.ai/api/v1/midjourney/imagine',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MIDJOURNEY_API_KEY}`,
    },
    data: {
      prompt: prompt,
    },
    timeout: 10000, // Tiempo de espera de 10 segundos
  };

  try {
    const response = await axios(config);
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error communicating with MidJourney API:', error);
    throw error;
  }
};

module.exports = { generateImage };
