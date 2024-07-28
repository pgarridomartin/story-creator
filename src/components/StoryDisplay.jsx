import React from 'react';

const StoryDisplay = ({ story }) => {
  console.log('Se usa StoryDisplay?'); // log titulo
  console.log('Historia previa', story); // Historia sin filtrar

  const extractTitleAndTexts = (story) => {
    const titleMatch = story.match(/\*\*Título:\s*(.*?)\*\*/);
    const title = titleMatch ? titleMatch[1].trim() : "Título no disponible";

    const textMatches = [...story.matchAll(/\*\*Página \d+:\*\*\s*- Texto:\s*(.*?)\s*- Descripción:/gs)];
    const texts = textMatches.map(match => match[1].trim());
    console.log('Titulo', title); // log titulo
    console.log('Texto', texts); // log textos
    return { title, texts };
  };

  const { title, texts } = extractTitleAndTexts(story);

  return (
    <div className="story-display">
      <h2>{title}</h2>
      {texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};

export default StoryDisplay;
