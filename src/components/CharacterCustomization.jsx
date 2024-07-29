import React, { useState, useEffect } from 'react';
import '../../public/styles.css';
import ImageSelection from './ImageSelection';

const CharacterCustomization = ({ onCharacterUpdate, nextStep, prevStep, character }) => {
  const initialCharacterState = {
    name: 'Lucia',
    gender: 'female',
    age: '3',
    relationship: 'hija',
    role: 'protagonist',
    skin: 'skin3',
    hair: 'hair3',
    eyes: 'eyes1',
    eyebrows: 'kid_eyebrow_2_color_4',
    nose: 'kid_nose_1',
    mouth: 'kid_mouth_2',
    image: ''  // Añadir campo para la URL de la imagen
  };

  const [currentCharacter, setCurrentCharacter] = useState(character || initialCharacterState);

  useEffect(() => {
    if (character) {
      setCurrentCharacter(character);
    }
  }, [character]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value
    }));
  };

  const handleImageChange = (type, value) => {
    setCurrentCharacter((prevCharacter) => ({
      ...prevCharacter,
      [type]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear URL de la imagen compuesta
    const imageURL = createCharacterImageURL(currentCharacter);
    const updatedCharacter = { ...currentCharacter, image: imageURL };

    // Actualizar el estado del personaje y el almacenamiento local
    localStorage.setItem('character', JSON.stringify(updatedCharacter));
    onCharacterUpdate(updatedCharacter);

    // Limpiar el formulario restableciendo el estado del personaje
    setCurrentCharacter(initialCharacterState);
    nextStep();
  };

  const createCharacterImageURL = (character) => {
    // Generar la URL para una imagen compuesta utilizando todos los atributos del personaje
    const baseUrl = 'http://localhost:3001/images';
    return `${baseUrl}/composite?skin=${character.skin}&hair=${character.hair}&eyes=${character.eyes}&eyebrows=${character.eyebrows}&nose=${character.nose}&mouth=${character.mouth}`;
  };

  return (
    <div className="container">
      <h2>Personalización de los Personajes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={currentCharacter.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Género:
          <select name="gender" value={currentCharacter.gender} onChange={handleInputChange} required>
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
            value={currentCharacter.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Parentesco:
          <select name="relationship" value={currentCharacter.relationship} onChange={handleInputChange} required>
            <option value="">Selecciona</option>
            <option value="padre">Padre</option>
            <option value="madre">Madre</option>
            <option value="hijo">Hijo</option>
            <option value="hija">Hija</option>
          </select>
        </label>
        <label>
          Rol:
          <select name="role" value={currentCharacter.role} onChange={handleInputChange} required>
            <option value="">Selecciona</option>
            <option value="protagonist">Protagonista</option>
            <option value="secondary">Secundario</option>
          </select>
        </label>
        <ImageSelection character={currentCharacter} handleImageChange={handleImageChange} />
        <div className="buttons">
          <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
          <button type="submit" className="button">Siguiente</button>
        </div>
      </form>
      <div className="character-preview">
        <h2>Vista Previa del Personaje</h2>
        <div className="character-images">
          <img src={`/images/skin/${currentCharacter.skin}.png`} alt="Piel" className="character-image skin" />
          <img src={`/images/skin/kid_base.png`} alt="Base" className="character-image skin" />
          <img src={`/images/hair/${currentCharacter.hair}.png`} alt="Pelo" className="character-image hair" />
          <img src={`/images/eyes/${currentCharacter.eyes}.png`} alt="Ojos" className="character-image eyes" />
          <img src={`/images/Eyebrows/${currentCharacter.eyebrows}.png`} alt="Cejas" className="character-image eyebrows" />
          <img src={`/images/Noses/${currentCharacter.nose}.png`} alt="Nariz" className="character-image nose" />
          <img src={`/images/Mouths/${currentCharacter.mouth}.png`} alt="Boca" className="character-image mouth" />
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;
