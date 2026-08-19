import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface ParallaxCarouselProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function ParallaxCarousel<T>({ data, renderItem }: ParallaxCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      
      // Calculate exactly half of the scroll width since we duplicated the array
      const halfWidth = track.scrollWidth / 2;

      // Animate horizontally to exactly -halfWidth, then instantly reset to 0 (repeat: -1)
      tweenRef.current = gsap.to(track, {
        x: -halfWidth,
        duration: 35, // Adjust this value to change the scrolling speed
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  // Duplicate the array to create the seamless infinite scrolling illusion
  const duplicatedData = [...data, ...data];

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden bg-bg relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={trackRef} 
        className="flex flex-nowrap w-max items-center"
      >
        {duplicatedData.map((item, index) => (
          <div 
            key={index} 
            // Using pr-4 md:pr-8 instead of flex gap ensures perfect mathematical looping
            className="w-[75vw] sm:w-[50vw] md:w-[35vw] max-w-[500px] shrink-0 pr-4 md:pr-8"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
