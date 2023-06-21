import classNames from 'classnames'

import React from 'react'

export default function Panel({children, className, ...rest}: IPanel){
    const finalClassName = classNames(
        'border rounded p-3 shadow bg-slate-500 w-full cursor-pointer justify-between',
         className,
      );
    return (
      <div{...rest} className={finalClassName}>{children}</div>
   )
}