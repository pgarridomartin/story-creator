// utils/extractImagePrompts.js

/**
 * This function extracts image prompts from the generated story.
 * It assumes the story is divided into pages identified by "Página 1", "Página 2", etc.
 * Each page should contain a description of the scene, which will be used as a prompt for generating images.
 *
 * @param {string} generatedStory - The story generated by ChatGPT.
 * @returns {string[]} - An array of prompts for generating images.
 */
const extractImagePrompts = (generatedStory) => {
    console.log('Generated Story:', generatedStory);
  
    const pages = generatedStory.split(/Página \d+/);
    console.log('Story Pages:', pages);
  
    const prompts = pages.map(page => {
      const match = page.match(/([^:]+):(.+)/);
      if (match) {
        const [, title, description] = match;
        const prompt = `${title.trim()}: ${description.trim()}`;
        console.log('Generated Prompt:', prompt);
        return prompt;
      }
      return null;
    }).filter(prompt => prompt);
  
    console.log('Final Prompts:', prompts);
    return prompts;
  };
  
  module.exports = extractImagePrompts;
  