import React, { useState } from 'react';

const CommonTempNameModel = ({ onSave }) => {
  const [templateName, setTemplateName] = useState('');

  const handleInputChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(templateName);
    setTemplateName(''); // Reset templateName state after submission
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Template Name:
          <input type="text" value={templateName} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CommonTempNameModel;

