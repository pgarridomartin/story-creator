const axios = require('axios');
const FormData = require('form-data');

const generateImage = async (prompt, seed = null) => {
  const apiKey = process.env.STABILITY_API_KEY;
  const apiUrl = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';

  if (!apiKey) {
    throw new Error('STABILITY_API_KEY is not defined in environment variables');
  }

  const form = new FormData();
  form.append('prompt', prompt);
  form.append('output_format', 'jpeg');
  if (seed) {
    form.append('seed', seed);
  }

  try {
    const response = await axios.post(apiUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...form.getHeaders()
      },
      responseType: 'json',
    });

    if (response.status === 200) {
      return response.data;
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
