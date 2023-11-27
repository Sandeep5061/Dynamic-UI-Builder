import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/GroupedDataComponent.css'; // Import your CSS file

const GroupedDataComponent = ({ data }) => {
  return (
    <div className="grouped-data-container">
      {Object.keys(data).map((commonTemplateName) => (
        <div key={commonTemplateName} className="grouped-data-item">
          <div className="common-template-name">
            <h2>{commonTemplateName}</h2>
          </div>
          <div className="view-link">
            <Link to={`/view/${commonTemplateName}`} state={{ commonTemplateName }}>View</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedDataComponent;


