import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

function Dropdown({ id, label, options, onSave, isInsideBoard, selectedOptions, handleSelectOption, isMultiple, isRequired }) {
  const [changeHistory, setChangeHistory] = useState([]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'dropdown',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [open, setOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState(label);
  const [inputOptions, setInputOptions] = useState(options || []);
  const [selectedValues, setSelectedValues] = useState(selectedOptions || []);
  const [inputIsMultiple, setInputIsMultiple] = useState(isMultiple);
  const [inputIsRequired, setInputIsRequired] = useState(isRequired);

  const [jsonData, setJsonData] = useState({
    label: label,
    options: options || [],
    isMultiple: isMultiple,
    isRequired: isRequired // Added isRequired to jsonData
  });

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
      isMultiple: inputIsMultiple,
      isRequired: inputIsRequired // Added isRequired to updatedProps
    };
    setChangeHistory(prevHistory => [...prevHistory, updatedProps]);
    setJsonData(updatedProps);
    setOpen(false);
    onSave({
      id,
      ...updatedProps,
    });
  };

  const handleSelectChange = (event) => {
    const selectedValues = event.target.value;
  
    // Delay the handling of selected values by 300 milliseconds (adjust as needed)
    // setTimeout(() => {
      const updatedProps = {
        label: inputLabel,
        value: selectedValues, 
      };
      setSelectedValues(selectedValues);
      if (handleSelectOption) {
        handleSelectOption(updatedProps);
      }
      // console.log(selectedValues);
    // }, 1);
  };
  
  const handleAddOption = () => {
    setInputOptions([...inputOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...inputOptions];
    newOptions.splice(index, 1);
    setInputOptions(newOptions);
  };

  const handleInputChange = (event) => {
    setInputIsRequired(event.target.checked);
  };

  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid pink' : '0px' }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>{inputLabel}</InputLabel>
        <Select
          label={inputLabel}
          id={id.toString()} 
          multiple={inputIsMultiple}
          value={selectedValues}
          onChange={handleSelectChange}
          required={inputIsRequired} // Use the inputIsRequired state for "required"
        >
          {inputOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isInsideBoard && (
        <EditIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#3f51b5', color: 'white' }}>Edit Label and Options</DialogTitle>
        <DialogContent>
          <div>
            <label>Label:</label>
            <input
              type="text"
              value={inputLabel}
              onChange={(e) => setInputLabel(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </div>
          <div>
            <label>Options (one per line):</label>
            <div>
              {inputOptions.map((option, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...inputOptions];
                      newOptions[index] = e.target.value;
                      setInputOptions(newOptions);
                    }}
                    style={{ width: '90%', padding: '8px' }}
                  />
                  {index !== inputOptions.length - 1 && (
                    <span onClick={() => handleRemoveOption(index)} style={{ cursor: 'pointer', marginLeft: '8px' }}> - </span>
                  )}
                </div>
              ))}
              <span onClick={handleAddOption} style={{ cursor: 'pointer', color: '#3f51b5' }}> + Add Option</span>
            </div>
          </div>
          <div>
            <label>Is Multiple:</label>
            <input
              type="checkbox"
              checked={inputIsMultiple}
              onChange={(e) => setInputIsMultiple(e.target.checked)}
            />
          </div>
          <div>
            <label>Required:</label>
            <input
              type="checkbox"
              checked={inputIsRequired}
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} style={{ backgroundColor: '#3f51b5', color: 'white' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dropdown;

