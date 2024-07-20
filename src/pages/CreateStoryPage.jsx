import React, { useState } from 'react';
import CharacterCustomization from '../components/CharacterCustomization.jsx';
import StoryPrompt from '../components/StoryPrompt.jsx';
import StoryForm from '../components/StoryForm.jsx';

const CreateStoryPage = ({ navigateTo }) => {
  const [characters, setCharacters] = useState([]);
  const [currentStep, setCurrentStep] = useState('characterForm');

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  const nextStep = () => {
    if (currentStep === 'characterForm') {
      setCurrentStep('storyForm');
    } 
  };

  const prevStep = () => {
    if (currentStep === 'storyForm') {
      setCurrentStep('characterForm');
    } else if (currentStep === 'characterForm') {
      navigateTo('home');
    }
  };

  const addMoreCharacters = () => {
    setCurrentStep('characterForm');
  };

  console.log(`Current step: ${currentStep}`);

  return (
    <div className="container">
      {currentStep === 'characterForm' && <CharacterCustomization nextStep={nextStep} prevStep={prevStep} addCharacter={addCharacter} />}
      {currentStep === 'storyForm' && <StoryForm characters={characters} prevStep={prevStep} addMoreCharacters={addMoreCharacters} />}
    </div>
  );
};

export default CreateStoryPage;
