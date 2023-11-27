import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';

function Textfield({ id, label, placeholder, onSave, isInsideBoard, onUpdateValue, inputType, isRequired, maxLength }) {
  const [jsonData, setJsonData] = useState({
    label: label,
    inputType: inputType || 'text',
    isRequired: isRequired || false,
    maxLength: maxLength ,
  });

  const [changeHistory, setChangeHistory] = useState([]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'textfield',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [open, setOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState(label);
  const [inputValue, setInputValue] = useState('');//for updaating values to parent

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedProps = {
      label: inputLabel,
      inputType: jsonData.inputType,
      isRequired: jsonData.isRequired,
      maxLength: jsonData.maxLength,
    };
  
    if (inputValue.length <= jsonData.maxLength) {
      setJsonData(updatedProps);
      setChangeHistory(prevHistory => [...prevHistory, updatedProps]);
      setJsonData(updatedProps);
      setOpen(false);
      if (onSave) {
        onSave({
          id,
          ...updatedProps,
        });
      }
    } else {
      // Display an error message or take appropriate action
      alert(`Input exceeds maximum length of ${jsonData.maxLength}`);
    }
  };
  

  const handleInputChange = (e) => {
    const value = e.target.value;
  
    // Remove the clearTimeout and setTimeout
  
    setInputValue(value);
  
    const updatedProps = {
      id:id,
      label: label,
      value: value,
      isRequired:isRequired
    };
  
    if (value.length <= jsonData.maxLength) {
      if (onUpdateValue) {
        onUpdateValue(updatedProps);
      }
    } else {
      alert(`Input value cannot exceed ${jsonData.maxLength} characters.`);
    }
    // console.log(updatedProps);
  };
  
  

  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px', marginBottom: '20px' }}>
       <label style={{ fontWeight: 'bold', position: 'relative' }}>
        {inputLabel}
        {jsonData.isRequired && <span style={{ color: 'red', position: 'absolute', top: '-5px', right: '-5px', fontSize: '12px' }}>*</span>}
      </label>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        onChange={handleInputChange}
        type={jsonData.inputType}  /* Use inputType from jsonData */
        required={jsonData.isRequired} /* Use isRequired from jsonData */
        inputProps={{ maxLength: jsonData.maxLength }} /* Use maxLength from jsonData */
      />
      
      {isInsideBoard && (
        <EditIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Label</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Label"
            variant="outlined"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)} /* Update inputLabel */
          />
          <TextField
            fullWidth
            select
            label="Input Type"
            variant="outlined"
            value={jsonData.inputType}
            onChange={(e) => setJsonData({ ...jsonData, inputType: e.target.value })}
            style={{ marginTop: '10px' }}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="password">Password</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="email">email</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Max Length"
            variant="outlined"
            value={jsonData.maxLength}
            onChange={(e) => setJsonData({ ...jsonData, maxLength: e.target.value })}
            type="number"
            style={{ marginTop: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <input
              type="checkbox"
              checked={jsonData.isRequired}
              onChange={(e) => setJsonData({ ...jsonData, isRequired: e.target.checked })}
            />
            <label>Required</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Textfield;

