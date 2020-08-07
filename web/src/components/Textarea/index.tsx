import React, { TextareaHTMLAttributes, useMemo } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
  const id = useMemo(() => {
    return `texarea_${name}`;
  }, [name]);

  return (
    <div className="textarea-block">
      <label htmlFor={id}>{label}</label>

      <textarea id={id} name={name} {...rest} />
    </div>
  );
};

export default Textarea;
