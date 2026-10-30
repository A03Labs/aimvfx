import * as React from 'react';
/** @startingPoint section="Forms" subtitle="Inputs, select, checkbox" viewport="700x420" */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{ label?:string; hint?:string; error?:string; }
export declare function Input(p:InputProps):JSX.Element;