

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import CheckBox from './CheckBox';
import Button from './Button';
import { Button as MuiButton, Paper, Typography } from '@mui/material';
import RadioButtons from './RadioButtons';
import { DatePickerComponent as DatePicker } from './DatePicker';
import '../Styles/ViewTemplates.css';
import UpdateTemplate from './UpdateTemplate';
import { v4 as uuidv4 } from 'uuid';

const ViewTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [UselectedTemplate, UsetSelectedTemplate] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);//for knowing which optiion user selected;
  const [updatedValue, setUpdatedValue] = useState('');//for nowing value of textfield entered by user
  const [chosenOption, setChosenOption] = useState(null);//for knowing which option is selected by user
  const [SelectedDate, setSelectedDate] =useState();// for knowing date entered by user
  useEffect(() => {
    fetch('http://localhost:8080/demo/all')
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  const handleView = (template) => {
    setSelectedTemplate(template);
  };

  const handleDelete = (uniqueId) => {
    fetch(`http://localhost:8080/demo/delete/${uniqueId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete template: ${uniqueId}`);
      }
      setTemplates(prevTemplates => prevTemplates.filter(template => template.uniqueId !== uniqueId));
      console.log(`Deleted template: ${uniqueId}`);
    })
    .catch(error => console.error('Error deleting template:', error));
  };



const [accumulatedData, setAccumulatedData] = useState([]);//to store json of userinput of eachtemplate;
const [templateData, setTemplateData] = useState({ properties: [] });

const handleUpdate = (template) => {
    // setTemplateData(template); 
    UsetSelectedTemplate(template);
    // console.log(template);
    // console.log(templatedata);
    // console.log(templateData);
    
  };

//   console.log(templateData);
   
  const handleBack = () => {
    setSelectedTemplate(null);
  };

  
  const handleClick = () => {
    // console.log(accumulatedData);
    console.log('Button clicked inside template');
   const data = {
        "templateid": uuidv4(),
        "data": accumulatedData
    }
        sendToBackend(data);
        console.log(accumulatedData);
  };

  const sendToBackend = (data) => {
    fetch('http://localhost:8080/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        // Handle successful response from the backend (if needed)
        console.log('Data sent successfully:', responseData);
        setAccumulatedData([]); // Assuming setAccumulatedData is a state setter function
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Handle error (if needed)
      });
    //   console.log(data);
       setAccumulatedData([]);
  };
  
  /* for knowing which option selected in dropdown*/
  const handleSelectOptions = (selectedOptions) => {
    // console.log(selectedOptions);
    const label=selectedOptions.label;
    const value= selectedOptions.value;
    setSelectedOptions(selectedOptions.value);
    setAccumulatedData(prevData => {
        const updatedData = prevData.filter(item => item.label !== label);
        return [...updatedData, { id: uuidv4(),label: label, value: value }];
      });
      console.log(accumulatedData);
    //  setAccumulatedData([]);
  };

 

const handleInputChange = (updatedProps) => {
    const label=updatedProps.label;
    const value=updatedProps.value;
    setAccumulatedData(prevData => {
      const updatedData = prevData.filter(item => item.label !== label);
      return [...updatedData, { id:uuidv4(), label: label, value: value }];
    });
     console.log(accumulatedData);
  };
  
//   console.log(updatedValue);
  
   /**for knowing options choosen by user */

   const handleChoosenOption = (option) => {
    console.log(option.selectedOption);
    setChosenOption(option.selectedOption);
     const label=option.label;
     const value= option.selectedOption;
     setAccumulatedData(prevData => {
        const updatedData = prevData.filter(item => item.label !== label);
        return [...updatedData, { id:uuidv4(),label: label, value: value }];
      });
      console.log(accumulatedData);
  };
 

//   for knowing date props changes

   const DateValue = (updatedData)=>{
    // console.log(updatedData.value);
  setSelectedDate(updatedData.value);
  const label=updatedData.label;
  const value= updatedData.value;
  setAccumulatedData(prevData => {
     const updatedData = prevData.filter(item => item.label !== label);
     return [...updatedData, {id:uuidv4(), label: label, value: value }];
   });
//    console.log(accumulatedData);

//    console.log(accumulatedData);
 
};
  
