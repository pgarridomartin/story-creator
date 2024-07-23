const extractImagePrompts = (story) => {
  const regex = /Descripción:\s*(.*?)\s*(Página|$)/gs;
  let match;
  const prompts = [];
  while ((match = regex.exec(story)) !== null) {
    prompts.push(match[1].trim());
  }
  console.log('Extracted prompts:', prompts);
  return prompts;
};

module.exports = { extractImagePrompts };
