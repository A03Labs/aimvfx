import * as React from 'react';
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{ icon:React.ReactNode; label:string; variant?:'outline'|'solid'|'ghost'; size?:number; }
export declare function IconButton(p:IconButtonProps):JSX.Element;