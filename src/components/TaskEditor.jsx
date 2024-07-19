import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaskEditor = ({ initialTask, onSave, onCancel }) => {
  const [task, setTask] = useState(initialTask);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(task); // Save the updated task
  };

  return (
    <div>
      <input
        name="taskName"
        value={task.taskName}
        onChange={handleFieldChange}
        placeholder="Task Name"
      />
      <input
        name="assignee"
        value={task.assignee}
        onChange={handleFieldChange}
        placeholder="Assignee"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleFieldChange}
        placeholder="Description"
      />
      <input
        name="priority"
        value={task.priority}
        onChange={handleFieldChange}
        placeholder="Priority"
      />
      <input
        name="status"
        value={task.status}
        onChange={handleFieldChange}
        placeholder="Status"
      />
      <input
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleFieldChange}
      />
      <input
        name="spentTime"
        value={task.spentTime}
        onChange={handleFieldChange}
        placeholder="Spent Time"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

TaskEditor.propTypes = {
  initialTask: PropTypes.shape({
    taskName: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    dueDate: PropTypes.string,
    spentTime: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TaskEditor;
