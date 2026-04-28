'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onEnter = () => {
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; }
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onLeave = () => {
      if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; }
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-green-600 z-9999 pointer-events-none transition-opacity duration-200" style={{ willChange: 'transform' }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-[40px] h-[40px] rounded-full border border-black/20 z-9998 pointer-events-none transition-all duration-300" style={{ willChange: 'transform' }} />
    </>
  );
}
