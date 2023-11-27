

import React, { useState } from 'react';
import Picture from "./Picture";
import "../Styles/SectionAdder.css";
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

function SectionAdder({sectionIndex,onSave,parentHandleSubmit }) {
  const [allChangeHistory, setAllChangeHistory] = useState({});
  const [changedProperties, setChangedProperties] = useState({});
  const [board, setBoard] = useState([]);
  const [boards, setBoards] = useState([]);// for making sections
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "dropdown", "button", "textfield", "textarea", "checkbox", "datepicker","radio"],
    drop: (item) => addItemToBoard(item.type, item.id),
    collect: (monitor) => ({
      isDragging: !!monitor.isOver(),
    }),
  }));

  const handleCreateBoard = () => {
    const newBoard = []; // Create a new blank board (if needed, you might want to initialize it with some default items)
    setBoards([...boards, newBoard]);
  };

  const addItemToBoard = (type, id) => {
    const component = ComponentList.find(item => item.id === id);

    if (component) {
      setBoard(prevBoard => [...prevBoard, { id: uuidv4(), type: component.type }]);
    }
  };

  const handleSaveButtonClick = () => {
    setShowTemplateNameModal(true);
  };
   const handleJsonDataChange = (data) => {
 
    data = {
        ...data,
        indexes:sectionIndex,
        // header:sectionHeader
      };
    onSave(data);
  };

  const handleTemplateNameSubmit = (templateName) => {
    setShowTemplateNameModal(false);
    
    const allProperties = {
      id: uuidv4(),
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
              inputType:item.inputType,
              isRequired:item.isRequired,
              type: item.type,
              label: item.label,
              maxlength: item.maxlength,
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
              options: item.options,
              isMultiple: item.isMultiple,
              isRequired:item.isRequired

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
    onSave(allProperties);
    // console.log(JSON.stringify(allProperties, null, 2));

    fetch('http://localhost:8080/demo/add', {
      method: 'POST',
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
      console.log('Data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  };
  // const Navbar = () => (
  //   <nav>
  //     <Link to="/">Home</Link>
  //   </nav>
  // );
  const [isOpen, setIsOpen] = useState(true);//collapsable functionality
  const toggleSection = () => {
    setIsOpen(prevOpen => !prevOpen); // Toggle open/closed state
  };

  const handleDeleteItem = (id) => {
    console.group(id);
    setBoard(prevBoard => prevBoard.filter(item => item.id !== id));
  };

  const [showTemplateNameModal, setShowTemplateNameModal] = useState(false);

  return (
    <div>
        {/* <Header/> */}
    <div >
      <div >
      <button onClick={toggleSection}>
        {isOpen ? `Section ${sectionIndex} \u25B8` : `Section ${sectionIndex} \u25BE`}
      </button>
      {(isOpen && <div className="Board" ref={drop}>
        
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
                      //  console.log('Value from Textfield:', changedProps); 
                      setChangedProperties(prevProps => ({ ...prevProps, ...changedProps }));
                      setAllChangeHistory(prevHistory => ({
                        ...prevHistory,
                        [item.id]: changedProps
                      }));
                    }}
                    isInsideBoard={true}
                    inputType={item.inputType}
                    isRequired={item.isRequired}
                    maxLength={item.maxLength}
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
                    selectedOptions={item.selectedOption}
                    isMultiple={item.isMultiple}
                    isRequired={item.isRequired}
                  />
                  <DeleteIcon onClick={() => handleDeleteItem(item.id)} style={{ cursor: 'pointer' }} />
                </div>
              ):item.type==='checkbox' ?(
                <div>
                  <CheckBox
                   id={item.id}
                   label={item.label}
                   checked={false}
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
        )}
      </div>
      
      {showTemplateNameModal && (
        <TemplateNameModal onSave={handleTemplateNameSubmit} />
      )}
    </div>
    {/* <button onClick={handleCreateBoard}>Create</button> */}
    {/* <button className="SaveButton" onClick={handleSaveButtonClick}>Save</button> */}
    </div>
  );
}

export default SectionAdder;
