import React from 'react';
import classNames from 'classnames';
import { GoSync } from "react-icons/go";

type ExcludeFromTuple<T extends any[], U> = {
  [K in keyof T]: T[K] extends U ? never : T[K];
}[number];

type Exclusive<T extends PropertyKey[], U = any> = T[number] extends infer E
  ? E extends string
    ? Record<E, U> & { [k in ExcludeFromTuple<T, E>]?: never }
    : never
  : never & {};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    outline?: boolean;
    rounded?: boolean;
    loading?: boolean;
  }> & Exclusive<["primary", "secondary", "success", "warning", "danger"], boolean>;

export default function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: ButtonProps){
  const classes = classNames(
    rest.className,
    'flex items-center px-3 py-1.5 border h-8',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500': primary,
      'border-gray-900 bg-gray-900': secondary,
      'border-green-500 bg-green-500': success,
      'border-yellow-400 bg-yellow-400': warning,
      'border-red-500 bg-red-500': danger,
      'rounded-full': rounded,
      'text-white':
        !outline && (primary || secondary || success || warning || danger),
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-500': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-500': outline && warning,
      'text-red-500': outline && danger,
    }
  );
  // Render the button based on the provided props
  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className='animate-spin'/>: children}
    </button>
  );
}
// Use Case // <Button primary rounded onClick={()=>{console.log('clicked')}}> Click me!</Button>
