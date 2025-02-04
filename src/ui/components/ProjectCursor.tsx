import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ProjectCursorProps {
  isVisible: boolean;
}

const ProjectCursor: React.FC<ProjectCursorProps> = ({ isVisible }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    if (isVisible) {
      window.addEventListener('mousemove', onMouseMove);
      const currentMouseEvent = window.event as MouseEvent;
      if (currentMouseEvent) {
        gsap.set(cursor, {
          x: currentMouseEvent.clientX,
          y: currentMouseEvent.clientY,
        });
      }
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 
                 flex items-center justify-center transition-opacity duration-200
                 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ top: 0, left: 0 }}
    >
      <div
        className="bg-brand-beige/90 text-brand-olive px-6 py-3 rounded-full
                 font-medium text-sm tracking-wider flex items-center gap-2
                 backdrop-blur-sm shadow-lg"
      >
        View
      </div>
    </div>
  );
};

export default ProjectCursor; 