import { useState, useMemo, useEffect } from 'react';
import { levels } from './data/levels';
import Sidebar from './components/Sidebar';
import GameBoard from './components/GameBoard';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState('');
  
  const level = levels[currentLevel];

  // Validate the user input against expected input
  const isCorrect = useMemo(() => {
    if (!userInput) return false;
    
    if (level.expectedInput instanceof RegExp) {
      return level.expectedInput.test(userInput);
    }
    
    // Normalize string comparisons: remove whitespace to be forgiving
    const normalizedInput = userInput.replace(/\s+/g, '');
    const normalizedExpected = (level.expectedInput as string).replace(/\s+/g, '');
    
    return normalizedInput === normalizedExpected;
  }, [userInput, level.expectedInput]);

  const [unlockedLevel, setUnlockedLevel] = useState(0);

  useEffect(() => {
    if (isCorrect && currentLevel === unlockedLevel) {
      setUnlockedLevel(prev => Math.min(prev + 1, levels.length - 1));
    }
  }, [isCorrect, currentLevel, unlockedLevel]);

  const handleNext = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setUserInput('');
    }
  };

  const handlePrev = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
      setUserInput('');
    }
  };

  const handleLevelSelect = (index: number) => {
    setCurrentLevel(index);
    setUserInput('');
  };

  return (
    <div className="layout-container">
      <Sidebar 
        level={level} 
        currentLevel={currentLevel}
        totalLevels={levels.length}
        userInput={userInput}
        setUserInput={setUserInput}
        onNext={handleNext}
        onPrev={handlePrev}
        onLevelSelect={handleLevelSelect}
        isCorrect={isCorrect}
        unlockedLevel={unlockedLevel}
      />
      <GameBoard 
        levels={levels}
        currentLevelIndex={currentLevel}
        isCorrect={isCorrect}
      />
    </div>
  );
}

export default App;
