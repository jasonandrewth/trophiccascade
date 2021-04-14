import { useState, useEffect } from "react";
import { useThrottle } from 'use-throttle';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const throttledX = useThrottle(mousePosition.x, 1000);
  const throttledY = useThrottle(mousePosition.y, 1000);

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return {x: throttledX, y:throttledY};
};

export default useMousePosition;
