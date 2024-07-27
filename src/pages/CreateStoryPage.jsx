import React, { useState } from 'react';
import axios from 'axios';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';

const CreateStoryPage = () => {
  const [characters, setCharacters] = useState([]);
  const [story, setStory] = useState('');
  const [imagePrompts, setImagePrompts] = useState([]);
  const [images, setImages] = useState([]);
  const [step, setStep] = useState(1); // Add step state

  const handleCharacterUpdate = (updatedCharacter) => {
    setCharacters([...characters.filter(char => char.name !== updatedCharacter.name), updatedCharacter]);
  };

  const handleStoryGenerated = (generatedStory, extractedPrompts) => {
    setStory(generatedStory);
    setImagePrompts(extractedPrompts);
  };

  const generateImages = async () => {
    if (imagePrompts.length === 0) {
      console.error('No image prompts available');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/generate-images', { prompts: imagePrompts });
      setImages(response.data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div>
      {step === 1 && (
        <CharacterCustomization onCharacterUpdate={handleCharacterUpdate} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 2 && (
        <StoryPrompt onStoryGenerated={handleStoryGenerated} characters={characters} prevStep={prevStep} />
      )}
      {story && (
        <div>
          <h2>Generated Story</h2>
          <div dangerouslySetInnerHTML={{ __html: story }} />
          <button onClick={generateImages}>Generate Images</button>
        </div>
      )}
      {images.length > 0 && (
        <div>
          <h2>Generated Images</h2>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Generated scene ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateStoryPage;
