import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function CheckBox({ id, label, checked, onSave,isInsideBoard }) {
  const [isChecked, setIsChecked] = useState(checked);
  const [editMode, setEditMode] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [modalOpen, setModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState({
    label: label,
    checked: checked
  });

  const [changeHistory, setChangeHistory] = useState([]);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditSave = () => {
    const updatedProps = {
      label: newLabel,
      checked: isChecked,
    };
    setChangeHistory(prevHistory => [...prevHistory, updatedProps]);
    setJsonData(updatedProps);
    setModalOpen(false);
    onSave({
      id,
      ...updatedProps,
    });
    console.log(updatedProps.checked);
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);

  };

  const handleInputChange = (event) => {
    setNewLabel(event.target.value);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'checkbox',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <div>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChange} />}
          label={label}
        />
       {isInsideBoard && (
          <EditIcon onClick={handleEditClick} style={{ cursor: 'pointer' }} />
)}
      </div>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Edit Properties</DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={newLabel}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CheckBox;

