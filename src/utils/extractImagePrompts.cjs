// src/utils/extractImagePrompts.cjs
const extractImagePrompts = (story) => {
  const pagesPattern = /(\*\*Página \d+:\*\*|Página \d+:)/g;
  const sections = story.split(pagesPattern).filter(section => section.trim() !== '');
  
  if (sections.length < 2) {
    console.error('No pages found in the story');
    return [];
  }

  const imagePrompts = [];
  for (let i = 1; i < sections.length; i += 2) {
    const pageContent = sections[i + 1] || sections[i];
    const match = pageContent.match(/- Descripción:\s*(.*?)(?=\*\*Página \d+|\n)/s);
    if (match) {
      imagePrompts.push(match[1].trim());
    }
  }

  console.log('Extracted image prompts:', imagePrompts); // Log extracted prompts
  return imagePrompts;
};

module.exports = { extractImagePrompts };
