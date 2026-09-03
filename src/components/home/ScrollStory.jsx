import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  // 6 items total. Centers at 0.0, 0.2, 0.4, 0.6, 0.8, 1.0
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

  // Is active logic for pointer events (so invisible items can't be selected)
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image Parallax / Scale
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.04]);
  const badgeY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 0]);

  // Step indicator active number logic
  const activeNumber = useTransform(scrollYProgress, (p) => {
    const idx = Math.min(5, Math.floor(p / 0.2 + 0.5));
    return storyData[idx].id;
  });

  return (
    <section ref={containerRef} className="story-section-wrapper">
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
  );
};
