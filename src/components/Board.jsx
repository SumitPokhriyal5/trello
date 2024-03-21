import Card from "./Card";
import data from "../data/db";
import "../styles/board.css";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setNewTaskTitle("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openModal = (column) => {
    setSelectedColumn(column);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTaskTitle("");
  };

  const handleAddTask = () => {
    const newTask = {
      id: data.length + 1,
      title: newTaskTitle,
      status: selectedColumn,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
    data.push(newTask);
    closeModal();
  };
  const todoTasks = data.filter((task) => task.status === "todo");
  const inProgressTasks = data.filter((task) => task.status === "inProgress");
  const reviewTasks = data.filter((task) => task.status === "review");
  const doneTasks = data.filter((task) => task.status === "done");

  return (
    <div className="board">
      <div className="column">
        <div>
          <h2>To Do</h2>
          <BsThreeDots />
        </div>
        {todoTasks.map((task) => (
          <Card key={task.id} task={task.title} color={task.color} />
        ))}
        <div className="addTask" onClick={() => openModal("todo")}>
          <FaPlus />
          <span>Add a card</span>
        </div>
      </div>
      <div className="column">
        <div>
          <h2>In Progress</h2>
          <BsThreeDots />
        </div>
        {inProgressTasks.map((task) => (
          <Card key={task.id} task={task.title} color={task.color} />
        ))}
        <div className="addTask" onClick={() => openModal("inProgress")}>
          <FaPlus />
          <span>Add a card</span>
        </div>
      </div>
      <div className="column">
        <div>
          <h2>Review</h2>
          <BsThreeDots />
        </div>
        {reviewTasks.map((task) => (
          <Card key={task.id} task={task.title} color={task.color} />
        ))}
        <div className="addTask" onClick={() => openModal("review")}>
          <FaPlus />
          <span>Add a card</span>
        </div>
      </div>
      <div className="column">
        <div>
          <h2>Done</h2>
          <BsThreeDots />
        </div>
        {doneTasks.map((task) => (
          <Card key={task.id} task={task.title} color={task.color} />
        ))}
        <div className="addTask" onClick={() => openModal("done")}>
          <FaPlus />
          <span>Add a card</span>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
