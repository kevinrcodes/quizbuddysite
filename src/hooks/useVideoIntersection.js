import { useEffect, useRef } from 'react';

export const useVideoIntersection = (options = {}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(error => {
            // Handle autoplay restrictions
            console.log('Autoplay prevented:', error);
          });
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.5, // Video will play when 50% is visible
      ...options
    });

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return videoRef;
}; 