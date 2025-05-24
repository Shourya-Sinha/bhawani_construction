
import { useEffect, useRef, ReactNode } from 'react';

type RevealOnScrollProps = {
  children: ReactNode;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
};

const RevealOnScroll = ({
  children,
  threshold = 0.1,
  direction = 'none',
  delay = 0,
  className = '',
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  let animationClass = 'reveal-on-scroll';
  
  if (direction === 'up') {
    animationClass += ' translate-y-16';
  } else if (direction === 'down') {
    animationClass += ' -translate-y-16';
  } else if (direction === 'left') {
    animationClass += ' translate-x-16';
  } else if (direction === 'right') {
    animationClass += ' -translate-x-16';
  }

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
