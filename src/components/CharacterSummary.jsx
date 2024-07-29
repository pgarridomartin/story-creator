import React from 'react';
import '../../public/styles.css';

const roleMapping = {
  protagonist: 'Protagonista',
  secondary: 'Secundario'
};

const CharacterSummary = ({ characters = [], nextStep, prevStep, navigateTo, removeCharacter, editCharacter }) => {
  return (
    <div className="character-summary">
      <h2>Resumen de los Personajes</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index} style={{ listStyleType: 'none', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <div className="character-image-container" onClick={() => editCharacter(index)}>
              <img 
                src={`/images/skin/${character.skin}.png`} 
                alt="Piel" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/skin/kid_base.png`} 
                alt="Base" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/hair/${character.hair}.png`} 
                alt="Pelo" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/eyes/${character.eyes}.png`} 
                alt="Ojos" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/Eyebrows/${character.eyebrows}.png`} 
                alt="Cejas" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/Noses/${character.nose}.png`} 
                alt="Nariz" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
              <img 
                src={`/images/Mouths/${character.mouth}.png`} 
                alt="Boca" 
                className="character-image" 
                onError={(e) => e.target.src='/images/default-image.png'} 
              />
            </div>
            <div style={{ marginLeft: '10px' }}>
              <strong>Nombre:</strong> {character.name}<br/>
              <strong>Edad:</strong> {character.age}<br/>
              <strong>Rol:</strong> {roleMapping[character.role] || character.role}<br/>
            </div>
            <button 
              className="delete-button"
              onClick={() => removeCharacter(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button className="button secondary" onClick={prevStep}>Añadir más Personajes</button>
        <button className="button" onClick={nextStep}>Continuar</button>
        <button className="button" onClick={() => navigateTo('home')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default CharacterSummary;
