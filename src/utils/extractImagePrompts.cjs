// src/utils/extractImagePrompts.cjs
const extractImagePrompts = (story) => {
  const pages = story.match(/\*\*Página \d+:\*\*([\s\S]*?)(?=\*\*Página \d+:\*\*|$)/g);
  if (!pages) {
    console.error('No pages found in the story');
    return [];
  }

  const imagePrompts = pages.map(page => {
    const match = page.match(/- Descripción:\s*([\s\S]*)/);
    return match ? match[1].trim() : null;
  }).filter(prompt => prompt !== null);

  console.log('Extracted image prompts:', imagePrompts); // Log extracted prompts
  return imagePrompts;
};

module.exports = { extractImagePrompts };
