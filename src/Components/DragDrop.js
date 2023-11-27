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
import CommonTempNameModel from './CommonTempNameModel';
import { Link } from 'react-router-dom';
import { DatePickerComponent as DatePicker } from './DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';
import SectionAdder from './SectionAdder';
import NavBarOtherComp from './NavBarOtherComp';
import Navbar from './Navbar';

const ComponentList = jsonData;

function DragDrop() {
  const [allChangeHistory, setAllChangeHistory] = useState({});
  const [changedProperties, setChangedProperties] = useState({});
  const [board, setBoard] = useState([]);
  const [boards, setBoards] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "dropdown", "button", "textfield", "textarea", "checkbox", "datepicker","radio"],
    drop: (item) => addItemToBoard(item.type, item.id),
    collect: (monitor) => ({
      isDragging: !!monitor.isOver(),
    }),
  }));

  const [commonTemplateName, setCommonTemplateName] = useState('');
  const [showTemplateNameModal, setShowTemplateNameModal] = useState(false);

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
      // id: uuidv4(),
      // templateName,
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
          ...allChangeHistory[item.id]
        };
      }).filter(Boolean)
    };

    const templateData = {
      
      templateName,
      properties: allProperties.properties
    };
  //  console.log(templateName);
    setBoards(prevBoards => [...prevBoards, templateName]);
      //  console.log(boards);
    // console.log(1);
  };

  const handleCommonNameChange = (e) => {
    setCommonTemplateName(e.target.value);
  };

  const handleSaveAllData = () => {
    setShowTemplateNameModal(true);
  };

  const handleCommonNameSubmit = (commonTemplateName) => {
    setShowTemplateNameModal(false);

    const dataToSend = {
      id: uuidv4(),
      commonName: commonTemplateName,
      templates: boards
    };

    console.log('Data to send:', dataToSend);/////////////////////   

    fetch('http://localhost:8080/api/combdemos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data saved successfully:', data);
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };

  const [sectionCount, setSectionCount] = useState(1);
  const handleCreateSection = () => {
    setSectionCount(prevCount => prevCount + 1);
  };

  const handleDeleteItem = (id) => {
    setBoard(prevBoard => prevBoard.filter(item => item.id !== id));
  };

  return (
    <div>
      {/* <Header /> */}
      <NavBarOtherComp/>
      <div className="container">
        <div className="Items">
          {ComponentList.map(component => {
            switch (component.type) {
              case 'textfield':
                return <Textfield key={component.id} id={component.id} label={component.label} placeholder={component.placeholder} isInsideBoard={false} inputType={component.inputType} isRequired={component.isRequired} maxLength={component.maxLength}/>;
              case 'button':
                return <Button key={component.id} id={component.id} label={component.label} text={component.text}  isInsideBoard={false} />;
              case 'dropdown':
                return <Dropdown key={component.id} id={component.id} label={component.label} options={component.options} isInsideBoard={false} selectedOptions={component.selectedOption} isMultiple={component.isMultiple} isRequired={component.isRequired}/>;
              case 'checkbox':
                return <CheckBox key={component.id} id={component.id} label={component.label} checked={false} isInsideBoard={false}  />
              case 'datepicker':
                return <DatePicker key={component.id} id={component.id} label={component.label} placeholder={component.placeholder} isInsideBoard={false}/>
              case 'radio':
                return <RadioButtons key={component.id} id={component.id} label={component.label} options={component.options} selectedOption={component.selectedOption} isInsideBoard={false} />
              default:
                return null;
            }
          })}
        </div>
        <div className="box" style={{ overflowY: 'auto', maxHeight: '600px' }}>
  {Array.from({ length: sectionCount }).map((_, index) => (
    <SectionAdder
      key={index}
      sectionIndex={index + 1}
      onSave={(data) => {
        handleTemplateNameSubmit(data);
      }}
      parentHandleSubmit={handleTemplateNameSubmit}
    />
  ))}
  <button onClick={handleCreateSection}>Create Section</button>
  <button onClick={handleSaveAllData}>Save Template</button>
</div>
        
        
        {showTemplateNameModal && (
          <CommonTempNameModel onSave={handleCommonNameSubmit} />
        )}
      </div>
    </div>
  );
}

export default DragDrop;


