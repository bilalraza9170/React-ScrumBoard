import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ScrumColumn from "./ScrumColumn";
import ExportButton from "./ExportButton";
import ImportTasks from "./ImportTasks";
import TaskEditor from "./TaskEditor";
import TaskForm from "./AddTaskForm";

function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function Board() {
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState({
    inBacklog: [],
    inOpen: [],
    inNew: [],
    inProgress: [],
    inFeedbackNeeded: [],
    inReadyForTesting: [],
    qaInProgress: [],
  });

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("scrumBoardState"));
    if (savedState) {
      setTasks(savedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scrumBoardState", JSON.stringify(tasks));
  }, [tasks]);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  const [formFields, setFormFields] = useState({
    taskName: "",
    assignee: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
    spentTime: "",
  });

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Math.random(), // Generate unique ID
      ...newTaskData,
      isEditing: false,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      inBacklog: [newTask, ...prevTasks.inBacklog],
    }));

    setShowAddTaskModal(false);
    console.log("Adding task:", newTask);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddTask(formFields);
  };

  const resetFormFields = () => {
    setFormFields({
      taskName: "",
      assignee: "",
      description: "",
      priority: "",
      status: "",
      dueDate: "",
      spentTime: "",
    });
  };

  const startEditing = (taskId) => {
    setTasks((prev) => ({
      ...prev,
      inBacklog: prev.inBacklog.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      ),
    }));
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const task = findItemById(draggableId, Object.values(tasks).flat());

    deletePreviousState(source.droppableId, draggableId);
    setNewState(destination.droppableId, task);
  };

  const deletePreviousState = (sourceDroppableId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [sourceDroppableId]: removeItemById(taskId, prev[sourceDroppableId]),
    }));
  };

  const setNewState = (destinationDroppableId, task) => {
    setTasks((prev) => ({
      ...prev,
      [destinationDroppableId]: [task, ...prev[destinationDroppableId]],
    }));
  };

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        if (Array.isArray(importedTasks)) {
          setTasks((prev) => ({
            ...prev,
            inBacklog: [...prev.inBacklog, ...importedTasks],
          }));
        }
      } catch (error) {
        console.error("Failed to parse JSON", error);
      }
    };
    reader.readAsText(file);
  };

  const findItemById = (id, array) => array.find((item) => item.id == id);

  const removeItemById = (id, array) => array.filter((item) => item.id != id);

  const updateTask = (updatedTask) => {
    const columnId = getTaskState(updatedTask);
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  };

  const getTaskState = (task) => {
    const validStatuses = Object.keys(tasks);
    return validStatuses.includes(task.status) ? task.status : "inBacklog";
  };

  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>AGILE SCRUM BOARD</h2>
      <div>
        <button onClick={handleAddTaskClick}>Add Task</button>
        <ExportButton tasks={Object.values(tasks).flat()} />
        <ImportTasks onFileUpload={handleFileUpload} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "1300px",
          margin: "0 auto",
        }}
      >
        {Object.entries(tasks).map(([key, value]) => (
          <ScrumColumn
            key={key}
            title={
              key === "qaInProgress"
                ? key
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace("qa", "QA")
                : key
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace("in", "")
            }
            tasks={value}
            id={key}
            onSave={updateTask}
          />
        ))}
      </div>

      {showAddTaskModal && (
        <TaskForm
          addTask={handleAddTask}
          setShowAddTaskModal={setShowAddTaskModal}
        />
      )}

      {editingTask && (
        <TaskEditor
          initialTask={editingTask}
          onSave={handleSaveTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </DragDropContext>
  );
}
