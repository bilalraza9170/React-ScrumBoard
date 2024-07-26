import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  left: 500px;
  top: 100px;
  width: 700px;
  z-index: 100;
  height: 100;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  overflow: hidden; /* Hide any overflow */
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
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
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
      </ModalContent>
    </ModalWrapper>
  );
};

export default TaskDetailModal;
