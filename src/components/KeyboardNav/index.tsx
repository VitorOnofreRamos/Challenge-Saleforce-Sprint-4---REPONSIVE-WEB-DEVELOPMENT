'use client'

import React, { useEffect, useRef } from 'react';

// Definindo um tipo unificado para os elementos focáveis
type FocusableElement = HTMLAnchorElement | HTMLButtonElement | HTMLInputElement;

interface NavigationProps {
  children: React.ReactNode;
}

const KeyboardNav: React.FC<NavigationProps> = ({ children }) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const elements = Array.from(refContainer.current?.querySelectorAll('a, button, input') || []) as FocusableElement[];
      const focusableElements = elements.filter(el => el.focus!== undefined);
      const currentIndex = focusableElements.indexOf(activeElement);

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (currentIndex > 0) {
            focusableElements[currentIndex - 1].focus();
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (currentIndex < focusableElements.length - 1) {
            focusableElements[currentIndex + 1].focus();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={refContainer}>
      {children}
    </div>
  );
};

export default KeyboardNav;
