import React, { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../store";
import moment from "moment";

function AllTasks(props) {
  const dispatch = useDispatch();
  //fetch the list of tasks from the state
  const taskData = useSelector((state) => state.task);
  //fetch the list of users from the state
  const userData = useSelector((state) => state.user);

  /**
   * Handle deleting of a task from the list
   * @param {String} taskId The id of the task to delete
   */
  const handleDeleteTask = async (taskId) => {
    await dispatch(deleteTask(taskId));
    toast.success("Task successfully deleted.");
    await dispatch(fetchTasks());
  };

  const getSubTaskViews = useCallback(
    (task) => {
      return taskData.tasks.subTask.map((subtask) =>
        task.taskId === subtask.taskId ? (
          <h6 key={subtask.subTaskId} className="card-title w-auto">
            {subtask.name}
          </h6>
        ) : (
          ""
        )
      );
    },
    [taskData]
  );

  return (
    <div>
      <div className="row  p-2">
        {taskData && taskData.tasks.mainTask == "" ? (
          <span>
            <h5>There are no tasks, please create task.</h5>
          </span>
        ) : (
          taskData &&
          taskData.tasks.mainTask &&
          taskData.tasks.mainTask.map((task, index) => (
            <div key={index} className="col-sm-4">
              <div key={index} className="card mt-1 bg-light">
                <div className="card-header bg-white d-flex">
                  <h5 className="w-auto">{task.name}</h5>
                  <i className="flex flex-fill" />
                  <div className="dropdown dropleft">
                    <span
                      className=""
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i
                        className="fa fa-ellipsis-v"
                        style={{ cursor: "pointer", fontSize: "18px" }}
                      ></i>
                    </span>

                    <div className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={() => props.handleEditButtonClick(task.taskId)}
                      >
                        <i className="fa fa-edit mr-2"></i>
                        Edit
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => handleDeleteTask(task.taskId)}
                      >
                        <i className="fa fa-trash mr-2"></i>
                        Delete
                      </li>
                    </div>
                  </div>
                </div>
                <div className="card-body">{getSubTaskViews(task)}</div>
                <div className="d-flex p-2 align-items-end">
                  <small className="text-muted">
                    <b>Due Date: {moment(task.due_date).format("LL")}</b>
                  </small>
                  <i className="flex flex-fill" />

                  <span className="rounded-circle d-flex">
                    {userData &&
                      userData.users &&
                      userData.users
                        .filter((user, index) =>
                          user.taskAssignedId
                            .split(",")
                            .includes(task.taskId.toString())
                        )
                        .map((filteredUser) => (
                          <img
                            key={filteredUser.userId}
                            src={
                              filteredUser.profile_pic
                                ? filteredUser.profile_pic
                                : "./profiles/user-img.png"
                            }
                            className="rounded-circle border mr-1"
                            style={{ width: "40px", height: "40px" }}
                            alt="Cinque Terre"
                          ></img>
                        ))}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllTasks;
