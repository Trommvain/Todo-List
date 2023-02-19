import axios from "axios";

export const getTasks = async () =>
  axios.get("http://localhost:5000/api/tasks");

export const createTask = async (taskData) =>
  axios.post("http://localhost:5000/api/tasks", taskData);

export const changeTaskStatus = async (taskId, taskData) =>
  axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskData);

export const deleteTask = async (taskId) =>
  axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
