import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface SpecularButtonProps {
  children?: React.ReactNode;
  size?: 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  className?: string;
  onClick?: () => void;
}

const vertexShader = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uLineColor;
  uniform vec3 uBaseColor;
  uniform float uIntensity;
  uniform float uShineSize;
  uniform float uAutoAnimate;
  uniform float uThickness;

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution;
    vec2 p = vUv * 2.0 - 1.0;
    
    // Light position either mouse or automatic circular sweep
    vec2 lightPos = uMouse;
    if (uAutoAnimate > 0.5) {
      lightPos = vec2(sin(uTime * 1.5) * 0.7, cos(uTime * 1.5) * 0.7);
    }
    
    float dist = distance(p, lightPos);
    float shine = exp(-dist * (10.0 / uShineSize)) * uIntensity;
    
    // Specular border edge highlight
    float border = smoothstep(0.45, 0.5, length(p * vec2(0.3, 0.95))) * uThickness;
    
    vec3 col = mix(uBaseColor, uLineColor, clamp(shine + border * 0.4, 0.0, 1.0));
    gl_FragColor = vec4(col, clamp(shine * 0.9 + 0.3, 0.0, 1.0));
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return [isNaN(r) ? 1 : r, isNaN(g) ? 1 : g, isNaN(b) ? 1 : b];
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  children = 'Enquire on WhatsApp',
  size = 'md',
  radius = 999,
  tint = '#6E2F3B',
  tintOpacity = 0.9,
  textColor = '#FFFFFF',
  lineColor = '#EAB780', // Gold
  baseColor = '#D38C8A', // Rose
  intensity = 1.2,
  shineSize = 10,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Default WhatsApp URL as specified in FUNCTIONS
  const defaultWhatsAppUrl =
    'https://wa.me/919943970585?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20room%20at%20Ashka%20Ladies%20Hostel%2C%20Trichy';

  useEffect(() => {
    // Detect touch device
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer | null = null;
    let animId: number;
    const lineRgb = hexToRgb(lineColor);
    const baseRgb = hexToRgb(baseColor);

    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
      const gl = renderer.gl;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: [0, 0] },
          uResolution: { value: [canvas.width, canvas.height] },
          uLineColor: { value: lineRgb },
          uBaseColor: { value: baseRgb },
          uIntensity: { value: intensity },
          uShineSize: { value: shineSize },
          uAutoAnimate: { value: isTouchDevice ? 1.0 : 0.0 },
          uThickness: { value: 1.5 },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!containerRef.current || !renderer) return;
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth === 0 || clientHeight === 0) return;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.uResolution.value = [clientWidth, clientHeight];
      };

      resize();
      window.addEventListener('resize', resize);

      const handleMouseMove = (e: MouseEvent) => {
        if (isTouchDevice || !followMouse || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < proximity) {
          const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
          program.uniforms.uMouse.value = [normX, normY];
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      let lastTime = performance.now();
      const update = (time: number) => {
        const delta = (time - lastTime) * 0.001;
        lastTime = time;
        program.uniforms.uTime.value += delta * speed * 2.0;
        renderer?.render({ scene: mesh });
        animId = requestAnimationFrame(update);
      };

      animId = requestAnimationFrame(update);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } catch {
      // Fallback if WebGL/OGL fails to initialize
      return;
    }
  }, [baseColor, lineColor, intensity, shineSize, speed, isTouchDevice, followMouse, proximity]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = defaultWhatsAppUrl;
    }
  };

  const isLg = size === 'lg';

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-visible group ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* Outer specular glow canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none rounded-full transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        style={{ zIndex: 1 }}
      />

      {/* Button Body */}
      <button
        type="button"
        onClick={handleClick}
        className={`relative flex items-center justify-center gap-2.5 font-medium tracking-wide transition-all duration-300 select-none shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#EAB780] ${
          isLg
            ? 'px-8 py-4 text-base md:text-lg min-w-[200px]'
            : 'px-6 py-3 text-sm md:text-base min-w-[170px]'
        }`}
        style={{
          borderRadius: radius,
          backgroundColor: tint,
          color: textColor,
          border: '1.5px solid rgba(234, 183, 128, 0.65)',
          boxShadow:
            '0 10px 25px -5px rgba(110, 47, 59, 0.6), 0 0 16px rgba(234, 183, 128, 0.35)',
          zIndex: 2,
        }}
      >
        <span className="relative z-10 font-semibold">{children}</span>
        {/* Subtle WhatsApp/Enquire chevron/spark */}
        <svg
          className="w-4 h-4 text-[#EAB780] transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};
