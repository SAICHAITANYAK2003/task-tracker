import React, { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import "./index.css";

const TaskTracker = () => {
  const [tasksList, setTasksList] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  const onChangeInput = (event) => {
    setUserInput(event.target.value);
  };

  const onHandleDelete = (id) => {
    const newTasks = tasksList.filter((eachTask) => eachTask.id !== id);
    setTasksList(newTasks);
  };

  const onHandleForm = (event) => {
    event.preventDefault();

    if (userInput.trim() !== "") {
      const addTask = {
        id: uuidV4(),
        task: userInput,
        isCompleted: false,
      };

      setTasksList([...tasksList, addTask]);
      setUserInput("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasksList(
      tasksList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <>
      <div className="app-page">
        <div className="app-container">
          <h2 className="app-title">Task Tracker</h2>

          <form className="form-details" onSubmit={onHandleForm}>
            <input
              type="text"
              className="add-text-bar"
              placeholder="Add new Task"
              onChange={onChangeInput}
              value={userInput}
            />
            <button className="add-task-btn" type="submit">
              <IoIosAddCircleOutline /> Add Task
            </button>
          </form>

          <ul className="tasks-list">
            {tasksList.length === 0 ? (
              <p>No tasks Available</p>
            ) : (
              tasksList.map((eachTask) => (
                <li className="task-item" key={eachTask.id}>
                  <span className="task-details">
                    <span
                      onClick={() => toggleTaskCompletion(eachTask.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {eachTask.isCompleted ? (
                        <IoCheckmarkDoneCircle color="green" />
                      ) : (
                        <CiCircleRemove color="000" />
                      )}
                    </span>
                    <p
                      className={`task-title ${
                        eachTask.isCompleted ? "completed" : ""
                      }`}
                    >
                      {eachTask.task}
                    </p>
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => onHandleDelete(eachTask.id)}
                  >
                    <RiDeleteBinLine size={15} />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TaskTracker;
