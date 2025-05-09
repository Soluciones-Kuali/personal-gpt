import { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  onDone?: () => void;
};

export function Typewriter({ text, onDone }: TypewriterProps) {
  const words = text.split(' ');
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < words.length) {
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      if (onDone) onDone();
    }
  }, [visibleCount, words.length, onDone]);

  const finished = visibleCount === words.length;

  return (
    <h1 className="text-gray-200">
      {words.slice(0, visibleCount).join(' ')}
      {!finished && <span className="blinking-cursor">|</span>}
    </h1>
  );
}
