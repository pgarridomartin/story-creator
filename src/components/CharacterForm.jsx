import React, { useState } from 'react';

const CharacterForm = ({ nextStep, prevStep, addCharacter }) => {
  const [character, setCharacter] = useState({
    name: '',
    gender: '',
    age: '',
    relationship: '',
    role: 'protagonist',
    skin: 'skin1',
    hair: 'hair1',
    eyes: 'eyes1'
  });

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCharacter(character);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <label>
        Nombre:
        <input type="text" name="name" value={character.name} onChange={handleChange} required />
      </label>
      <label>
        Género:
        <select name="gender" value={character.gender} onChange={handleChange} required>
          <option value="">Selecciona</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </label>
      <label>
        Edad:
        <input type="number" name="age" value={character.age} onChange={handleChange} required />
      </label>
      <label>
        Parentesco:
        <select name="relationship" value={character.relationship} onChange={handleChange} required>
          <option value="">Selecciona</option>
          <option value="padre">Padre</option>
          <option value="madre">Madre</option>
          <option value="hijo">Hijo</option>
          <option value="hija">Hija</option>
        </select>
      </label>
      <label>
        Rol:
        <select name="role" value={character.role} onChange={handleChange} required>
          <option value="protagonist">Protagonista</option>
          <option value="secondary">Secundario</option>
        </select>
      </label>
      <label>
        Tipo de Piel:
        <select name="skin" value={character.skin} onChange={handleChange} required>
          <option value="skin1">Piel 1</option>
          <option value="skin2">Piel 2</option>
          <option value="skin3">Piel 3</option>
        </select>
      </label>
      <label>
        Tipo de Pelo:
        <select name="hair" value={character.hair} onChange={handleChange} required>
          <option value="hair1">Pelo 1</option>
          <option value="hair2">Pelo 2</option>
          <option value="hair3">Pelo 3</option>
        </select>
      </label>
      <label>
        Color de Ojos:
        <select name="eyes" value={character.eyes} onChange={handleChange} required>
          <option value="eyes1">Ojos 1</option>
          <option value="eyes2">Ojos 2</option>
          <option value="eyes3">Ojos 3</option>
        </select>
      </label>
      <div className="buttons">
        <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
        <button type="submit" className="button">Guardar y Siguiente</button>
      </div>
    </form>
  );
};

export default CharacterForm;