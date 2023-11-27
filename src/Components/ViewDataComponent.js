


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UpdateDataComponent from './UpdateDataComponent';
import NavBarForData from './NavBarForData';

const ViewDataComponent = () => {
    const location = useLocation();
    const commonTemplateName = location.state?.commonTemplateName || 'Default Common Template Name';
    const [groupedData, setGroupedData] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState(null);
  
     useEffect(() => {
    fetch('http://localhost:8080/templates')
      .then((response) => response.json())
      .then((data) => {
        const groupedData = {};

        data.forEach((template) => {
          const commonTemplateName = template.commonTemplateName || 'Uncategorized';

          if (!groupedData[commonTemplateName]) {
            groupedData[commonTemplateName] = [];
          }

          groupedData[commonTemplateName].push(template);
        });

        setGroupedData(groupedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
     const handleDelete = (templateId) => {
    // Add logic to delete the template with templateId
    fetch(`http://localhost:8080/templates/${templateId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting template');
      }
      // Add any additional handling if needed
      console.log('Template deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting template:', error);
    });
  };
  
    const handleUpdate = (templateId) => {
      const templateToUpdate = groupedData[commonTemplateName].find(template => template.templateid === templateId);
      setSelectedTemplate(templateToUpdate);
    };
  
    const handleCancelUpdate = () => {
      setSelectedTemplate(null);
    };
  
    const handleUpdateSubmit = (templateId, updatedData) => {
        // Send a request to update the template
        fetch(`http://localhost:8080/templates/${templateId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: updatedData }),
        })
          .then((response) => response.json())
          .then((updatedTemplate) => {
            const updatedGroupedData = { ...groupedData };
    
            updatedGroupedData[commonTemplateName] = updatedGroupedData[commonTemplateName].map((template) =>
              template.templateid === templateId ? updatedTemplate : template
            );
    
            setGroupedData(updatedGroupedData);
    
            // Hide the update form after successful update
            setSelectedTemplate(null);
          })
          .catch((error) => console.error('Error updating template:', error));
      };
  
    return (
        <div>
            <NavBarForData/>
      <div>
        <h2>{commonTemplateName}</h2>
        {groupedData[commonTemplateName]?.map((template) => (
          <div key={template.templateid} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            {template.data.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>{item.label}:</span> {item.value}
              </div>
            ))}
            <button onClick={() => handleDelete(template.templateid)}>Delete</button>
            <button onClick={() => handleUpdate(template.templateid)}>Update</button>
          </div>
        ))}
        {selectedTemplate && (
          <UpdateDataComponent
            template={selectedTemplate}
            onUpdate={handleUpdateSubmit}
            onCancel={handleCancelUpdate}
          />
        )}
      </div>
      </div>
    );
  };
  
  export default ViewDataComponent;
  
