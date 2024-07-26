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
  border-bottom: 1px solid #ddd;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  border-radius: 10px;
`;

function TaskForm({ addTask, setShowAddTaskModal }) {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignee: "",
    dueDate: "",
    status: "",
    spentTime: "",
    priority: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    resetForm();
  };

  const resetForm = () => {
    setNewTask({
      name: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "",
      spentTime: "",
      priority: "",
    });
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTask.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={newTask.assignee}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newTask.dueDate}
              min={getCurrentDate()}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={newTask.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="backlog">Backlog</option>
              <option value="open" disabled>
                Open
              </option>
              <option value="new" disabled>
                New
              </option>
              <option value="in-progress" disabled>
                In Progress
              </option>
              <option value="feedback-needed" disabled>
                Feedback Needed
              </option>
              <option value="ready-for-testing" disabled>
                Ready For Testing
              </option>
              <option value="qa-in-progress" disabled>
                QA In Progress
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="spentTime">Spent Time:</label>
            <input
              type="number"
              id="spentTime"
              name="spentTime"
              value={newTask.spentTime}
              onChange={handleChange}
              step="0.1"
              min="0"
              placeholder="Hours"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="buttons">
            <button type="button" onClick={() => setShowAddTaskModal(false)}>
              Cancel
            </button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}

export default TaskForm;
