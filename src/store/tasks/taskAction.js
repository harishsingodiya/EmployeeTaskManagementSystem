import axios from "axios";
import { TASK_REQUEST, TASK_SUCCESS, TASK_ERROR } from "./taskType";

export const fetchTasksRequest = () => {
  return {
    type: TASK_REQUEST,
  };
};
const fetchTasksSuccess = (tasks) => {
  return {
    type: TASK_SUCCESS,
    payload: tasks,
  };
};
const fetchTasksFailure = (error) => {
  return {
    type: TASK_ERROR,
    payload: error,
  };
};

/**
 * Action to fetch tasks
 */
export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/all_tasks")
      .then((res) => {
        const tasks = res.data;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

/**
 * Action to create new task
 */
export const createTask = (mainTask, subTasks) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/create_task", {
        mainTask: mainTask,
        subTask: subTasks,
      })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

/**
 *
 * Action to delete a task
 */
export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/delete_task", { taskId: taskId })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

/***
 * Action to update task
 */
export const updateTask = (taskId, mainTask, subTasks) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/update_task", {
        taskId: taskId,
        mainTask: mainTask,
        subTask: subTasks,
      })
      .then((res) => {
        //console.log(res.data)
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

/***
 * Action to assign task to particular user
 */

export const assignTask = (taskId, userId) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/assign_task", {
        taskId: taskId,
        userId: userId,
      })
      .then((res) => {
        //console.log(res.data)
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

/**
 * Action to update task status
 */

export const updateTaskSubmission = (userId, taskId, status) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("http://localhost:5000/tasks/submit_task", {
        taskId: taskId,
        userId: userId,
        status: status,
      })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};
