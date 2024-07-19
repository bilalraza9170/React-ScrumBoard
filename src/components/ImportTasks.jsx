import React from "react";

function ImportTasks({ onFileUpload }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
}

export default ImportTasks;
