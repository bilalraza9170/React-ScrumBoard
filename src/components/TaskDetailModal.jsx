import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

const ModalCloseButton = styled.button`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
`;

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{task.taskName}</h2>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Assignee:</strong> {task.assignee}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Spent Time:</strong> {task.spentTime}
        </p>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default TaskDetailModal;
