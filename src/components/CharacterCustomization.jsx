import React, { useState, useEffect } from 'react';
import '../../public/styles.css';

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
                <div className="image-selection">
                    <div className="options">
                        <p>Tipo de Piel:</p>
                        <img
                            src="/images/skin/skin1.png"
                            alt="Piel 1"
                            className={character.skin === 'skin1' ? 'selected' : ''}
                            onClick={() => handleImageChange('skin', 'skin1')}
                        />
                        <img
                            src="/images/skin/skin2.png"
                            alt="Piel 2"
                            className={character.skin === 'skin2' ? 'selected' : ''}
                            onClick={() => handleImageChange('skin', 'skin2')}
                        />
                        <img
                            src="/images/skin/skin3.png"
                            alt="Piel 3"
                            className={character.skin === 'skin3' ? 'selected' : ''}
                            onClick={() => handleImageChange('skin', 'skin3')}
                        />
                    </div>
                    <div className="options">
                        <p>Tipo de Pelo:</p>
                        <img
                            src="/images/hair/hair1.png"
                            alt="Pelo 1"
                            className={character.hair === 'hair1' ? 'selected' : ''}
                            onClick={() => handleImageChange('hair', 'hair1')}
                        />
                        <img
                            src="/images/hair/hair2.png"
                            alt="Pelo 2"
                            className={character.hair === 'hair2' ? 'selected' : ''}
                            onClick={() => handleImageChange('hair', 'hair2')}
                        />
                        <img
                            src="/images/hair/hair3.png"
                            alt="Pelo 3"
                            className={character.hair === 'hair3' ? 'selected' : ''}
                            onClick={() => handleImageChange('hair', 'hair3')}
                        />
                    </div>
                    <div className="options">
                        <p>Color de Ojos:</p>
                        <img
                            src="/images/eyes/eyes1.png"
                            alt="Ojos 1"
                            className={character.eyes === 'eyes1' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyes', 'eyes1')}
                        />
                        <img
                            src="/images/eyes/eyes2.png"
                            alt="Ojos 2"
                            className={character.eyes === 'eyes2' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyes', 'eyes2')}
                        />
                        <img
                            src="/images/eyes/eyes3.png"
                            alt="Ojos 3"
                            className={character.eyes === 'eyes3' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyes', 'eyes3')}
                        />
                    </div>
                    <div className="options">
                        <p>Tipo de Cejas:</p>
                        <img
                            src="/images/Eyebrows/kid_eyebrow_1_color_1.png"
                            alt="Cejas 1"
                            className={character.eyebrows === 'kid_eyebrow_1_color_1' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyebrows', 'kid_eyebrow_1_color_1')}
                        />
                        <img
                            src="/images/Eyebrows/kid_eyebrow_1_color_2.png"
                            alt="Cejas 2"
                            className={character.eyebrows === 'kid_eyebrow_1_color_2' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyebrows', 'kid_eyebrow_1_color_2')}
                        />
                        <img
                            src="/images/Eyebrows/kid_eyebrow_2_color_3.png"
                            alt="Cejas 3"
                            className={character.eyebrows === 'kid_eyebrow_2_color_3' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyebrows', 'kid_eyebrow_2_color_3')}
                        />
                        <img
                            src="/images/Eyebrows/kid_eyebrow_2_color_4.png"
                            alt="Cejas 4"
                            className={character.eyebrows === 'kid_eyebrow_2_color_4' ? 'selected' : ''}
                            onClick={() => handleImageChange('eyebrows', 'kid_eyebrow_2_color_4')}
                        />
                    </div>
                    <div className="options">
                        <p>Tipo de Nariz:</p>
                        <img
                            src="/images/Noses/kid_nose_1.png"
                            alt="Nariz 1"
                            className={character.nose === 'kid_nose_1' ? 'selected' : ''}
                            onClick={() => handleImageChange('nose', 'kid_nose_1')}
                        />
                        <img
                            src="/images/Noses/kid_nose_2.png"
                            alt="Nariz 2"
                            className={character.nose === 'kid_nose_2' ? 'selected' : ''}
                            onClick={() => handleImageChange('nose', 'kid_nose_2')}
                        />
                    </div>
                    <div className="options">
                        <p>Tipo de Boca:</p>
                        <img
                            src="/images/Mouths/kid_mouth_1.png"
                            alt="Boca 1"
                            className={character.mouth === 'kid_mouth_1' ? 'selected' : ''}
                            onClick={() => handleImageChange('mouth', 'kid_mouth_1')}
                        />
                        <img
                            src="/images/Mouths/kid_mouth_2.png"
                            alt="Boca 2"
                            className={character.mouth === 'kid_mouth_2' ? 'selected' : ''}
                            onClick={() => handleImageChange('mouth', 'kid_mouth_2')}
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" className="button secondary" onClick={prevStep}>Atrás</button>
                    <button type="submit" className="button">Guardar y Siguiente</button>
                </div>
            </form>
            <div className="character-preview">
                <h2>Vista Previa del Personaje</h2>
                <div className="character-images">
                    <img src={`/images/skin/${character.skin}.png`} alt="Piel" className="character-image skin" />
                    <img src={`/images/skin/kid_base.png`} alt="Piel" className="character-image skin" />
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

