import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "task";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  isInputValid: true,
  scroll: false,
};

const getTasks = createAsyncThunk(
  `${SLICE_NAME}/getTasks`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data: tasks },
      } = await API.getTasks();
      return tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createTask = createAsyncThunk(
  `${SLICE_NAME}/createTask`,
  async (taskText, thunkAPI) => {
    try {
      const {
        data: { data: task },
      } = await API.createTask({ text: taskText });

      return task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const changeTaskStatus = createAsyncThunk(
  `${SLICE_NAME}/changeTaskStatus`,
  async (task, thunkAPI) => {
    try {
      const {
        data: { data: updatedTask },
      } = await API.changeTaskStatus(task.id, {
        text: task.text,
        isDone: !task.isDone,
      });
      return updatedTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteTask = createAsyncThunk(
  `${SLICE_NAME}/deleteTask`,
  async (taskId, thunkAPI) => {
    try {
      const {
        data: { data: task },
      } = await API.deleteTask(taskId);
      return task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleInputValidation: (state) => {
      state.isInputValid = !state.isInputValid;
    },
  },
  extraReducers: (builder) => {
    //get tasks
    builder.addCase(getTasks.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //create task
    builder.addCase(createTask.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload];
      state.scroll = !state.scroll;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // change task status
    builder.addCase(changeTaskStatus.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      for (let task of state.tasks) {
        if (task.text === action.payload.text) {
          task.isDone = action.payload.isDone;
        }
      }
    });
    builder.addCase(changeTaskStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // delete task
    builder.addCase(deleteTask.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.filter((task) => task.id !== +action.payload);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = taskSlice;

const { toggleInputValidation } = actions;

export {
  reducer,
  getTasks,
  createTask,
  changeTaskStatus,
  deleteTask,
  toggleInputValidation,
};

export default taskSlice.reducer;
