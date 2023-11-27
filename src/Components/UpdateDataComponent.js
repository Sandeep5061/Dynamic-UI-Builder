import React, { useState } from 'react';

const UpdateDataComponent = ({ template, onUpdate, onCancel }) => {
  const [updatedData, setUpdatedData] = useState(template.data);

  const handleChange = (id, value) => {
    setUpdatedData(prevData => prevData.map(item => item.id === id ? { ...item, value } : item));
  };

  const handleSubmit = () => {
    onUpdate(template.templateid, updatedData);
  };

  return (
    <div>
      {updatedData.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>{item.label}:</span>
          <input
            type="text"
            value={item.value}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateDataComponent;
