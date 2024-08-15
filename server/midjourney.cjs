const axios = require('axios');
const { OpenAI } = require('openai');

const characterDescription = "Lucia es una niña de 3 años con piel bronceada, cabello castaño lacio hasta los hombros. Su cabello está suelto y sus ojos son marrones brillantes. Tiene cejas delgadas y una nariz pequeña. Usualmente lleva un vestido amarillo con flores azules y moradas y mangas largas. Lleva pendientes amarillos en forma de bolas.";
const styleDescription = "El estilo que necesito es de caricaturas de Disney Pixar, estilo de dibujos lindos, colorido, con alto contraste, colores vibrantes, retrato, iluminación brillante.";

let uniqueNumber = 0; // Variable global para mantener el número único

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (sceneDescription) => {
  const prompt = `${characterDescription} ${sceneDescription} ${styleDescription} - ${uniqueNumber.toString().padStart(4, '0')}`;
  uniqueNumber += 1; // Incrementar el número único para la próxima imagen

  console.log('Styled prompt:', prompt); // Log del styled prompt

  const data = {
    "model": "dall-e-3",
    "prompt": prompt,
    "n": 1,
    "size": "1024x1024"
  };

  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/images/generations',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: JSON.stringify(data),  // Asegurar que los datos estén correctamente stringify
    timeout: 30000, // 30 segundos de timeout
  };

  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios(config);
      console.log('OpenAI API Response:', response.data); // Log de la respuesta
      if (response.data && response.data.data && response.data.data[0]) {
        const imageUrl = response.data.data[0].url;
        const created = response.data.created; // Extraer el valor creado
        console.log('Generated created value:', created); // Log del valor creado generado
        return { imageUrl, created }; // Retornar tanto la URL como el valor creado
      } else {
        throw new Error('Formato de respuesta inválido de OpenAI');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from OpenAI API:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        if (error.response.status === 429) {
          attempt++;
          const delay = Math.pow(2, attempt) * 1000; // Retroceso exponencial
          console.warn(`Límite de tasa excedido, reintentando en ${delay} ms... (Intento ${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else if (error.response.status === 500) {
          console.warn('Error interno del servidor, reintentando...');
          attempt++;
        } else {
          throw error;
        }
      } else {
        console.error('Error comunicándose con OpenAI API:', error);
        throw error;
      }
    }
  }
  throw new Error('Excedido el número máximo de reintentos');
};

const generateConsistentImages = async (story) => {
  const sceneDescriptions = await getSceneDescriptions(story);
  const imageUrls = [];
  for (const sceneDescription of sceneDescriptions) {
    const { imageUrl } = await generateImage(sceneDescription);
    imageUrls.push(imageUrl);
  }
  return imageUrls;
};

const getSceneDescriptions = async (story) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Eres un asistente creativo para generar descripciones consistentes de escenas para una historia." },
      { role: "user", content: `Genera descripciones detalladas para las escenas de la siguiente historia: ${story}` }
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  const sceneDescriptions = response.choices[0].message.content.trim().split('\n');
  return sceneDescriptions;
};

module.exports = { generateConsistentImages, generateImage };
