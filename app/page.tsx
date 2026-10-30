'use client';

import React, { useState } from 'react';
import { work, cats, WorkItem } from '../data/work';
import { Tile } from '../components/Tile';

export default function WorkPage() {
  const [f, setF] = useState<string>('all');

  const items = work.filter((w) => f === 'all' || w.cat === f);

  const count = (id: string) =>
    id === 'all' ? work.length : work.filter((w) => w.cat === id).length;

  const filterBtn = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setF(id)}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
        color: f === id ? 'var(--fg-1)' : 'var(--fg-3)',
        transition: 'color var(--dur-fast)'
      }}
    >
      {label}
      <sup style={{ fontSize: '.45em', marginLeft: 4, verticalAlign: 'super' }}>
        {count(id)}
      </sup>
    </button>
  );

  return (
    <main style={{ padding: '0 var(--gutter)' }}>
      <section
        style={{
          padding: 'var(--space-8) 0 var(--space-7)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)'
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(28px,3.4vw,48px)',
            lineHeight: 1.12,
            fontWeight: 600,
            letterSpacing: '-.025em',
            maxWidth: '30ch',
            textWrap: 'balance'
          }}
        >
          AIM VFX is a design &amp; motion studio making events, products and businesses{' '}
          <span style={{ color: 'var(--aim-indigo)' }}>impossible to miss.</span>
        </h1>
        <nav className="work-filter-nav">
          {filterBtn('all', 'All')}
          {cats.map((c) => filterBtn(c.id, c.label))}
        </nav>
      </section>

      <section className="work-grid">
        {items.map((w: WorkItem, i: number) => (
          <div
            key={w.slug}
            style={{
              animation: 'aim-rise var(--dur-slow) var(--ease-out) both',
              animationDelay: `${i * 40}ms`
            }}
          >
            <Tile item={w} showCat={f === 'all'} />
          </div>
        ))}
      </section>
    </main>
  );
}

