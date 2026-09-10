'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'shield';
  className?: string;
}

export function BrandLogo({
  variant = 'header',
  className = '',
}: BrandLogoProps) {
  if (variant === 'shield') {
    return (
      <div className={`relative shrink-0 ${className}`}>
        <Image
          src="/logo-shield-transparent.webp"
          alt="SicherTarif Schutzschild"
          width={858}
          height={1018}
          priority
          className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105"
        />
      </div>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 py-1 select-none transition-transform group-hover:scale-[1.02] ${className}`}>
      {/* Das Logo-Icon (Schild) */}
      <Image
        src="/logo-shield-transparent.webp"
        alt="SicherTarif Logo Icon"
        width={858}
        height={1018}
        priority
        className={`w-auto object-contain ${
          isFooter 
            ? 'h-8 sm:h-10 drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)]' 
            : 'h-8 sm:h-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
        }`}
      />
      
      {/* Der Text, direkt als HTML/CSS eingebaut */}
      <div className="flex flex-col justify-center">
        <div className={`font-extrabold tracking-tight leading-none ${isFooter ? 'text-white' : 'text-slate-800'}`}>
          <span className={isFooter ? 'text-xl sm:text-2xl' : 'text-xl sm:text-3xl'}>
            sicher
          </span>
          <span className={`${isFooter ? 'text-xl sm:text-2xl text-cyan-400' : 'text-xl sm:text-3xl text-cyan-600'}`}>
            tarif
          </span>
        </div>
        <span className={`text-[9px] sm:text-[11.5px] font-black tracking-widest uppercase mt-0.5 sm:mt-1 whitespace-nowrap ${
          isFooter 
            ? 'text-slate-300' 
            : 'text-slate-900'
        }`}>
          Vergleichen & Sparen
        </span>
      </div>
    </div>
  );
}
