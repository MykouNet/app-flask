import React, { useState, useEffect, createRef } from 'react';

const Test = () => {
  const [greeting, setGreeting] = useState('Hello React!');
  const handleChange = event => setGreeting(event.target.value);
  return (
    <div>
      <h1>{greeting}</h1>
      <Input value={greeting} handleChange={handleChange} />
    </div>
  );
};
const Input = ({ value, handleChange }) => {
  const ref = createRef();
  useEffect(() => ref.current.focus(), []);
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      ref={ref}
    />
  );
};
export default Test;