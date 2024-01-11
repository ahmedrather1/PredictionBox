import React from "react";

const FileUploadComponent = ({ onChange }) => {
  return <input type="file" onChange={onChange} />;
};

export default FileUploadComponent;
