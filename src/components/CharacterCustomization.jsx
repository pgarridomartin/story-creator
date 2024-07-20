import React, { useState, useEffect } from 'react';
import '../../public/styles.css';
import ImageSelection from './ImageSelection';

const CharacterCustomization = ({ onCharacterUpdate, nextStep, prevStep }) => {
  const initialCharacterState = {
    name: '',
    gender: '',
    age: '',
    relationship: '',
    role: 'protagonist',
    skin: 'skin1',
    hair: 'hair1',
    eyes: 'eyes1',
    eyebrows: 'kid_eyebrow_1_color_1',
    nose: 'kid_nose_1',
    mouth: 'kid_mouth_1'
  };

  const [character, setCharacter] = useState(() => {
    const savedCharacter = localStorage.getItem('character');
    return savedCharacter ? JSON.parse(savedCharacter) : initialCharacterState;
  });

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
    if (onCharacterUpdate) {
      onCharacterUpdate(character);
    }
  }, [character, onCharacterUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter({
      ...character,
      [name]: value
    });
  };

  const handleImageChange = (type, value) => {
    setCharacter({
      ...character,
      [type]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="container">
      <h2>Personalización del Personaje</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Género:
          <select name="gender" value={character.gender} onChange={handleInputChange} required>
            <option value="">Selecciona</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="age"
            value={character.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Parentesco:
          <select name="relationship" value={character.relationship} onChange={handleInputChange} required>
            <option value="">Selecciona</option>
            <option value="padre">Padre</option>
            <option value="madre">Madre</option>
            <option value="hijo">Hijo</option>
            <option value="hija">Hija</option>
          </select>
        </label>
        <label>
          Rol:
          <select name="role" value={character.role} onChange={handleInputChange} required>
            <option value="protagonist">Protagonista</option>
            <option value="secondary">Secundario</option>
          </select>
        </label>
        <ImageSelection character={character} handleImageChange={handleImageChange} />
        <div className="buttons">
          <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
          <button type="submit" className="button">Guardar y Siguiente</button>
        </div>
      </form>
      <div className="character-preview">
        <h2>Vista Previa del Personaje</h2>
        <div className="character-images">
          <img src={`/images/skin/${character.skin}.png`} alt="Piel" className="character-image skin" />
          <img src={`/images/skin/kid_base.png`} alt="Base" className="character-image skin" />
          <img src={`/images/hair/${character.hair}.png`} alt="Pelo" className="character-image hair" />
          <img src={`/images/eyes/${character.eyes}.png`} alt="Ojos" className="character-image eyes" />
          <img src={`/images/Eyebrows/${character.eyebrows}.png`} alt="Cejas" className="character-image eyebrows" />
          <img src={`/images/Noses/${character.nose}.png`} alt="Nariz" className="character-image nose" />
          <img src={`/images/Mouths/${character.mouth}.png`} alt="Boca" className="character-image mouth" />
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;
