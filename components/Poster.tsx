'use client';

import React, { useState, useEffect } from 'react';
import { WorkItem, getCategory } from '../data/work';

interface ReelProps {
  frames: string[];
  dur?: number;
  hover?: boolean;
  pos?: string;
}

export function Reel({ frames, dur = 4200, hover, pos = 'center' }: ReelProps) {
  const [i, setI] = useState(0);
  const step = dur / frames.length;

  useEffect(() => {
    frames.forEach((f) => {
      const im = new Image();
      im.src = f;
    });
    const t = setInterval(() => setI((x) => (x + 1) % frames.length), step);
    return () => clearInterval(t);
  }, [frames, step]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0b0b0b' }}>
      {frames.map((f, k) => (
        <img
          key={f}
          src={f}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: pos,
            opacity: k === i ? 1 : 0,
            transform: k === i ? 'scale(' + (hover ? 1.1 : 1.06) + ')' : 'scale(1)',
            transition:
              k === i
                ? 'opacity 180ms linear, transform ' + (step + 400) + 'ms cubic-bezier(.16,1,.3,1)'
                : 'opacity 180ms linear 120ms, transform 0ms 400ms'
          }}
        />
      ))}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 10, display: 'flex', gap: 4 }}>
        {frames.map((_, k) => (
          <span
            key={k}
            style={{
              flex: 1,
              height: 2,
              background: k <= i ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.3)',
              transition: 'background 200ms'
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface WallProps {
  thumbs: string[];
  frames: string[];
  step?: number;
  hover?: boolean;
}

export function Wall({ thumbs, frames, step = 850, hover }: WallProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    frames.forEach((f) => {
      const im = new Image();
      im.src = f;
    });
    const t = setInterval(() => setI((x) => (x + 1) % frames.length), step);
    return () => clearInterval(t);
  }, [frames, step]);

  const cells = Array.from({ length: 36 }, (_, k) => thumbs[(k * 5 + (k % 3)) % thumbs.length]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0b0b0b', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: '-6%',
          top: '-8%',
          width: '112%',
          height: '116%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gridTemplateRows: 'repeat(6,1fr)',
          gap: '0.6%',
          transform: 'scale(' + (hover ? 1.04 : 1) + ')',
          transition: 'transform 1400ms var(--ease-out)'
        }}
      >
        {cells.map((s, k) => (
          <div
            key={k}
            style={{
              backgroundImage: `url("${s}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center,rgba(0,0,0,0) 40%,rgba(0,0,0,.35))'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '58%',
          aspectRatio: '16/9',
          transform: 'translate(-50%,-50%) scale(' + (hover ? 1.04 : 1) + ')',
          transition: 'transform 900ms var(--ease-out)',
          boxShadow: '0 18px 40px -10px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.06)',
          background: '#000'
        }}
      >
        {frames.map((f, k) => (
          <img
            key={f}
            src={f}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: k === i ? 1 : 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface YTProps {
  item: WorkItem;
  box: React.CSSProperties;
  hover?: boolean;
  controls?: boolean;
}

export function YT({ item, box, hover, controls }: YTProps) {
  const [on, setOn] = useState(false);
  const thumb = item.thumb || 'https://i.ytimg.com/vi/' + item.youtube + '/maxresdefault.jpg';

  if (on) {
    return (
      <div style={{ ...box, background: '#000' }}>
        <iframe
          src={
            'https://www.youtube-nocookie.com/embed/' +
            item.youtube +
            '?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1'
          }
          title={item.client + ' ― ' + item.project}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            left: 0,
            top: -64,
            width: '100%',
            height: 'calc(100% + 64px)',
            border: 0
          }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={controls ? () => setOn(true) : undefined}
      style={{ ...box, background: '#000', cursor: controls ? 'pointer' : 'inherit' }}
    >
      <img
        src={thumb}
        alt={item.client}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(' + (hover ? 1.04 : 1) + ')',
          transition: 'transform 900ms var(--ease-out)'
        }}
      />
      {controls && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 96,
            height: 96,
            borderRadius: 999,
            background: '#fff',
            transform: 'translate(-50%,-50%) scale(' + (hover ? 1.06 : 1) + ')',
            transition: 'transform 320ms var(--ease-out)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderTop: '14px solid transparent',
              borderBottom: '14px solid transparent',
              borderLeft: '22px solid #0c1023',
              marginLeft: 6
            }}
          />
        </span>
      )}
    </div>
  );
}

export interface PosterProps {
  item: WorkItem;
  hover?: boolean;
  ratio?: string;
  big?: boolean;
  controls?: boolean;
}

export function Poster({ item, hover, ratio = '16/9', big, controls }: PosterProps) {
  const c = getCategory(item.cat);
  const e = 'var(--ease-out)';
  const d = '900ms';
  const box: React.CSSProperties = {
    position: 'relative',
    aspectRatio: ratio,
    width: '100%',
    overflow: 'hidden',
    background: c.tint
  };
  const abs = (s: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    transition: 'all ' + d + ' ' + e,
    ...s
  });
  const fs = big ? 'clamp(120px,22vw,340px)' : 'clamp(64px,9vw,150px)';

  if (item.wall) {
    return (
      <div style={{ ...box, background: '#0b0b0b' }}>
        <Wall thumbs={item.wall.thumbs} frames={item.wall.frames} hover={hover} />
      </div>
    );
  }

  if (item.reel && !big) {
    return (
      <div style={{ ...box, background: '#0b0b0b' }}>
        <Reel frames={item.reel} hover={hover} pos={item.reelPos} />
      </div>
    );
  }

  if (item.cover) {
    return (
      <div style={{ ...box, background: '#0b0b0b' }}>
        <img
          src={item.cover}
          alt={item.client}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(' + (hover ? 1.04 : 1) + ')',
            transition: 'transform ' + d + ' ' + e
          }}
        />
      </div>
    );
  }

  if (item.youtube) {
    return <YT item={item} box={box} hover={hover} controls={controls} />;
  }

  if (item.vimeo) {
    const src =
      'https://player.vimeo.com/video/' +
      item.vimeo +
      '?h=' +
      item.h +
      (controls ? '&title=0&byline=0&portrait=0&dnt=1' : '&background=1&dnt=1');
    return (
      <div style={{ ...box, background: '#000' }}>
        <iframe
          src={src}
          title={item.client + ' ― ' + item.project}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            border: 0,
            pointerEvents: controls ? 'auto' : 'none',
            transform: 'translate(-50%,-50%) scale(' + (hover && !controls ? 1.04 : 1) + ')',
            transition: 'transform ' + d + ' ' + e
          }}
        />
      </div>
    );
  }

  if (item.layout === 'reel') {
    return (
      <div style={{ ...box, background: '#000' }}>
        <div
          style={abs({
            inset: 0,
            background: 'linear-gradient(100deg,#fe71ff,#8368fa 35%,#5165f8 55%,#24d6f4 80%,#fe71ff)',
            backgroundSize: '300% 100%',
            backgroundPosition: hover ? '100% 50%' : '0% 50%',
            opacity: hover ? 0.9 : 0.0,
            transition: 'all 2400ms linear'
          })}
        />
        <img
          src="/assets/logo/aimvfx-logo-reversed.svg"
          alt="AIM VFX"
          style={abs({
            left: '50%',
            top: '50%',
            width: '42%',
            transform: 'translate(-50%,-50%) scale(' + (hover ? 1.06 : 1) + ')'
          })}
        />
        <span
          style={abs({
            left: '4%',
            bottom: '6%',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '.16em'
          })}
        >
          {item.year}
        </span>
      </div>
    );
  }

  if (item.layout === 'blocks') {
    return (
      <div style={box}>
        <div
          style={abs({
            left: 0,
            bottom: 0,
            width: hover ? '62%' : '38%',
            height: '58%',
            background: c.id === 'business' ? '#0c1023' : c.c
          })}
        />
        <div
          style={abs({
            right: 0,
            bottom: 0,
            width: hover ? '38%' : '62%',
            height: hover ? '30%' : '18%',
            background: c.id === 'business' ? '#5165f8' : '#0c1023'
          })}
        />
        <div
          style={abs({
            left: '5%',
            top: '8%',
            fontSize: big ? 64 : 28,
            fontWeight: 700,
            letterSpacing: '-.03em',
            color: '#0c1023',
            transform: hover ? 'translateY(0)' : 'translateY(-6px)',
            opacity: hover ? 1 : 0.85
          })}
        >
          {item.word}
        </div>
      </div>
    );
  }

  if (item.layout === 'circle') {
    return (
      <div style={{ ...box, background: c.id === 'events' ? '#0c1023' : c.c }}>
        <div
          style={abs({
            width: '70%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: c.id === 'events' ? c.c : '#fff',
            right: hover ? '-8%' : '-22%',
            top: hover ? '-10%' : '-30%'
          })}
        />
        <div
          style={abs({
            width: '22%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: c.id === 'events' ? '#fe71ff' : '#0c1023',
            left: hover ? '18%' : '8%',
            bottom: hover ? '14%' : '10%'
          })}
        />
      </div>
    );
  }

  if (item.layout === 'stripes') {
    return (
      <div style={{ ...box, background: '#0c1023' }}>
        {['#fe71ff', '#5165f8', '#24d6f4'].map((col, idx) => (
          <div
            key={idx}
            style={abs({
              left: 0,
              top: 20 + idx * 22 + '%',
              height: '18%',
              background: col,
              width: hover ? [88, 54, 72][idx] + '%' : [34, 72, 48][idx] + '%',
              transitionDelay: idx * 60 + 'ms'
            })}
          />
        ))}
        <div
          style={abs({
            right: '5%',
            bottom: '7%',
            fontSize: big ? 40 : 16,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '.08em'
          })}
        >
          {item.word}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...box, background: c.id === 'business' ? '#000' : '#0c1023' }}>
      <div
        style={abs({
          left: hover ? '-4%' : '2%',
          top: '50%',
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          fontSize: fs,
          fontWeight: 800,
          letterSpacing: '-.05em',
          lineHeight: 0.8,
          color: c.c === '#000' ? '#fff' : c.c
        })}
      >
        {item.word}
        {item.word}
      </div>
    </div>
  );
}

