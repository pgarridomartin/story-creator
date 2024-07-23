const extractImagePrompts = (story) => {
  const prompts = [];
  const pages = story.split(/Página \d+:/);

  pages.forEach((page, index) => {
    if (index === 0) return; // Skip the first split as it will be before the first "Página 1"
    const [text, sceneDescription] = page.split('Descripción de la escena -');
    if (sceneDescription) {
      prompts.push(sceneDescription.trim());
    }
  });

  console.log('Extracted Image Prompts:', prompts);
  return prompts;
};

module.exports = { extractImagePrompts };
