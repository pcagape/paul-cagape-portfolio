import React from 'react';

export const Button = ({
  children,
  type,
  onClick,  
  className
}) => {
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
