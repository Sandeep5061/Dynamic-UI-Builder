import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDrag } from 'react-dnd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import '../Styles/DatePickerComponent.css'; // Add a CSS file for styling

function DatePickerComponent({ id, label, placeholder, onSave, isInsideBoard,DateSelected }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(label);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'datepicker',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (date) => {
    // console.log('handleChange called with date:', date);
    setSelectedDate(date);
    const propss ={
        id,
        label: selectedLabel,
        placeholder,
        value: date, // Add the selected date to the onSave callback
      };
      if(DateSelected)
    DateSelected (propss);
    // console.log(propss);
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleSaveProperties = () => {
    setShowEditPopup(false);

    const updatedProps = {
      label: selectedLabel,
      placeholder: placeholder,
    };
   if(onSave)
    onSave({
      id,
      ...updatedProps,
    });
    // console.log(updatedProps);
  };

  return (
    <div ref={drag} className={isDragging ? 'date-picker-dragging' : 'date-picker'}>
      <div style={{ marginBottom: '5px' }}>
        <label style={{ fontWeight: 'bold' }}>{selectedLabel}</label>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText={placeholder}
        
      />
      <div className="edit-properties-button">
        {isInsideBoard && (
          <EditIcon onClick={handleEditClick} style={{ cursor: 'pointer' }} />
        )}
      </div>

      <Dialog open={showEditPopup} onClose={() => setShowEditPopup(false)}>
        <DialogTitle>Edit Properties</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Label"
            variant="outlined"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditPopup(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProperties}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { DatePickerComponent };

