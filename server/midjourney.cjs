const axios = require('axios');

const generateImage = async (prompt) => {
  console.log('Generating image with prompt:', prompt); // Log the prompt
  
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
    console.log('MidJourney API Response:', response.data); // Log the response
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error communicating with MidJourney API:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

module.exports = { generateImage };
