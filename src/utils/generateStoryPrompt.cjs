const generateStoryPrompt = (title, characters, storyPrompt) => {
    const protagonistDescriptions = characters.filter(char => char.role === 'protagonist').map(char => `${char.name}, a ${char.gender}, age ${char.age}, with ${char.skin} skin, ${char.hair} hair, ${char.eyes} eyes, ${char.eyebrows} eyebrows, ${char.nose} nose, and ${char.mouth} mouth`).join(', ');
    const secondaryDescriptions = characters.filter(char => char.role === 'secondary').map(char => `${char.name}, a ${char.gender}, age ${char.age}, with ${char.skin} skin, ${char.hair} hair, ${char.eyes} eyes, ${char.eyebrows} eyebrows, ${char.nose} nose, and ${char.mouth} mouth`).join(', ');
  
    return `Por favor, genera un cuento infantil personalizado basado en los siguientes parámetros proporcionados por el usuario (solo texto, no imágenes):
  
  1. Título del cuento: ${title}
  2. Descripción de los personajes:
     - Protagonistas: ${protagonistDescriptions}
     - Personajes secundarios: ${secondaryDescriptions}
  3. Tema: ${storyPrompt}
  
  Estructura del cuento: Introducción, desarrollo, clímax, resolución, conclusión.
  Es un libro infantil, tipo disney, fácil de leer y alegre.
  
  Para cada página, se generará un texto de entre 25 y 40 palabras y además una descripción tipo prompt extremadamente detallada de la escena sugerida por el texto. Cada página se identificará como "Página 1", "Página 2”, "Página 3”,etc.
  
  Ejemplo de la estructura que se espera del cuento: 
  Página 1: 
  - Texto de lectura de la primera página
  - Descripción detallada de la primera escena 
  
  Página 2: 
  - Texto de lectura de la segunda página
  - Descripción detallada de la segunda escena.`;
  };
  
  module.exports = { generateStoryPrompt };
  