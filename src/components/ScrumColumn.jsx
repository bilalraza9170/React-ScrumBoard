import React from "react";
import styled from "styled-components";
import ScrumTask from "./ScrumTask";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  border-radius: 2.5px;
  width: 400px;
  height: 900px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 2px;
  text-align: center;
  background-color: lightgrey;
  position: sticky;
  top: 0;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;

const SearchInput = styled.input`
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: lightyellow;
`;

export default function ScrumColumn({ title, tasks, id, onSave }) {
  const handleSaveTask = (updatedTask) => {
    onSave(updatedTask); // Handle task saving in the parent component
  };

  return (
    <Container className="column">
      <Title>
        {title} ({tasks.length})
      </Title>
      {id === "inBacklog" && <SearchInput type="text" placeholder="Search.." />}

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <ScrumTask
                key={task.id}
                index={index}
                task={task}
                onSave={handleSaveTask}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
