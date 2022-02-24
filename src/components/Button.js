import React from 'react';

export const Button = ({
  children,
  href,
  type,
  onClick,  
  className
}) => {
  switch(type) {
    case 'download':
      return <button
        className={className + ` btn-primary`}
      ><a href={href} target="_blank" rel="noopener noreferrer">{children}</a></button>
    default:
  }
  return (
    <button
      className={className + ` btn-primary`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
