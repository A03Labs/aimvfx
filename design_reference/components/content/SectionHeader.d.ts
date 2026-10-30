import * as React from 'react';
/** @startingPoint section="Content" subtitle="Numbered section header, cards, tags" viewport="700x460" */
export interface SectionHeaderProps{ index?:string; eyebrow?:string; title:React.ReactNode; lede?:React.ReactNode; align?:'left'|'center'; accent?:'indigo'|'pink'|'cyan'; style?:React.CSSProperties; }
export declare function SectionHeader(p:SectionHeaderProps):JSX.Element;