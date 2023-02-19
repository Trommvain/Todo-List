import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TodoList.module.scss";
import { TodoListItem, UserInputForm } from "../../components";
import {
  getTasks,
  changeTaskStatus,
  deleteTask,
} from "../../store/slices/taskSlice";

export const TodoList = () => {
  const { tasks, isLoading, error, scroll } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();
  const elemRef = useRef();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const elem = elemRef.current;
    elem.scrollTop = elem.scrollHeight;
  }, [scroll]);

  const todoListItems = tasks.map((task) => {
    return (
      <TodoListItem
        task={task}
        key={task.id}
        id={task.id}
        isDone={task.isDone}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
      />
    );
  });

  return (
    <main className={styles.container}>
      <UserInputForm />
      <section className={styles.todoBlock} ref={elemRef}>
        {!error && isLoading && (
          <p className={styles.placeholder}>Loading...</p>
        )}
        {error && <p className={styles.loadError}>{error}</p>}
        {!isLoading && !error && tasks.length === 0 && (
          <p className={styles.placeholder}>There's nothing here yet...</p>
        )}
        {!isLoading && !error && tasks.length > 0 && todoListItems}
      </section>
    </main>
  );
};
