'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Tag } from '../../components/ui/Tag';
import { Button } from '../../components/ui/Button';

export default function ContactPage() {
  const [h, setH] = useState(false);
  const [need, setNeed] = useState<string[]>(['events']);
  const [sent, setSent] = useState(false);

  const cats: [string, string, 'cyan' | 'pink' | 'indigo'][] = [
    ['events', 'Events', 'cyan'],
    ['products', 'Products', 'pink'],
    ['business', 'Business', 'indigo']
  ];

  const toggle = (id: string) => {
    setNeed((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));
  };

  const eb: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    color: 'var(--fg-3)'
  };

  const intro = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <span style={eb}>Start a project</span>
      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(40px,5vw,80px)',
          lineHeight: 0.98,
          fontWeight: 700,
          letterSpacing: '-.035em',
          maxWidth: '12ch'
        }}
      >
        Tell us what needs to be seen.
      </h1>
      <p style={{ margin: 0, fontSize: 'var(--fs-body-lg)', color: 'var(--fg-2)', maxWidth: '36ch' }}>
        A few lines is enough. We reply within one working day.
      </p>
      <a
        href="mailto:hello@aimvfx.co"
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          fontSize: 'clamp(22px,2.4vw,34px)',
          fontWeight: 600,
          letterSpacing: '-.02em',
          color: h ? 'var(--aim-indigo)' : 'var(--fg-1)',
          transition: 'color var(--dur-base) var(--ease-out)',
          width: 'fit-content'
        }}
      >
        hello@aimvfx.co
      </a>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 15, color: 'var(--fg-3)' }}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Instagram
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          LinkedIn
        </a>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Vimeo
        </a>
        <span>UK · Nigeria · Working globally</span>
      </div>
    </div>
  );

  const form = sent ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        alignItems: 'flex-start',
        padding: 'var(--space-6) 0'
      }}
    >
      <span style={{ ...eb, color: 'var(--accent-text)' }}>Brief received</span>
      <h2
        style={{
          margin: 0,
          fontSize: 'clamp(32px,3.4vw,52px)',
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: '-.03em',
          maxWidth: '14ch'
        }}
      >
        Thanks, we&apos;ll be in touch.
      </h2>
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 17 }}>Expect a reply within one working day.</p>
      <Button variant="secondary" onClick={() => setSent(false)}>
        Send another
      </Button>
    </div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        <Input label="Name" placeholder="Ada Okafor" required />
        <Input label="Email" type="email" placeholder="ada@company.com" required />
      </div>
      <Input label="Company" placeholder="Optional" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'var(--fg-2)'
          }}
        >
          What do you need?
        </span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(([id, l, t]) => (
            <Tag key={id} tone={t} selected={need.includes(id)} onClick={() => toggle(id)}>
              {l}
            </Tag>
          ))}
          <Tag selected={need.includes('unsure')} onClick={() => toggle('unsure')}>
            Not sure yet
          </Tag>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        <Select label="Budget" options={['Under £5k', '£5k – £15k', '£15k – £40k', '£40k+', 'Not sure yet']} />
        <Select label="Timeline" options={['ASAP', '1–2 months', '3+ months', 'Flexible']} />
      </div>
      <Textarea
        label="Tell us about it"
        rows={5}
        placeholder="We're launching a product in March and need…"
        required
      />
      <div>
        <Button type="submit" size="lg" iconRight={<ArrowRight size={20} />}>
          Send brief
        </Button>
      </div>
    </form>
  );

  return (
    <main style={{ padding: 'var(--space-8) var(--gutter) 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'var(--space-8)',
          alignItems: 'start'
        }}
      >
        {intro}
        {form}
      </div>
    </main>
  );
}

