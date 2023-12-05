import { useEffect, useState } from "react";

const animation = [
  '.  ',
  '.. ',
  '...',
  ' ..',
  '  .',
  '   ',
]


export const Spin = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="whitespace-pre">
      {animation[time % animation.length]}
    </span>
  );
};
