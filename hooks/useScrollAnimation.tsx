
import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = <T extends HTMLElement>(options?: { threshold?: number; rootMargin?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport or above fold on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50 && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options?.threshold ?? 0.05,
        rootMargin: options?.rootMargin ?? '0px 0px 60px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
};

