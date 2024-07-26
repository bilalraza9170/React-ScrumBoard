import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  border-radius: 10px;
`;

export default function TaskEditor({ initialTask, onSave, onCancel }) {
  const [task, setTask] = useState(initialTask);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              name="taskName"
              value={task.taskName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Assignee:
            <input
              type="text"
              name="assignee"
              value={task.assignee}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Priority:
            <input
              type="text"
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Spent Time:
            <input
              type="text"
              name="spentTime"
              value={task.spentTime}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}
