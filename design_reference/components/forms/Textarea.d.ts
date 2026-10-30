import * as React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{ label?:string; hint?:string; }
export declare function Textarea(p:TextareaProps):JSX.Element;