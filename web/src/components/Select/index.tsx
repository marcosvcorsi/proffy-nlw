import React, { SelectHTMLAttributes, useMemo } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  value,
  ...rest
}) => {
  const id = useMemo(() => {
    return `id_${name}`;
  }, [name]);

  return (
    <div className="select-block">
      <label htmlFor={id}>{label}</label>

      <select id={id} name={name} value={value} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
