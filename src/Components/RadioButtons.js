import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';

function RadioButton({ id, label, options, selectedOption, onSave, isInsideBoard, ChoosenOption }) {
  const [changeHistory, setChangeHistory] = useState([]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'radio',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [open, setOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState(label);
  const [inputOptions, setInputOptions] = useState(options);
  const [selected, setSelected] = useState(selectedOption);
  

  useEffect(() => {
    // Update the selected option when the prop changes
    setSelected(selectedOption);
  }, [selectedOption]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedProps = {
      label: inputLabel,
      options: inputOptions,
      selectedOption: selected, // For RadioButton
    };
    setChangeHistory((prevHistory) => [...prevHistory, updatedProps]);
    onSave({
      id,
      ...updatedProps,
    });
    setOpen(false);
  };

  const handleInputChange = (e) => {
     const value = e.target.value;
     setSelected(value);
     const updatedProps = {
        label: inputLabel,
        options: inputOptions,
        selectedOption: value, // For RadioButton
      };
    //  setSelected(value);
     if(ChoosenOption)
     {
        ChoosenOption(updatedProps);
     }

    //  console.log(value);

  }
  

  
  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>{inputLabel}</label>
      </div>
      {inputOptions.map((option, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          <input
            type="radio"
            id={`${id}_${index}`}
            value={option}
            checked={selected === option}
            // onChange={(e) => setSelected(e.target.value)}
            onChange={handleInputChange}
          />
          <label htmlFor={`${id}_${index}`}>{option}</label>
        </div>
      ))}
      {isInsideBoard && (
        <EditIcon onClick={handleOpen} style={{ cursor: 'pointer', marginLeft: '10px' }} />
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Label and Options</DialogTitle>
        <DialogContent>
          <div>
            <label>Label:</label>
            <input
              type="text"
              value={inputLabel}
              onChange={(e) => setInputLabel(e.target.value)}
            />
          </div>
          <div>
            <label>Options (comma-separated):</label>
            <input
              type="text"
              value={inputOptions.join(',')}
              onChange={(e) => setInputOptions(e.target.value.split(','))}
            />
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

export default RadioButton;

