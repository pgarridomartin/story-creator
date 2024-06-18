import React from 'react';

const CharacterForm = ({ nextStep, prevStep, addCharacter }) => {
  const [character, setCharacter] = React.useState({
    name: '',
    gender: '',
    age: '',
    relationship: '',
    role: 'protagonist'
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
      <div className="buttons">
      <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
        <button type="submit" className="button">Siguiente</button>
      </div>
    </form>
  );
};

export { CharacterForm };

