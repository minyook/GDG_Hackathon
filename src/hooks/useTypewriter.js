import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50, active = true) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!active || !text) {
      setTypedText('');
      return;
    }

    let i = 0;
    setTypedText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, active]);

  return typedText;
};
