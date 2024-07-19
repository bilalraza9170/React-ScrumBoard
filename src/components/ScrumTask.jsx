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
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#EAF4FC")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export default function ScrumTask({ task, index, onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskDetails, setEditTaskDetails] = useState(task);

  const handleCardClick = () => {
    if (!isEditing) {
      // Prevent opening modal when in editing mode
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (e) => {
    // e.stopPropagation(); // Prevent dragging behavior
    setIsEditing(true);
  };

  const handleSave = (updatedTask) => {
    console.log("Saving task:", updatedTask); // Debugging line
    onSave(updatedTask);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={handleCardClick}
        >
          {isEditing ? (
            <TaskEditor
              initialTask={editTaskDetails}
              onSave={(updatedTask) => {
                console.log("TaskEditor onSave:", updatedTask); // Debugging line
                setEditTaskDetails(updatedTask);
                handleSave(updatedTask);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <span>{task.taskName}</span>
              <br />
              <span>{task.assignee}</span>
              <br />
              <span>{task.description}</span>
              <br />
              <span>{task.priority}</span>
              <br />
              <button onClick={handleEdit}>Edit</button>
            </div>
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
