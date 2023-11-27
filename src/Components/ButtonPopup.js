import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function ButtonPopup({ open, handleClose, inputLabel, setInputLabel, inputText, setInputText, handleSave }) {
  return (
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ButtonPopup;
