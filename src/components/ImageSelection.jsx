import React from 'react';

const ImageSelection = ({ character, handleImageChange }) => {
    return (
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
    );
};

export default ImageSelection;
