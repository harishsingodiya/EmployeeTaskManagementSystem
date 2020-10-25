import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, assignTask } from "../store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskAssignment() {
  const dispatch = useDispatch();
  // Fetch list of users from state
  const userData = useSelector((state) => state.user);
  // Fetch all tasks from state
  const taskData = useSelector((state) => state.task);
  const [selectedDesignation, setselectedDesignation] = useState(0);

  const [selectedTask, setSelectedTask] = useState(0);

  const assignTaskToUser = async (userId) => {
    if (selectedTask === 0) {
      toast.warn("Please select a task.");
      return false;
    }

    await dispatch(assignTask(selectedTask, userId));
    toast.success("Task successfully assigned.");
    await dispatch(fetchUsers());
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <div className="form-group text-left">
            <label>Task</label>
            <select
              className="form-control"
              defaultValue={0}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              <option value="0">Select</option>
              {taskData &&
                taskData.tasks.mainTask &&
                taskData.tasks.mainTask.map((task, index) => (
                  <option key={task.taskId} value={task.taskId}>
                    {task.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-group">
            <label>Designation</label>
            <select
              className="form-control"
              onChange={(e) => setselectedDesignation(e.target.value)}
            >
              <option value="0">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Team Leader">Team Leader</option>
              <option value="Sr. Developer">Sr. Developer</option>
              <option value="Jr. Developer">Jr. Developer</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-card">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Desgnation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.users &&
                userData.users.map((user, index) =>
                  selectedDesignation == 0 ||
                  user.designation === selectedDesignation ? (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.designation}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-sm mr-1"
                          onClick={() => assignTaskToUser(user.userId)}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TaskAssignment;
