import * as React from 'react';
export interface TagProps{ tone?:'neutral'|'indigo'|'pink'|'cyan'; selected?:boolean; onClick?:()=>void; children:React.ReactNode; style?:React.CSSProperties; }
export declare function Tag(p:TagProps):JSX.Element;