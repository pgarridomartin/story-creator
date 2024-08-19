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
  form.append('negative_prompt', "painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs, anime");
  form.append('width', '512');
  form.append('height', '512');
  form.append('output_format', 'jpeg');
  form.append('num_inference_steps', '30');
  form.append('guidance_scale', '7.5');

  if (seed) {
    form.append('seed', seed);
  }

  try {
    const response = await axios.post(apiUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...form.getHeaders(),
      },
      responseType: 'json',
    });

    if (response.status === 200 && response.data && response.data.image) {
      return response.data;
    } else {
      console.error('Unexpected status code or missing image data:', response.status);
      throw new Error('Invalid image data received');
    }
  } catch (error) {
    console.error('Error generating image with Stable Diffusion:', error.response?.data || error.message);
    throw error;
  }
};


module.exports = { generateImage };
