import React from "react";

const InputType = ({ value, onChange, name, inputType, labelText }) => {
  return (
    <>
      <div className="mb-1">
        <label className="form-label">{labelText}</label>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        />
      </div>
    </>
  );
};

export default InputType;
