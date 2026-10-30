import * as React from 'react';
export interface CardProps{ media?:React.ReactNode; index?:string; title?:React.ReactNode; body?:React.ReactNode; tags?:React.ReactNode; href?:string; onClick?:()=>void; tone?:'default'|'tint'|'inverse'; style?:React.CSSProperties; children?:React.ReactNode; }
export declare function Card(p:CardProps):JSX.Element;