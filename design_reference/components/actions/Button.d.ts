import * as React from 'react';
/** Pill button: the main AIM VFX call to action.
 * @startingPoint section="Actions" subtitle="Pill CTA buttons" viewport="700x260" */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?:'primary'|'secondary'|'inverse'|'ghost'|'link'; size?:'sm'|'md'|'lg';
  iconLeft?:React.ReactNode; iconRight?:React.ReactNode; full?:boolean; disabled?:boolean; children?:React.ReactNode;
}
export declare function Button(p:ButtonProps):JSX.Element;