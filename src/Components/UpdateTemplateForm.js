import React from 'react';
import { Link } from 'react-router-dom';

const UpdateTemplateForm = ({ template }) => {
  return (
    <div className="update-template-popup">
      <div className="update-template-popup-content">
        <h2>Update Template Data</h2>
        <form>
          <Link
            to={{
              pathname: `/update/${template.templateid}`,
              state: { templateData: template.data },
            }}
          >
            Edit Data
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateTemplateForm;
