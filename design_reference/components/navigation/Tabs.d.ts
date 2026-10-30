import * as React from 'react';
export interface TabsProps{ items:(string|{value:string;label:React.ReactNode})[]; value?:string; defaultValue?:string; onChange?:(v:string)=>void; style?:React.CSSProperties; }
export declare function Tabs(p:TabsProps):JSX.Element;