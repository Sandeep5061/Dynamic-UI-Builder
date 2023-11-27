import React, { useState } from 'react';
import Textarea from './Textarea';

function TextareaDemo() {
  const [textareaProps, setTextareaProps] = useState({
    id: 'myTextarea',
    rows: 4,
    cols: 50,
    placeholder: 'Enter text here',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextareaProps({ ...textareaProps, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Rows:
          <input
            type="number"
            name="rows"
            value={textareaProps.rows}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cols:
          <input
            type="number"
            name="cols"
            value={textareaProps.cols}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Placeholder:
          <input
            type="text"
            name="placeholder"
            value={textareaProps.placeholder}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit Props</button>
      </form>
      {submitted && <Textarea {...textareaProps} />}
    </div>
  );
}

export default TextareaDemo;
