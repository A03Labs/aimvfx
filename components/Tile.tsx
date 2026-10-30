'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WorkItem, getCategory } from '../data/work';
import { Poster } from './Poster';

export interface TileProps {
  item: WorkItem;
  showCat?: boolean;
}

export function Tile({ item, showCat = true }: TileProps) {
  const [h, setH] = useState(false);
  const c = getCategory(item.cat);

  const catColor =
    c.id === 'showreels'
      ? 'var(--fg-3)'
      : c.id === 'business'
      ? 'var(--accent-text)'
      : c.id === 'products'
      ? 'var(--accent-2)'
      : 'var(--fg-2)';

  return (
    <Link
      href={`/work/${item.slug}`}
      className="work-card"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div className="work-card-media">
        <Poster item={item} hover={h} />
      </div>
      <div className="work-card-caption">
        <div className="work-card-info">
          {showCat && (
            <span className="work-card-cat" style={{ color: catColor }}>
              {c.label}
            </span>
          )}
          <span className="work-card-client">{item.client}</span>
          <span className="work-card-project">― {item.project}</span>
        </div>
        <span
          className="work-card-arrow"
          aria-hidden="true"
          style={{
            opacity: h ? 1 : undefined,
            transform: h ? 'none' : undefined
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
