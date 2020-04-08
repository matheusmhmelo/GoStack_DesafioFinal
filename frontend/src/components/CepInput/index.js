import React, { useState, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@rocketseat/unform';

export default function CepInput() {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField('zipcode');
  const [mask, setMask] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: pickerRef => {
        pickerRef.setInputValue(null);
      },
    });
  }, [ref.current, fieldName]);

  useEffect(() => {
    setMask(defaultValue);
  }, [defaultValue]);

  function handleMask(e) {
    const { value } = e.target;
    return setMask(value);
  }

  return (
    <>
      <InputMask
        name={fieldName}
        mask="99999-999"
        placeholder="99999-999"
        value={mask}
        onChange={e => handleMask(e)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
