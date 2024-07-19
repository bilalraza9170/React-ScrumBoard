import React from "react";

function ExportButton({ tasks }) {
  const exportTasks = () => {
    const tasksJson = JSON.stringify(tasks, null, 2);
    const blob = new Blob([tasksJson], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", "tasks.json");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return <button onClick={exportTasks}>Export Tasks</button>;
}

export default ExportButton;
