import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton, TextField } from '@mui/material';
import { useDrag } from 'react-dnd';
import EditIcon from '@mui/icons-material/Edit';

function Button({ id, label, text, onSave, isInsideBoard,onClick }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'button',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const [changeHistory, setChangeHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState(label);
  const [inputText, setInputText] = useState(text);
  const [jsonData, setJsonData] = useState({
    label: label,
    text: text
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleSavePopup = () => {
    const updatedProps = {
        label:inputLabel,
        text:inputText
    };
    setChangeHistory(prevHistory => [...prevHistory, updatedProps]);
    setJsonData(updatedProps);
    setOpen(false);
    onSave({
      id,
      ...updatedProps,
    });
  
   
  };
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the onClick callback if it exists
    }
    // console.log('Button clicked');
  };
  // const handleSave = () => {
  //   const updatedProps = {
  //     label: inputLabel,
  //     options: inputOptions, // For Dropdown
  //     // Add other properties as needed
  //   };
  //   setChangeHistory(prevHistory => [...prevHistory, updatedProps]);
  //   setJsonData(updatedProps);
  //   setOpen(false);
  //   onSave({
  //     id,
  //     ...updatedProps,
  //   });
  // };

  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MuiButton variant="contained" color="primary" onClick={handleClick}>
          {inputText}
        </MuiButton>
        {isInsideBoard && (
          <EditIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
        )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Properties</DialogTitle>
        <DialogContent>
          <div>
            <label>Label:</label>
            <TextField
              type="text"
              value={inputLabel}
              onChange={(e) => setInputLabel(e.target.value)}
            />
          </div>
          <div>
            <label>Text:</label>
            <TextField
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose}>Cancel</MuiButton>
          <MuiButton onClick={handleSavePopup}>Save</MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Button;

