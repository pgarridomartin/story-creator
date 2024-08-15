const axios = require('axios');

const characterDescription = "Lucia es una niña de 3 años con piel bronceada, cabello castaño lacio hasta los hombros. Su cabello está suelto y sus ojos son marrones brillantes. Tiene cejas delgadas y una nariz pequeña. Usualmente lleva un vestido amarillo con flores azules y moradas y mangas largas. Lleva pendientes amarillos en forma de bolas.";
const styleDescription = "El estilo que necesito es de caricaturas de Disney Pixar, estilo de dibujos lindos, colorido, con alto contraste, colores vibrantes, retrato, iluminación brillante.";
const uniqueNumber = 0; // Global variable to maintain unique number

const generateImage = async (prompt, uniqueNumber) => {
  const styledPrompt = `${characterDescription} ${prompt} ${styleDescription} - ${uniqueNumber.toString().padStart(4, '0')}`;

  console.log('Styled prompt:', styledPrompt); // Log the styled prompt

  const data = {
    "model": "dall-e-3",
    "prompt": styledPrompt,
    "n": 1,
    "size": "1024x1024",
  };

  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/images/generations',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: JSON.stringify(data),  // Ensure data is properly stringified
    timeout: 35000, // 30 seconds timeout
  };

  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios(config);
      console.log('OpenAI API Response:', response.data); // Log the response
      if (response.data && response.data.data && response.data.data[0]) {
        const imageUrl = response.data.data[0].url;
        const created = response.data.created; // Extract created value
        console.log('Generated created value:', created); // Log the generated created value
        return { imageUrl, created }; // Return both URL and created value
      } else {
        throw new Error('Invalid response format from OpenAI');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from OpenAI API:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        if (error.response.status === 429) {
          attempt++;
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.warn(`Rate limit exceeded, retrying in ${delay} ms... (Attempt ${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else if (error.response.status === 500) {
          console.warn('Internal server error, retrying...');
          attempt++;
        } else {
          throw error;
        }
      } else {
        console.error('Error communicating with OpenAI API:', error);
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
};

module.exports = { generateImage };
