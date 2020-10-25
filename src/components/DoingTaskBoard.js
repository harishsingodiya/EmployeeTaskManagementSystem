import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, updateTaskSubmission } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DoingTaskBoard(props) {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.task);
  const userData = useSelector((state) => state.user);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  /**get dragged task's taskId and set to event  */
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", e.target.id);
  };

  const handleDragOverOnBoard = (e) => {
    e.preventDefault();
  };

  /** Handle items when dropping tasks one Task Board to another */
  const handleDrop = async (e) => {
    e.preventDefault();
    var taskId = e.dataTransfer.getData("taskId", e.target.taskId);
    await dispatch(updateTaskSubmission(props.userId, taskId, 0));
    await dispatch(fetchUsers());
    toast.success("Task status Successfully updated.");
  };

  return (
    <div className="card bg-light p-0 mr-2 bg-grey  col-4">
      <div className="card-header text-muted d-flex">
        <h5>{props.title}</h5>
        <i className="flex flex-fill" />
        <img
          src={props.profile ? props.profile : "./profiles/user-img.png"}
          className="rounded-circle border mr-1"
          style={{ width: "40px", height: "40px" }}
          alt="profile-image1"
        ></img>
      </div>
      {taskData &&
        taskData.tasks.mainTask &&
        taskData.tasks.mainTask.map(
          (task, index) =>
            userData &&
            userData.users &&
            userData.users
              .filter(
                (user, index) =>
                  user.userId === props.userId &&
                  user.taskInComptetedId
                    .split(",")
                    .includes(task.taskId.toString())
              )
              .map((filteredUser) => (
                <div
                  key={index}
                  className="card m-2"
                  id={task.taskId}
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                >
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    {taskData &&
                      taskData.tasks &&
                      taskData.tasks.subTask
                        .filter((subTask) => subTask.taskId === task.taskId)
                        .map((filteredTask) => (
                          <p
                            key={filteredTask.subTaskId}
                            className="card-text pl-4"
                          >
                            {filteredTask.name}
                          </p>
                        ))}

                    <div className="border-top pt-1 text-muted d-flex">
                      <small className="text-muted">
                        <b>Due Date: {moment(task.due_date).format("LL")}</b>
                      </small>
                      <i className="flex flex-fill"></i>
                      {userData &&
                        userData.users &&
                        userData.users
                          .filter((user) =>
                            user.taskInComptetedId
                              .split(",")
                              .includes(task.taskId.toString())
                          )
                          .map((taskUser) => (
                            <img
                              key={taskUser.userId}
                              src={
                                taskUser.profile_pic
                                  ? taskUser.profile_pic
                                  : "./profiles/user-img.png"
                              }
                              className="rounded-circle border mr-1"
                              style={{ width: "40px", height: "40px" }}
                              alt="profil"
                            ></img>
                          ))}
                    </div>
                  </div>
                </div>
              ))
        )}

      <div
        className="card m-2"
        onDrop={handleDrop}
        onDragOver={handleDragOverOnBoard}
      >
        <div className="card-body">
          <h5 className="card-title text-muted">Add a task...</h5>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
