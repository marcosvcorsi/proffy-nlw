import React, { InputHTMLAttributes, useMemo } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const id = useMemo(() => {
    return `input_${name}`;
  }, [name]);

  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>

      <input id={id} name={name} {...rest} />
    </div>
  );
};

export default Input;
