import React, { useState } from 'react';
import Picture from "./Picture";
import "../Styles/App.css";
import { useDrop } from 'react-dnd';
import Button from './Button';
import Dropdown from './Dropdown';
import Textarea from './Textarea';
import Textfield from './Textfield';
import CheckBox from './CheckBox';
import RadioButtons from './RadioButtons'
import jsonData from '../files/data.json';
import "../Styles/BoardButton.css"
import { v4 as uuidv4 } from 'uuid';
import TemplateNameModal from './TemplateNameModal';
import { Link } from 'react-router-dom';
import { DatePickerComponent as DatePicker } from './DatePicker';
// import { TextField, Button as MuiButton, Select, Checkbox, DatePicker as MuiDate } from '@mui/material';
// import { Send, Menu, ArrowDropDown, CheckBox as MuiCheckBox, Event } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';


const ComponentList = jsonData;

function UpdatedTemplate({ templateData }) {
    // {console.log(templateData)}
    // const ComponentList = templateData;
  const [allChangeHistory, setAllChangeHistory] = useState({});
  const [changedProperties, setChangedProperties] = useState({});
  const [board, setBoard] = useState([]);
//   const [templateData, settemplData] = useState(templateData);
//   const [board, setBoard] = useState([]);
const [templateDataN, setTemplateData]=useState(templateData);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "dropdown", "button", "textfield", "textarea", "checkbox", "datepicker","radio"],
    drop: (item) => addItemToBoard(item.type, item.id),
    collect: (monitor) => ({
      isDragging: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard = (type, id) => {
    const component = ComponentList.find(item => item.id === id);

    if (component) {
      setBoard(prevBoard => [...prevBoard, { id: uuidv4(), type: component.type }]);
    }
  };
  

  const handleSaveButtonClick = () => {
    setShowTemplateNameModal(true);
  };


  const handleTemplateNameSubmit = (templateName) => {
    setShowTemplateNameModal(false);
  
    const allProperties = {
      id: templateData.uniqueId,
      templateName, // Include template name in the JSON
      properties: board.map(item => {
        let properties = {};
  
        switch (item.type) {
          case 'image':
            properties = {
              id: item.id,
              type: 'image',
              url: item.url
            };
            break;
          case 'textarea':
          case 'textfield':
            properties = {
              id: item.id,
              type: item.type,
              label: item.label,
              placeholder: item.placeholder
            };
            break;
          case 'button':
            properties = {
              id: item.id,
              type: 'button',
              label: item.label,
              text: item.text
            };
            break;
          case 'dropdown':
            properties = {
              id: item.id,
              type: 'dropdown',
              label: item.label,
              options: item.options
            };
            break;
            case 'checkbox':
              properties = {
                id: item.id,
                type:'checkbox',
                label: item.label
                

              };
              break;
              case 'datepicker':
                properties = {
                  id: item.id,
                  type: 'datepicker',
                  placeholder: item.placeholder
                };
                break;
                case 'radio':
                  properties = {
                    id: item.id,
                    type: 'radio',
                    options: item.options,
                    selectedOption: item.selectedOption
                  }
              
          default:
            break;
        }
  
        return {
          ...properties,
          ...allChangeHistory[item.id] // Include changed properties if any
        };
      }).filter(Boolean)
    };
  
    console.log(JSON.stringify(allProperties, null, 2));

    fetch(`http://localhost:8080/demo/update/${templateData.uniqueId}`, { // Use the update endpoint with the uniqueId
    method: 'PUT', // Use PUT method for updates
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allProperties)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // If you expect a JSON response from the server
    })
    .then(data => {
      // Handle the response from the server if needed
      console.log('Data updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
  };
  // const Navbar = () => (
  //   <nav>
  //     <Link to="/">Home</Link>
  //   </nav>
  // );
//   console.log(templateData.properties);
// myArray = myArray.filter(item => item.id !== idToDelete);
const handleDeleteItem = (id) => {
    
        // deleteItem(id);
      
  };
  


  const [showTemplateNameModal, setShowTemplateNameModal] = useState(false);

  return (
    <div>
    
    <div className="container">
      
      <div className="Items">
        {ComponentList.map(component => {
          switch (component.type) {
            // case 'textarea':
            //   return <Textarea key={component.id} id={component.id} label={component.label} placeholder={component.placeholder} />;
            case 'textfield':
              return <Textfield key={component.id} id={component.id} label={component.label} placeholder={component.placeholder} isInsideBoard={false} />;
            case 'button':
              return <Button key={component.id} id={component.id} label={component.label} text={component.text}  isInsideBoard={false} />;
            case 'dropdown':
              return <Dropdown key={component.id} id={component.id} label={component.label} options={component.options} isInsideBoard={false}/>;
            case 'checkbox':
              return <CheckBox key={component.id} id={component.id} label={component.label} checked={component.checked} isInsideBoard={false}  />
            case 'datepicker':
              return <DatePicker key={component.id} id={component.id} label={component.label} placeholder={component.placeholder} isInsideBoard={false}/>
            case 'radio':
              return <RadioButtons key={component.id} id={component.id} label={component.label} options={component.options} selectedOption={component.selectedOption} isInsideBoard={false} />
            default:
              return null;
          }
        })}
      </div>
     
      <div className="box">
      
        <div className="Board" ref={drop}>
   

        {templateData.properties.map(component => {
            switch (component.type) {
              case 'textfield':
                return (
                    <div>
                  <Textfield
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    placeholder={component.placeholder}
                    isInsideBoard={true}
                    onUpdateValue={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                      
                  />
                  <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} />
                  </div>
                );
              case 'button':
                return (
                    <div>
                  <Button
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    text={component.text}
                    isInsideBoard={true}
                    onSave={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                  />
                  {/* <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} /> */}
                  </div>
                );
              case 'dropdown':
                return (
                    <div>
                  <Dropdown
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    options={component.options}
                    isInsideBoard={true}
                    onSave={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                  />
                  {/* <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} /> */}
                  </div>
                );
              case 'checkbox':
                return (
                    <div>
                  <CheckBox
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    checked={component.checked}
                    isInsideBoard={true}
                    onSave={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                  />
                  {/* <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} /> */}
                  </div>
                );
              case 'datepicker':
                return (
                    <div>
                  <DatePicker
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    placeholder={component.placeholder}
                    isInsideBoard={true}
                    onSave={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                  />
                  {/* <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} /> */}
                  </div>
                );
              case 'radio':
                return (
                    <div>
                  <RadioButtons
                    key={component.id}
                    id={component.id}
                    label={component.label}
                    options={component.options}
                    selectedOption={component.selectedOption}
                    isInsideBoard={true}
                    onSave={(changedProps) => {
                        setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                        setAllChangeHistory(prevHistory => ({
                          ...prevHistory,
                          [component.id]: changedProps
                        }));
                      }}
                  />
                  {/* <DeleteIcon onClick={() => handleDeleteItem(component.id)} style={{ cursor: 'pointer' }} /> */}
                  </div>
                );
              default:
                return null;
            }
          })}
          {board.map((item, index) => (
            <div key={index}>
                
              {item.type === 'image' ? (
                <div>
                  <Picture url={item.url} id={item.id} />
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              ) : item.type === 'textarea' ? (
                <div>
                  <Textarea id={item.id} label={item.label} placeholder={item.placeholder} />
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              ) : item.type === 'textfield' ? (
                <div>
                  <Textfield
                    id={item.id}
                    label={item.label}
                    placeholder={item.placeholder}
                    onSave={(changedProps) => {
                      setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                      setAllChangeHistory(prevHistory => ({
                        ...prevHistory,
                        [item.id]: changedProps
                      }));
                    }}
                    isInsideBoard={true}
                  />
                   <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                </div>
              ) : item.type === 'button' ? (
                <div>
                  <Button 
                     id={item.id} 
                     label={item.label} 
                     text="Click Me" 
                     isInsideBoard={true}
                     onSave={(changedProps) => {
                      setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                      setAllChangeHistory(prevHistory => ({
                        ...prevHistory,
                        [item.id]: changedProps
                      }));
                    }}
                     />
                  <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                </div>
              ) : item.type === 'dropdown' ? (
                <div>
                  <Dropdown
                    id={item.id}
                    label={item.label}
                    options={['Option 1', 'Option 2', 'Option 3']}
                    onSave={(changedProps) => {
                      setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                      setAllChangeHistory(prevHistory => ({
                        ...prevHistory,
                        [item.id]: changedProps
                      }));
                    }}
                    isInsideBoard={true}
                  />
                  <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                </div>
              ):item.type==='checkbox' ?(
                <div>
                  <CheckBox
                   id={item.id}
                   label={item.label}
                   checked={item.checked}
                   onSave={(changedProps) => {
                    setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                    setAllChangeHistory(prevHistory => ({
                      ...prevHistory,
                      [item.id]: changedProps
                    }));
                  }}
                  isInsideBoard={true}
                  />
                  <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                </div>
                ):item.type ==='datepicker' ? (
                   <div>
                  <DatePicker 
                   id={item.id} 
                   label={item.label} 
                   
                   placeholder={item.placeholder}

                   onSave={(changedProps) => {
                    setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                    setAllChangeHistory(prevHistory => ({
                      ...prevHistory,
                      [item.id]: changedProps
                    }));
                  }}
                  isInsideBoard={true}
                    />
                    
                    <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                    </div>
              ) :item.type === 'radio'? (
                  <div>
                  <RadioButtons
                  id={item.id}
                  label={item.label}
                  options={['Option 1', 'Option 2', 'Option 3']}
                  selectedOption={item.selectedOption}
                  onSave={(changedProps) => {
                    setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                    setAllChangeHistory(prevHistory => ({
                      ...prevHistory,
                      [item.id]: changedProps
                    }));
                  }}
                  isInsideBoard={true}
                  />
                   <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                  </div>

              ): null}
            </div>
          ))}
          <button className="SaveButton" onClick={handleSaveButtonClick}>Save</button>
        </div>
        
      </div>
      {showTemplateNameModal && (
        <TemplateNameModal onSave={handleTemplateNameSubmit} />
      )}
    </div>
    </div>
  );
}

export default UpdatedTemplate;