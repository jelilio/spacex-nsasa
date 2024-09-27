import React from 'react';

export default function CheckBox({
  name,
  label,
  isChecked,
  handleChange,
}: {
  label: string;
  name: string;
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="inline-flex">
      <label className="relative flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          id={name}
          name={name}
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="m-2">{label}</span>
      </label>
    </div>
  );
}
