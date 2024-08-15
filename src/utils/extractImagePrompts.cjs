const extractImagePrompts = (story) => {
  if (!story) {
    console.error('No story provided');
    return [];
  }

  const pages = story.match(/\*{2}Página \d+:\*{2}\s*- Texto:.*?\s*- Descripción:(.*?)(?=\n\*{2}Página \d+:\*{2}|$)/gs);
  if (!pages) {
    console.error('No pages found in the story');
    return [];
  }

  const imagePrompts = pages.map(page => {
    const match = page.match(/- Descripción:\s*(.*)/);
    return match ? match[1].trim() : null;
  }).filter(prompt => prompt !== null);

  console.log('Extracted image prompts:', imagePrompts);
  return imagePrompts;
};

module.exports = { extractImagePrompts };
