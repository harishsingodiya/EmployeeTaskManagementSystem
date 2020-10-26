import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks, fetchUsers, createTask } from "../store";

function CreateTask(props) {
  const dispatch = useDispatch();

  const [mainTask, setMainTask] = useState({
    taskName: "",
    workingHours: "",
    dueDate: moment().format("YYYY-MM-DD")
  });

  const [subTask, setSubTask] = useState({ taskName: "", dueDate: "" });
  const [allSubTask, setAllSubTask] = useState([]);

  //Adds Sub Task to the Sub Task list
  const handleAddSubTask = () => {
    if (subTask.taskName) {
      setAllSubTask((allSubTask) => [...allSubTask, subTask]);
      setSubTask({ taskName: "", dueDate: "" });
    } else {
      toast.warn("Please provide sub task name.");
    }
  };

  //Removes the Sub Task from the Sub Task list
  const handleRemoveSubTask = (index) => {
    const newArry = [...allSubTask];
    newArry.splice(index, 1);
    setAllSubTask(newArry);
  };

  //Creates new Task
  const handleCreateTask = async () => {
    if (!mainTask.taskName && !mainTask.workingHours && !mainTask.dueDate) {
      toast.warn("Mandatory fields are required to fill.");
      return false;
    }
    await dispatch(createTask(mainTask, allSubTask));
    await dispatch(fetchTasks());
    await dispatch(fetchUsers());
    toast.success("Task successfull created.");
    props.handleCreateTaskButtonClick();
    setAllSubTask([]);
    setMainTask({
      taskName: "",
      workingHours: "",
      dueDate: moment().format("YYYY-MM-DD")
    });
  };

  return (
    <div>
      <div className="row  p-2">
        <div className="col-sm-6">
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name"
              value={mainTask.taskName}
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  taskName: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Sub Task Name</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter sub task name"
                aria-label="Enter sub task name"
                aria-describedby="basic-addon2"
                value={subTask.taskName}
                onChange={(e) =>
                  setSubTask({
                    ...subTask,
                    taskName: e.target.value
                  })
                }
              />

              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddSubTask}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Working Hours</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter working hours"
              value={mainTask.workingHours}
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  workingHours: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={mainTask.dueDate}
              className="form-control"
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  dueDate: e.target.value
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-6 p-4">
          {!allSubTask.length ? (
            ""
          ) : (
            <div className="card">
              <div className="card-header">
                <h5>Sub Tasks</h5>
              </div>
              <div className="card-body">
                {allSubTask.map((subTask, index) => (
                  <div
                    key={index}
                    className="alert alert-warning alert-dismissible fade show"
                    role="alert"
                  >
                    {subTask.taskName}
                    <button
                      type="button"
                      className="close"
                      onClick={() => handleRemoveSubTask(index)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row p-2">
        <div className="col-sm-12 p-2 text-center">
          <button
            className="btn btn-success"
            onClick={() => handleCreateTask()}
          >
            Create
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTask;
