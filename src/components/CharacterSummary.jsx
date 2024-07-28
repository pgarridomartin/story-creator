import React from 'react';
import '../../public/styles.css'; // Asegúrate de que los estilos estén en el archivo correcto

const CharacterSummary = ({ characters, nextStep, prevStep, navigateTo }) => {
  return (
    <div className="character-summary">
      <h2>Resumen de Personajes</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index} style={{ listStyleType: 'none', marginBottom: '20px' }}>
            <strong>Nombre:</strong> {character.name}<br/>
            <strong>Edad:</strong> {character.age}<br/>
            <div className="character-image-container">
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
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={() => navigateTo('home')}>Volver al Inicio</button>
        <button onClick={prevStep}>Añadir más Personajes</button>
        <button onClick={nextStep}>Continuar</button>
      </div>
    </div>
  );
};

export default CharacterSummary;
