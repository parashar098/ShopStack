
"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';

const IMGS = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=800&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=800&auto=format&fit=crop'
];

type RollingGalleryProps = {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images?: string[];
}

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = IMGS }: RollingGalleryProps) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  
  useEffect(() => {
    const checkSize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<NodeJS.Timeout>();

  const handleDrag = (_: any, info: { offset: { x: any; }; }) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number; }; }) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.1, ease: 'easeOut' }
    });
  };

  const transform = useTransform(rotation, value => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: 'linear' }
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);

      return () => {
          if (autoplayRef.current) {
              clearInterval(autoplayRef.current);
          }
      }
    }
  }, [autoplay, rotation, controls, faceCount]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 360 / faceCount,
        transition: { duration: 2, ease: 'linear' }
      });
      rotation.set(rotation.get() - 360 / faceCount);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: 'linear' }
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d'
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`
              }}
            >
              <img 
                src={url} 
                alt={`gallery image ${i + 1}`} 
                className="gallery-img" 
                width={isScreenSizeSm ? 280 : 320}
                height={isScreenSizeSm ? 160 : 200}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
