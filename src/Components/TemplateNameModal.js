import React, { useState } from 'react';

const TemplateNameModal = ({ onSave }) => {
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
          Section Name:
          <input type="text" value={templateName} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TemplateNameModal;

