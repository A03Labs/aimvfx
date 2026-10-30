'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WorkItem, getCategory, work } from '../data/work';
import { Poster } from './Poster';
import { FlipBook } from './FlipBook';
import { Tile } from './Tile';

export function ProjectDetail({ item }: { item: WorkItem }) {
  const [h, setH] = useState(false);
  const i = work.findIndex((w) => w.slug === item.slug);
  const next = work[(i + 1) % work.length];
  const c = getCategory(item.cat);

  const meta = [
    ['Client', item.client2 || item.client],
    ['Discipline', c.label],
    ['Deliverable', item.project],
    ['Year', item.year]
  ];

  const slot = (id: string, ph: string, ratio = '16/9') => (
    <div
      key={id}
      style={{
        aspectRatio: ratio,
        width: '100%',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-2)',
        border: '1px dashed var(--border-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--fg-3)',
        fontSize: 14,
        fontWeight: 500
      }}
    >
      {ph}
    </div>
  );

  return (
    <main style={{ padding: '0 var(--gutter)' }}>
      <section
        style={{
          padding: 'var(--space-7) 0 var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)'
        }}
      >
        <Link href="/" style={{ cursor: 'pointer', fontSize: 15, color: 'var(--fg-3)', display: 'inline-block' }}>
          ← All work
        </Link>
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(40px,6vw,96px)',
            lineHeight: 0.98,
            fontWeight: 700,
            letterSpacing: '-.035em'
          }}
        >
          {item.client} <span style={{ color: 'var(--fg-3)' }}>― {item.project}</span>
        </h1>
      </section>

      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}
      >
        <Poster item={item} hover={h} big controls={!!(item.vimeo || item.youtube)} />
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
          gap: 24,
          padding: 'var(--space-6) 0',
          borderBottom: '1px solid var(--border-1)'
        }}
      >
        {meta.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)'
              }}
            >
              {k}
            </span>
            <span style={{ fontSize: 17, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </section>

      <p
        style={{
          margin: 'var(--space-7) 0',
          fontSize: 'clamp(22px,2.2vw,32px)',
          lineHeight: 1.3,
          fontWeight: 500,
          letterSpacing: '-.015em',
          maxWidth: '34ch'
        }}
      >
        {item.desc || 'One line on the problem and the idea. Let the frames below do the rest.'}
      </p>

      {item.cat === 'business' ? (
        <FlipBook
          key={item.slug}
          label={item.project}
          pages={
            item.pages
              ? item.pages.map((src) => ({ src }))
              : item.gallery
              ? item.gallery.flat().map((src) => ({ src }))
              : Array.from({ length: 10 }, (_, n) => ({ slot: `${item.slug}-page-${n + 1}` }))
          }
        />
      ) : item.gallery ? (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {item.gallery.map((row, ri) => (
            <div
              key={ri}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
                gap: 24,
                alignItems: 'start'
              }}
            >
              {row.map((src) => (
                <img
                  key={src}
                  src={src}
                  loading="lazy"
                  alt=""
                  style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }}
                />
              ))}
            </div>
          ))}
        </section>
      ) : (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {slot('hero', 'Drop the hero frame or GIF')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {slot('a', 'Styleframe', '4/5')}
            {slot('b', 'Styleframe', '4/5')}
          </div>
          {slot('c', 'Wide frame', '21/9')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
            {slot('d', 'Frame', '1/1')}
            {slot('e', 'Frame', '1/1')}
            {slot('f', 'Frame', '1/1')}
          </div>
        </section>
      )}

      <section style={{ padding: 'var(--space-9) 0 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)'
          }}
        >
          Next project
        </span>
        <div style={{ maxWidth: 640 }}>
          <Tile item={next} />
        </div>
      </section>
    </main>
  );
}

