import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskDetailModal from "./TaskDetailModal";
import TaskEditor from "./TaskEditor";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin: 0 10px 8px 10px;
  min-height: 120px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#EAF4FC")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* Ensure content doesn’t overflow */
`;

const Content = styled.div`
  flex: 1; /* Allows content to grow and fill available space */
  overflow: hidden; /* Hide any overflow */
`;

const PriorityLabel = styled.span`
  display: block;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export default function ScrumTask({ task, index, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskDetails, setEditTaskDetails] = useState(task);

  const handleCardClick = () => {
    if (!isEditing) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent dragging behavior
    setIsEditing(true);
  };

  const handleSave = (updatedTask) => {
    onSave(updatedTask);
    setIsEditing(false);
  };

  const getColorByPriority = (priority) => {
    switch (priority) {
      case "High":
        return "rgb(248,219,187)";
      case "Normal":
        return "rgb(208,254,240)";
      case "Urgent":
        return "rgb(249,226,228)";
      default:
        return "none";
    }
  };

  const priorityColor = getColorByPriority(task.priority);

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={handleCardClick}
          style={{
            ...provided.draggableProps.style, // Merge the provided draggable style
            backgroundColor: priorityColor,
          }}
        >
          {isEditing ? (
            <TaskEditor
              initialTask={editTaskDetails}
              onSave={(updatedTask) => {
                setEditTaskDetails(updatedTask);
                handleSave(updatedTask);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Content>
              <span>{task.taskName}</span>
              <br />
              <span>{task.description}</span>
              <br />
              <PriorityLabel color={priorityColor}>
                {task.priority}
              </PriorityLabel>
              <br />
              <span>{task.assignee}</span>
              <br />
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(event);
                }}
              >
                Edit
              </button>
            </Content>
          )}

          {provided.placeholder}

          <TaskDetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            task={task}
          />
        </Container>
      )}
    </Draggable>
  );
}
