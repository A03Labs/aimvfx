import * as React from 'react';
export interface DialogProps{ open:boolean; onClose:()=>void; title:React.ReactNode; children?:React.ReactNode; actions?:React.ReactNode; width?:number; }
export declare function Dialog(p:DialogProps):JSX.Element|null;