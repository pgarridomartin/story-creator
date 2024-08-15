const {
    skinDescriptions,
    hairDescriptions,
    eyeDescriptions,
    eyebrowDescriptions,
    noseDescriptions,
    mouthDescriptions
  } = require('./descriptions.cjs');
  
  const generateStoryPrompt = (characters, storyTitle, storyPrompt) => {
    const protagonistDescriptions = characters.filter(char => char.role === 'protagonist').map(char => {
      const skinDescription = skinDescriptions[char.skin] || "default skin";
      const hairDescription = hairDescriptions[char.hair] || "default hair";
      const eyeDescription = eyeDescriptions[char.eyes] || "default eyes";
      const eyebrowDescription = eyebrowDescriptions[char.eyebrows] || "default eyebrows";
      const noseDescription = noseDescriptions[char.nose] || "default nose";
      const mouthDescription = mouthDescriptions[char.mouth] || "default mouth";
  
      return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
    }).join(', ');
  
    const secondaryDescriptions = characters.filter(char => char.role === 'secondary').map(char => {
      const skinDescription = skinDescriptions[char.skin] || "default skin";
      const hairDescription = hairDescriptions[char.hair] || "default hair";
      const eyeDescription = eyeDescriptions[char.eyes] || "default eyes";
      const eyebrowDescription = eyebrowDescriptions[char.eyebrows] || "default eyebrows";
      const noseDescription = noseDescriptions[char.nose] || "default nose";
      const mouthDescription = mouthDescriptions[char.mouth] || "default mouth";
  
      return `${char.name}, a ${char.gender}, age ${char.age}, with ${skinDescription}, ${hairDescription}, ${eyeDescription}, ${eyebrowDescription}, ${noseDescription}, and ${mouthDescription}`;
    }).join(', ');
  
    return `Por favor, genera un cuento infantil personalizado basado en los siguientes parámetros proporcionados por el usuario (solo texto, no imágenes):
    
    1. Título del cuento: ${storyTitle}
    2. Descripción de los personajes:
       - Protagonistas: ${protagonistDescriptions}
       - Personajes secundarios: ${secondaryDescriptions}
    3. Tema: ${storyPrompt}
    
    Estructura del cuento: Introducción, desarrollo, clímax, resolución, conclusión.
    Es un libro infantil, tipo disney, fácil de leer y alegre.
    
    Para cada página, se generará un texto de entre 20 y 30 palabras y además una descripción tipo prompt extremadamente detallada de la escena sugerida por el texto. Cada página se identificará como "Página 1", "Página 2”, "Página 3”,etc.
    La descripcion detallada del personaje debe repetirse para cada página, para asegurar una continuidad en las imagenes que se generarán posteriormente.

    Ejemplo de la estructura que se espera estrictamente del cuento: 
    
    Título
    Página 1: 
    - Texto: Texto de la primera página
    - Descripción: Descripción detallada de la primera escena 
    
    Página 2: 
    - Texto: Texto de la segunda página
    - Descripción: Descripción detallada de la segunda escena.
    
    
    
    
    
    
    .
    `;
  };
  
  module.exports = { generateStoryPrompt };
  