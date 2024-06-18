import React, { useState, useEffect } from 'react';

const CharacterCustomization = ({ onCharacterUpdate, nextStep, prevStep }) => {
    const initialCharacterState = {
        name: '',
        gender: '',
        age: '',
        role: '',
        skin: 'skin1',
        hair: 'hair1',
        eyes: 'eyes1'
    };

    const [character, setCharacter] = useState(() => {
        const savedCharacter = localStorage.getItem('character');
        return savedCharacter ? JSON.parse(savedCharacter) : initialCharacterState;
    });

    useEffect(() => {
        localStorage.setItem('character', JSON.stringify(character));
        onCharacterUpdate(character);
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
                    Rol:
                    <select name="role" value={character.role} onChange={handleInputChange} required>
                        <option value="protagonist">Protagonista</option>
                        <option value="secondary">Secundario</option>
                    </select>
                </label>
                <label>
                    Tipo de Piel:
                    <select name="skin" value={character.skin} onChange={(e) => handleImageChange('skin', e.target.value)} required>
                        <option value="skin1">Piel 1</option>
                        <option value="skin2">Piel 2</option>
                        <option value="skin3">Piel 3</option>
                    </select>
                </label>
                <label>
                    Tipo de Pelo:
                    <select name="hair" value={character.hair} onChange={(e) => handleImageChange('hair', e.target.value)} required>
                        <option value="hair1">Pelo 1</option>
                        <option value="hair2">Pelo 2</option>
                        <option value="hair3">Pelo 3</option>
                    </select>
                </label>
                <label>
                    Color de Ojos:
                    <select name="eyes" value={character.eyes} onChange={(e) => handleImageChange('eyes', e.target.value)} required>
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
        </div>
    );
};

export default CharacterCustomization;
