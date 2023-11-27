import React, { useState } from 'react';

function EditDropdownPopup({ selectedItem, onSave, onClose }) {
  const [editedLabel, setEditedLabel] = useState(selectedItem.label);
  const [editedOptions, setEditedOptions] = useState(selectedItem.options.join(','));

  const handleSave = () => {
    const changedJson = {
      label: editedLabel,
      options: editedOptions.split(',').map(option => option.trim())
    };
    onSave(changedJson);
    onClose();
  };

  return (
    <div className="edit-properties-popup">
      <h2>Edit Dropdown Properties</h2>
      <div>
        <label>Label:</label>
        <input
          type="text"
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value)}
        />
      </div>
      <div>
        <label>Options (comma-separated):</label>
        <input
          type="text"
          value={editedOptions}
          onChange={(e) => setEditedOptions(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditDropdownPopup;
