import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./UserInputForm.module.scss";
import {
  createTask,
  toggleInputValidation,
} from "../../store/slices/taskSlice";

export const UserInputForm = () => {
  const { isInputValid } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const hanldeSubmit = (value, formikBag) => {
    dispatch(createTask(value.todoInput.trim()));
    formikBag.resetForm();
  };

  const validateInput = (value) => {
    let error;
    if (!value) {
      if (isInputValid !== false) {
        dispatch(toggleInputValidation());
      }
      error = "Write some text to add a task!";
    } else if (!isInputValid) {
      dispatch(toggleInputValidation());
    }
    return error;
  };

  return (
    <Formik initialValues={{ todoInput: "" }} onSubmit={hanldeSubmit}>
      <Form className={styles.form}>
        <Field
          className={isInputValid ? styles.input : styles.inputError}
          type="text"
          name="todoInput"
          placeholder="What are you gonna do?"
          validate={validateInput}
          onBlur={() =>
            !isInputValid ? dispatch(toggleInputValidation()) : null
          }
        />
        <button className={styles.addBtn} type="submit">
          ADD
        </button>
        <ErrorMessage
          name="todoInput"
          component="p"
          className={styles.errorMsg}
        />
      </Form>
    </Formik>
  );
};
