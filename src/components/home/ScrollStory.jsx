import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ScrollStory.css';

const storyData = [
  {
    id: '01',
    label: 'PROFESSIONAL DRIVERS',
    title: 'Professional chauffeurs.\nTrained for premium travel.',
    desc: 'Uniformed, police-verified, English-speaking chauffeurs trained in VIP confidentiality.',
  },
  {
    id: '02',
    label: 'WELL-MAINTAINED VEHICLES',
    title: 'Premium vehicles.\nAlways ready for your journey.',
    desc: '100% factory-serviced vehicles with sanitized non-smoking cabins.',
  },
  {
    id: '03',
    label: 'AFFORDABLE PRICING',
    title: 'Transparent pricing.\nNo unexpected surprises.',
    desc: 'Clear, transparent hourly and per-km tariffs with no hidden surge pricing.',
  },
  {
    id: '04',
    label: 'ON-TIME SERVICE',
    title: 'Punctuality you can\ndepend on.',
    desc: 'Chauffeur arrives before scheduled pickup with live flight tracking.',
  },
  {
    id: '05',
    label: '24/7 SUPPORT',
    title: 'Always available.',
    desc: 'Dedicated corporate concierge support to coordinate scheduling changes.',
  },
  {
    id: '06',
    label: 'SAFE & COMFORTABLE',
    title: 'Travel with confidence.',
    desc: 'GPS-equipped tracking with emergency response triggers and speed governors.',
  }
];

const StoryItem = ({ item, index, progress }) => {
  const center = index * 0.2;

  const opacity = useTransform(progress, (p) => {
    const dist = Math.abs(p - center);
    if (dist < 0.02) return 1;
    if (dist < 0.12) return 1 - (dist - 0.02) / 0.1;
    return 0;
  });
  
  const y = useTransform(progress, (p) => {
    const diff = p - center;
    if (diff < -0.12) return 80;
    if (diff < -0.02) return 80 * (1 - (diff + 0.12) / 0.1);
    if (diff <= 0.02) return 0;
    if (diff <= 0.12) return -80 * ((diff - 0.02) / 0.1);
    return -80;
  });

  const blurValue = useTransform(progress, (p) => {
    const dist = Math.abs(p - center);
    if (dist < 0.02) return 0;
    if (dist < 0.12) return 4 * ((dist - 0.02) / 0.1);
    return 4;
  });
  
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const pointerEvents = useTransform(opacity, (val) => val > 0.5 ? 'auto' : 'none');

  return (
    <motion.div 
      className="story-content-block"
      style={{ opacity, y, filter, pointerEvents }}
    >
      <div className="story-category-label">
        <span>{item.id}</span>
        <span className="dot">•</span>
        <span>{item.label}</span>
      </div>

      <h3 className="story-heading">
        {item.title.split('\n').map((line, i) => (
          <span key={i} className="story-heading-line">{line}</span>
        ))}
      </h3>

      <p className="story-desc">
        {item.desc}
      </p>
    </motion.div>
  );
};

export const ScrollStory = () => {
  const containerRef = useRef(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const touchStartX = useRef(null);

  // Auto-advance story on mobile view
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIdx((prev) => (prev + 1) % storyData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? storyData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIdx((prev) => (prev + 1) % storyData.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image Parallax / Scale
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.04]);

  // Step indicator active number logic
  const activeNumber = useTransform(scrollYProgress, (p) => {
    const idx = Math.min(5, Math.floor(p / 0.2 + 0.5));
    return storyData[idx].id;
  });

  return (
    <>
      {/* 1. MOBILE RESPONSIVE CAROUSEL (Eliminates all dead vertical gaps and text clipping) */}
      <section 
        className="story-mobile-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="story-mobile-inner">
          {/* Top Image Viewport */}
          <div className="story-mobile-image-card">
            <img 
              src="/images/premium_fleet_v2.jpg" 
              alt="Premium Chauffeur Travel" 
              className="story-mobile-img"
            />
            <div className="story-mobile-badge">
              <span className="story-mobile-badge-curr">{storyData[activeStoryIdx].id}</span>
              <span className="story-mobile-badge-sep">/</span>
              <span className="story-mobile-badge-total">06</span>
            </div>
          </div>

          {/* Story Content Card - Fully visible, guaranteed zero text cut-off */}
          <div className="story-mobile-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={storyData[activeStoryIdx].id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="story-mobile-content"
              >
                <div className="story-category-label">
                  <span>{storyData[activeStoryIdx].id}</span>
                  <span className="dot">•</span>
                  <span>{storyData[activeStoryIdx].label}</span>
                </div>

                <h3 className="story-mobile-heading">
                  {storyData[activeStoryIdx].title.split('\n').map((line, i) => (
                    <span key={i} className="story-heading-line">{line}</span>
                  ))}
                </h3>

                <p className="story-mobile-desc">
                  {storyData[activeStoryIdx].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots and Arrow Controls */}
            <div className="story-mobile-controls">
              <button 
                type="button" 
                onClick={handlePrev} 
                className="story-mobile-arrow"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="story-mobile-dots">
                {storyData.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`story-mobile-dot ${idx === activeStoryIdx ? 'active' : ''}`}
                    aria-label={`Go to story ${item.id}`}
                  />
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleNext} 
                className="story-mobile-arrow"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESKTOP STICKY SCROLL STORY (Preserved for screens > 768px) */}
      <section ref={containerRef} className="story-section-wrapper story-desktop-section">
        <div className="sticky-story-container">
          <div className="story-container">
            {/* LEFT: STATIC STICKY IMAGE AREA */}
            <div className="story-left-pane">
              <div className="story-image-viewport">
                <motion.img 
                  src="/images/premium_fleet_v2.jpg" 
                  alt="Premium Chauffeur Travel" 
                  className="story-img"
                  style={{ scale: imageScale }}
                />
                <div className="story-img-gradient"></div>
              </div>
            </div>

            {/* RIGHT: SCROLL-LINKED ABSOLUTE CONTENT AREA */}
            <div className="story-right-pane-wrapper">
              <div className="story-content-viewport">
                {storyData.map((item, index) => (
                  <StoryItem 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    progress={scrollYProgress} 
                  />
                ))}
              </div>

              {/* Vertical Progress Indicator */}
              <div className="story-step-indicator">
                <div className="step-line"></div>
                <motion.div className="step-active-number">
                  {activeNumber}
                </motion.div>
                <div className="step-total-number">/ 06</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