//   const deleteItem = (id) => {
//     setTemplateData(prevTemplateData => {
//       const updatedProperties = prevTemplateData.properties.filter(item => item.id !== id);
//       return {
//         ...prevTemplateData,
//         properties: updatedProperties
//       };
//     });
//   };
  
  

  return (
      <div>
        
    <div style={{ padding: '20px', margin: 'auto', backgroundColor: 'rgb(108, 161, 200)', height: '100vh', width: '100vw' }}>
    <nav>
        <Link to="/">Home</Link>
      </nav>
    {UselectedTemplate  &&(
            
            <UpdateTemplate templateData={UselectedTemplate}  />
          )}
      
      {!UselectedTemplate && (
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" component="div" gutterBottom style={{ marginBottom: '20px' }}>
          Saved Templates
        </Typography>
        { selectedTemplate ? (
          <div>
            <MuiButton variant="outlined" onClick={handleBack} style={{ marginBottom: '10px' }}>Back</MuiButton>
            <h3>{selectedTemplate.templateName}</h3>
            <form  style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
              {selectedTemplate.properties.map(property => (
                
                <div key={property.id} style={{ marginBottom: '10px' }}>
                    
                  {property.type === 'textfield' && (
                    <div>
                      {/* <label>{property.label}</label> */}
                      <Textfield
                        id={property.id}
                        label={property.label}
                        placeholder="Placeholder Text"
                         onSave={(updatedData) => handleUpdate(updatedData)}
                        onUpdateValue={handleInputChange}
                        isRequired={property.isRequired}
                        inputType={property.inputType}
                        maxLength={property.maxLength}
                      />
                    </div> 
                  )}
                  {property.type === 'dropdown' && (
                    <div>
                      {/* <label>{property.label}</label> */}
                       
                      <Dropdown
                        id={property.id}
                        label={property.label}
                        options={property.options}
                        selectedOptions={property.selectedOption}
                        isMultiple={property.Multiple}
                        isRequired={property.isRequired}
                        onSave={(updatedData) => handleUpdate(updatedData)}
                        handleSelectOption={handleSelectOptions}
                       
                        
                      />
                      
                    </div>
                  )}
                  {property.type === 'checkbox' && (
                    <div>
                      {/* <label>{property.label}</label> */}
                      <CheckBox
                        id={property.id}
                        label={property.label}
                        checked={false}
                        onSave={(updatedData) => handleUpdate(updatedData)}
                            
                      />
                    </div>
                  )}
                  {property.type === 'radio' && (
                    <div>
                      {/* <label>{property.label}</label> */}
                      <RadioButtons
                        id={property.id}
                        label={property.label}
                        options={property.options}
                        selectedOption={property.selectedOption}
                        
                        onSave={(updatedData) => handleUpdate(updatedData)}
                        ChoosenOption={handleChoosenOption} 
                      />
                      {/* {console.log(property)} */}
                    </div>
                    
                  )}
                  {property.type === 'datepicker' && (
                    <div>
                      {/* <label>{property.label}</label> */}
                      <DatePicker
                        id={property.id}
                        label={property.label}
                        placeholder={property.placeholder}
                        onSave={(updatedData) => handleUpdate(updatedData)}
                        DateSelected = {DateValue}
                      />
                      
                    </div>
                    
                  )}
                  {console.log(property)}
                  {property.type === 'button' && (
                    <div>
                        <Button
                        id={property.id}
                        type={property.type}
                        label={property.label}
                        text={property.text}
                        onSave={(updatedData)=>handleUpdate(updatedData)}
                        onClick={handleClick}
                        />
                   {/* {console.log()} */}
                    </div>
                    )}
                </div>
              ))}
            </form>
          </div>
        ) : (
          <ul>
            {templates.map(template => (
              <li key={template.uniqueId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <div>
                  <Typography variant="h6" component="div">
                    {template.templateName}
                  </Typography>
                </div>
                <div>
                  <MuiButton variant="outlined" onClick={() => handleView(template)} style={{ marginRight: '10px', backgroundColor: '#4caf50', color: '#ffffff' }}>View</MuiButton>
                  <MuiButton variant="outlined" onClick={() => handleDelete(template.uniqueId)} style={{ marginRight: '10px', backgroundColor: '#f44336', color: '#ffffff' }}>Delete</MuiButton>
                  <MuiButton variant="outlined" onClick={() => handleUpdate(template)} style={{ backgroundColor: '#2196f3', color: '#ffffff' }}>Update</MuiButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Paper>)}
    </div>
    </div>
  );
}

export default ViewTemplates;



