import React from "react";
import styles from "./TodoListItem.module.scss";
import trashcanIcon from "../../assets/trash-can-icon.png";
import { useDispatch } from "react-redux";

export const TodoListItem = (props) => {
  const {
    task,
    task: { text, id, isDone },
    changeTaskStatus,
    deleteTask,
  } = props;

  const dispatch = useDispatch();

  return (
    <div className={styles.todoItem}>
      <div className={styles.input}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => dispatch(changeTaskStatus(task))}
        />
      </div>
      <p className={isDone ? styles.todoTextCrossed : styles.todoText}>
        {text}
      </p>
      <img
        className={styles.icon}
        src={trashcanIcon}
        alt="trashcan icon"
        onClick={() => dispatch(deleteTask(id))}
      />
    </div>
  );
};
