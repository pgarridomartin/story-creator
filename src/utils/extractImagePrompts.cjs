const extractImagePrompts = (story) => {
  // Ajustar regex para coincidir con el formato proporcionado
  const pages = story.match(/Página \d+:\s*- Texto:.*?\s*- Descripción:(.*?)(?=\nPágina \d+:|$)/gs);
  if (!pages) {
    console.error('No pages found in the story');
    return [];
  }

  const imagePrompts = pages.map(page => {
    const match = page.match(/- Descripción:\s*(.*)/);
    return match ? match[1].trim() : null;
  }).filter(prompt => prompt !== null);

  console.log('Extracted image prompts:', imagePrompts); // Log extracted prompts
  return imagePrompts;
};

module.exports = { extractImagePrompts };
