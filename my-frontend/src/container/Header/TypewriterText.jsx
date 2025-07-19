import React from 'react';
import './TypewriterText.scss';

function TypewriterText({ words }) {
  const [index, setIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [charIndex, setCharIndex] = React.useState(0);
  const [clearing, setClearing] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (!clearing) {
      // Typing the word
      if (charIndex < words[index].length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + words[index][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 100);
      } 
      else {
        // Once the word is fully typed, the clearing effect
        setTimeout(() => {
            setClearing(true);  // Start clearing after 2 seconds
          }, 2000);
      }
    } else {
      // Clearing the word
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1)); // Remove last character
        if (displayedText.length === 1) {
          // Once all characters are removed, move to next word
          setClearing(false);
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, 100); // Adjust delay for clearing speed
    }

    return () => clearTimeout(timeout);
  }, [charIndex, displayedText, index, words, clearing]);

  return (
    <p className="dynamic-txt">
      {displayedText}
      <p className="cursor">.</p>
    </p>
  );
}

export default TypewriterText;
