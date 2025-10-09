
"use client";

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

import '@/app/counter.css';

function Number({ mv, number, height }: { mv: any; number: number; height: number }) {
  let y = useTransform(mv, (latest: number) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height, digitStyle }: { place: number; value: number; height: number; digitStyle: any }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'white',
  fontWeight = 'bold',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle
}: {
    value: number;
    fontSize?: number;
    padding?: number;
    places?: number[];
    gap?: number;
    borderRadius?: number;
    horizontalPadding?: number;
    textColor?: string;
    fontWeight?: string | number;
    containerStyle?: React.CSSProperties;
    counterStyle?: React.CSSProperties;
    digitStyle?: React.CSSProperties;
    gradientHeight?: number;
    gradientFrom?: string;
    gradientTo?: string;
    topGradientStyle?: React.CSSProperties;
    bottomGradientStyle?: React.CSSProperties;
}) {
  const height = fontSize + padding;
  
  const derivedPlaces = places || (() => {
    const p = [];
    if (value === 0) return [1];
    let n = value;
    let i = 1;
    while (n >= 1) {
        p.unshift(i);
        n /= 10;
        i *= 10;
    }
    // Handle cases like 100, 1000 where loop doesn't run correctly
    if (p.length === 0 && value > 0) {
        let temp = value;
        while (temp > 0) {
            const place = Math.pow(10, Math.floor(Math.log10(temp)));
            p.push(place);
            temp %= place;
            if (temp === 0 && Math.log10(value) % 1 === 0) {
                 // Fill remaining places with 1s for powers of 10
                 let currentPlace = place / 10;
                 while(currentPlace >= 1) {
                    p.push(currentPlace);
                    currentPlace /= 10;
                 }
                 break;
            }
        }
        //This is a hack to get it to work for now
        return String(value).split('').map((_,i) => Math.pow(10, String(value).length - 1 - i));
    }
    return p.length > 0 ? p : [1];
  })();

  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight
  };
  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
  };
  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
  };
  return (
    <div className="counter-container" style={containerStyle}>
      <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {derivedPlaces.map(place => (
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </div>
      <div className="gradient-container">
        <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>
        <div
          className="bottom-gradient"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></div>
      </div>
    </div>
  );
}
