import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UpdateTemplatePage = ({ location }) => {
  const history = useHistory();
  const templateData = location.state.templateData;
  const [updatedData, setUpdatedData] = useState(templateData);

  const handleInputChange = (e, id) => {
    const updatedValue = e.target.value;
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: updatedValue } : item
      )
    );
  };

  const handleSave = () => {
    history.push({
      pathname: '/',
      state: { updatedData: updatedData }
    });
  };

  const handleCancel = () => {
    history.push('/');
  };

  return (
    <div className="update-template-page">
      <h2>Update Template Data</h2>
      <form>
        {updatedData.map((item) => (
          <div key={item.id} className="template-item">
            <label>{item.label}:</label>
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleInputChange(e, item.id)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateTemplatePage;

