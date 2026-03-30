import React from 'react'

const FormGroup = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text"
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>

      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}          // 💥 FIX
        onChange={onChange}    // 💥 FIX
        required
      />
    </div>
  )
}

export default FormGroup