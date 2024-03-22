import Card from "./Card";
import initialData from "../data/db";
import "../styles/board.css";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [data, setData] = useState(initialData);
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
  
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const movedTask = data.find(task => task.id.toString() === result.draggableId);
    if (movedTask) {
      movedTask.status = destination.droppableId;
      const newData = data.filter(task => task.id.toString() !== result.draggableId);
      newData.splice(destination.index, 0, movedTask);
      setData(newData);
    }
  };

  const statuses = ["todo", "inProgress", "review", "done"];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="board">
        {statuses.map((status) => (
           <Droppable key={status} droppableId={status}>
           {(provided) => (
             <div
               className="column"
               {...provided.droppableProps}
               ref={provided.innerRef}
             >
               <div>
               <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                 <BsThreeDots />
               </div>
               {data
                 .filter((task) => task.status === status)
                 .map((task, index) => (
                   <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                     {(provided) => (
                       <div
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                       >
                         <Card title={task.title} color={task.color} />
                       </div>
                     )}
                   </Draggable>
                 ))}
               {provided.placeholder}
               <div className="addTask" onClick={() => openModal(status)}>
                 <FaPlus />
                 <span>Add a card</span>
               </div>
             </div>
           )}
         </Droppable>
        ))}
       
    
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
    </DragDropContext>
  );
};

export default Board;