import React, { useState } from 'react';

function SaveAllDataPopup({ isOpen, onClose, onSave }) {
  const [commonName, setCommonName] = useState(""); // Add state for commonName

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setCommonName(e.target.value); // Update commonName when input changes
  };

  const handleSaveClick = () => {
    onSave(commonName); // Pass commonName to onSave when Save button is clicked
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Enter Common Name</h2>
        <input type="text" value={commonName} onChange={handleInputChange} />
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSaveClick}>Save All Data</button>
      </div>
    </div>
  );
}

export default SaveAllDataPopup;
