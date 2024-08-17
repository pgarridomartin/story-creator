const axios = require('axios');

const characterDescription = "Lucia es una niña de 3 años con piel bronceada, cabello castaño lacio hasta los hombros. Su cabello está suelto y sus ojos son marrones brillantes. Tiene cejas delgadas y una nariz pequeña. Usualmente lleva un vestido amarillo con flores azules y moradas y mangas largas. Lleva pendientes amarillos en forma de bolas.";
const styleDescription = "El estilo es de caricaturas de Disney Pixar, dibujos lindos, colorido, alto contraste, colores vibrantes, retrato, iluminación brillante.";
let uniqueNumber = 0; // Inicialización del número único

const generateImage = async (prompt) => {
    try {
        const styledPrompt = `${characterDescription} ${prompt} ${styleDescription} - ${uniqueNumber.toString().padStart(4, '0')}`;
        uniqueNumber += 1; // Incrementar el número único para la próxima imagen

        console.log('Styled prompt:', styledPrompt);

        const data = {
            "model": "dall-e-3",
            "prompt": styledPrompt,
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
            data: JSON.stringify(data),
            timeout: 30000, // Tiempo de espera de 30 segundos
        };

        const response = await axios(config);
        console.log('OpenAI API Response:', response.data);
        
        if (response.data && response.data.data && response.data.data[0]) {
            const imageUrl = response.data.data[0].url;
            const created = response.data.created;
            console.log('Generated created value:', created);
            return { imageUrl, created };
        } else {
            throw new Error('Invalid response format from OpenAI');
        }
    } catch (error) {
        console.error('Error generating images:', error);
        throw error; // Asegurarse de que el error se lanza para que el proceso pueda gestionarlo
    }
};

module.exports = { generateImage };
