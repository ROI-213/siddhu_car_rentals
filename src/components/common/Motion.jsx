import React, { useEffect, useRef, useState } from 'react';

// FadeIn animation primitive using Intersection Observer
export const FadeIn = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  let transformInitial = 'translateY(24px)';
  if (direction === 'down') transformInitial = 'translateY(-24px)';
  if (direction === 'left') transformInitial = 'translateX(24px)';
  if (direction === 'right') transformInitial = 'translateX(-24px)';
  if (direction === 'none') transformInitial = 'none';

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transformInitial,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// SlideUp convenience component
export const SlideUp = ({ children, delay = 0, className = '', style = {} }) => (
  <FadeIn delay={delay} direction="up" className={className} style={style}>
    {children}
  </FadeIn>
);

// Cinematic Image Reveal Container
export const ImageReveal = ({
  src,
  alt = '',
  aspectRatio = '16/9',
  className = '',
  overlay = true,
  badgeText = null,
  style = {}
}) => {
  return (
    <div
      className={`img-reveal-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg-foundation-alt)',
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="reveal-img"
      />
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(18,21,28,0) 50%, rgba(18,21,28,0.6) 100%)',
            pointerEvents: 'none'
          }}
        />
      )}
      {badgeText && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }}>
          <span className="badge badge-dark">{badgeText}</span>
        </div>
      )}
      <style>{`
        .img-reveal-wrapper:hover .reveal-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};
