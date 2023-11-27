import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Textfield from './Textfield';
import Dropdown from './Dropdown';
import CheckBox from './CheckBox';
import Button from './Button';
import RadioButtons from './RadioButtons';
import { DatePickerComponent as DatePicker } from './DatePicker';
import '../Styles/ViewComb.css';
import UpdateTemplate from './UpdateTemplate';
import Collapse from '@mui/material/Collapse';
import { v4 as uuidv4 } from 'uuid';
import NavBarOtherComp from './NavBarOtherComp';

// import './DemoComponent.css'; // Import the CSS file

const DemoComponent = () => {
  const [data, setData] = useState(null);
  const [selectedCommonName, setSelectedCommonName] = useState(null);

  const [accumulatedData, setAccumulatedData] = useState([]);

  const [templateNameB, setTemplateNameB]=useState("");
  const [TemplateID, setTemplateID] = useState();
  
  useEffect(() => {
    fetch('http://localhost:8080/api/combdemos')
      .then(response => response.json())
      .then(data => {setData(data);const requiredTextFields = hasRequiredTextField(data);
        setAllRequiredText(requiredTextFields);
 })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (commonName,id) => {
    setSelectedCommonName(commonName);
    setTemplateNameB(commonName);
    setTemplateID(id);
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/api/combdemos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Handle successful deletion
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleUpdateClick = (commonName) => {
    // Handle update click
  };

  const handleUpdate = (updatedData) => {
    // Handle updating data if needed
  };
   const [TextRequired, setTextRequired]= useState([]);
//    const [TextRequiredone, setTextRequiredone]= useState(false);

  const handleInputChange = (updatedProps) => {
    // console.log(updatedProps);
  
    const label=updatedProps.label;
    const value=updatedProps.value;
    setAccumulatedData(prevData => {
      const updatedData = prevData.filter(item => item.label !== label);
      return [...updatedData, { id:uuidv4(), label: label, value: value }];
    });
    setTextRequired(prevData => {
        const updatedData = prevData.filter(item => item.label !== label);
      return [...updatedData, { id:updatedProps.id, label: label, value: value ,isRequired:updatedProps.isRequired}];
    })
    //  console.log(updatedProps);
  };

  const handleSelectOptions = (selectedOptions) => {
    
    const label=selectedOptions.label;
    const value= selectedOptions.value;
    
    setAccumulatedData(prevData => {
        const updatedData = prevData.filter(item => item.label !== label);
        return [...updatedData, { id: uuidv4(),label: label, value: value }];
      });
    //   console.log(accumulatedData);
    
  };

  const handleChoosenOption = (option) => {
   
     const label=option.label;
     const value= option.selectedOption;
     setAccumulatedData(prevData => {
        const updatedData = prevData.filter(item => item.label !== label);
        return [...updatedData, { id:uuidv4(),label: label, value: value }];
      });
      
  };

  const DateValue = (updatedData)=>{
  const label=updatedData.label;
  const value= updatedData.value;
  setAccumulatedData(prevData => {
     const updatedData = prevData.filter(item => item.label !== label);
     return [...updatedData, {id:uuidv4(), label: label, value: value }];
   });

};

const [allRequiredText, setAllRequiredText] = useState([]);
const [textRequiredOne, setTextRequiredOne] = useState(false);

const hasRequiredTextField = (data) => {
    let requiredTextFields = [];

    data.forEach(item => {
      item.templates.forEach(template => {
        template.properties.forEach(property => {
          if (property.inputType === 'text' && property.isRequired === true) {
            requiredTextFields.push({
              id: property.id,
            });
          }
        });
      });
    });

    return requiredTextFields;
};

const checkForNullValues = (allRequiredText, textRequired) => {
    return allRequiredText.every(item => {
      const foundItem = textRequired.find(textItem => textItem.id === item);
      return foundItem && foundItem.value !== null;
    });
  };

   
const handleClick = () => {

//     // console.log(allRequiredText);
//     const requiredFieldsWithNullValue = TextRequired.filter(item => {
//         return item.isRequired && (item.value === "" || item.value===null);
//     });
// // //    console.log(requiredFieldsWithNullValue);
//     if (requiredFieldsWithNullValue.length > 0) {
//         alert('Please fill in all required fields.');
//         return;
//     }
//     // if (TextRequired.length === 0) {
//         console.log(allRequiredText);
//         // console.log(TextRequired);
//         let check = false;
//        check= checkForNullValues(allRequiredText,TextRequired)
//         if(check)
//         {alert('Please fill in all required fields.');
//         return;}
//     // }
    console.log('Button clicked inside template');
   const data = {
       
        "templateid": uuidv4(),
        "commonTemplateName":templateNameB,
        "data": accumulatedData
    }
    
        sendToBackend(data);
        // allRequiredText=[];
  };

  const sendToBackend = (data) => {
    fetch('http://localhost:8080/templates', {// sending all both types of data to same api indivisual vala
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
    //    setAccumulatedData([]);
    alert('Data saved successfully!');
  };
 

  return (
    <div>
      <NavBarOtherComp/>
      <h1>Demo Component</h1>
      {selectedCommonName === null && data && data.map(item => (
        <div className="template-container" key={item.id}>
          <div className="header-container">
            <h2>{item.commonName}</h2>
            <button className="action-button view-button" onClick={() => handleViewClick(item.commonName,item.id)}>View</button>
            <button className="action-button delete-button" onClick={() => handleDeleteClick(item.id)}>Delete</button>
            {/* <button className="action-button update-button" onClick={() => handleUpdateClick(item.commonName)}>Update</button> */}
          </div>
        </div>
      ))}

      {selectedCommonName !== null && data && data.map(item => (
        selectedCommonName === item.commonName && (
          <div className="template-container" key={item.id}>
            <h2>{item.commonName}</h2>
           
             <form>
              {item.templates.map(template => (
                <fieldset key={template.id}>
                  <legend>{template.templateName}</legend>
                  {template.properties.map(property => (
                    <div key={property.id}>
                      {/* { property.type !== 'button' && property.label && <label htmlFor={property.id}>{property.label}</label>} */}
                      
                      {property.type === 'textfield' && (
                        <Textfield
                          id={property.id}
                          label={property.label}
                          placeholder={property.placeholder || 'Placeholder Text'}
                          onSave={(updatedData) => handleUpdate(updatedData)}
                          onUpdateValue={handleInputChange}
                          isRequired={property.isRequired}
                          inputType={property.inputType}
                          maxLength={property.maxLength}

                        />
                        
                        
                      )}
                      {property.type === 'dropdown' && (
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
                      )}
                      {property.type === 'checkbox' && (
                        <CheckBox
                          id={property.id}
                          label={property.label}
                          checked={false}
                          onSave={(updatedData) => handleUpdate(updatedData)}
                        />
                      )}
                      {property.type === 'radio' && (
                        <RadioButtons
                          id={property.id}
                          label={property.label}
                          options={property.options}
                          selectedOption={property.selectedOption}
                          onSave={(updatedData) => handleUpdate(updatedData)}
                          ChoosenOption={handleChoosenOption}
                        />
                      )}
                      {property.type === 'datepicker' && (
                        <DatePicker
                          id={property.id}
                          label={property.label}
                          placeholder={property.placeholder}
                          onSave={(updatedData) => handleUpdate(updatedData)}
                          DateSelected = {DateValue}
                        />
                      )}
                       {console.log(property)}
                      {property.type === 'button' && (
                        
                        <Button
                          id={property.id}
                          type={property.type}
                          label={property.label}
                          text={property.label}// text is not defined in backend so;
                          onSave={(updatedData) => handleUpdate(updatedData)}
                          onClick={handleClick}
                        />
                       
                      )}
                    </div>
                  ))}
                </fieldset>
              ))}
            </form> 
          </div>
        )
      ))}
    </div>
  );
};

export default DemoComponent;



