import * as React from 'react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{ label?:string; options:(string|{value:string;label:string})[]; }
export declare function Select(p:SelectProps):JSX.Element;