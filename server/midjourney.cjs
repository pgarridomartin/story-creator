const axios = require('axios');
const FormData = require('form-data');

const generateImage = async (prompt, seed = null) => {
  const apiKey = process.env.STABILITY_API_KEY;
  const apiUrl = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';

  if (!apiKey) {
    throw new Error('STABILITY_API_KEY is not defined in environment variables');
  }

  const payload = {
    prompt: prompt,
    output_format: "jpeg",
    seed: seed || undefined // Asegúrate de enviar el seed si está disponible
  };

  const form = new FormData();
  Object.keys(payload).forEach(key => form.append(key, payload[key]));

  const config = {
    method: 'post',
    url: apiUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...form.getHeaders()
    },
    data: form,
    responseType: 'json',
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      return {
        image: response.data.image, 
        seed: response.data.seed || seed // Asegúrate de retornar el seed o mantener el anterior
      };
    } else {
      console.error('Unexpected status code:', response.status);
      console.error('Error response:', response.data);
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error generating image with Stable Diffusion:', error.response.data);
    } else {
      console.error('Error generating image with Stable Diffusion:', error.message);
    }
    throw error;
  }
};


module.exports = { generateImage };
