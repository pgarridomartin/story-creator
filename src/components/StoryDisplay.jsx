import React from 'react';

const StoryDisplay = ({ story }) => {
  console.log('Historia previa', story); // Historia sin filtrar

  const extractTitleAndTexts = (story) => {
    const titleMatch = story.match(/Título:\s*(.*)/i);
    const title = titleMatch ? titleMatch[1].trim() : "Título no disponible en story display";

    const textMatches = [...story.matchAll(/(?:\*\*Página \d+:|Página \d+:)[\s\S]*?- Texto:\s*(.*?)(?=\s*- Descripción:)/g)];
    const texts = textMatches.map(match => match[1].trim());

    console.log('Titulo extraído', title); // Log título
    console.log('Textos extraídos', texts); // Log textos
    return { title, texts };
  };

  const { title, texts } = extractTitleAndTexts(story);

  return (
    <div className="story-display">
      <h2>{title}</h2>
      {texts.length > 0 ? (
        texts.map((text, index) => (
          <p key={index}>{text}</p>
        ))
      ) : (
        <p>No hay texto disponible</p>
      )}
    </div>
  );
};

export default StoryDisplay;
