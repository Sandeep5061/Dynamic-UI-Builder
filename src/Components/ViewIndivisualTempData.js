
import React, { useState, useEffect } from 'react';
import GroupedDataComponent from './GroupedDataComponent'; // Assuming the component is in a file named GroupedDataComponent.js
import NavBarForData from './NavBarForData'
const ViewIndivisualTempData = () => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/templates') // Assuming this endpoint returns the data you provided
      .then(response => response.json())
      .then(data => {
        // Group data by commonTemplateName
        const groupedData = {};

        data.forEach(template => {
          const commonTemplateName = template.commonTemplateName || 'Uncategorized';

          if (!groupedData[commonTemplateName]) {
            groupedData[commonTemplateName] = [];
          }

          groupedData[commonTemplateName].push(template);
        });

        setGroupedData(groupedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
        <NavBarForData/>
    <div className="template-list">
      <GroupedDataComponent data={groupedData} />
    </div>
    </div>
  );
};

export default ViewIndivisualTempData;



