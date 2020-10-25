import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks, updateTask } from "../store";

function EditTask(props) {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.task);
  const [mainTask, setMainTask] = useState({
    taskName: "",
    workingHours: "",
    dueDate: "",
  });
  const [subTask, setSubTask] = useState({
    subTaskId: 0,
    taskName: "",
    dueDate: "",
    status: 1,
  });
  const [allSubTask, setAllSubTask] = useState([]);

  //Provides task information to be updated
  useEffect(() => {
    setAllSubTask([]);
    if (taskData && taskData.tasks && taskData.tasks.mainTask) {
      taskData.tasks.mainTask
        .filter((task) => task.taskId === props.taskId)
        .map((selectedMainTask) => {
          setMainTask({
            taskName: selectedMainTask.name,
            workingHours: selectedMainTask.working_hours,
            dueDate: selectedMainTask.due_date,
          });
        });

      taskData.tasks.subTask
        .filter((task) => task.taskId === props.taskId)
        .map((selectedSubTask) => {
          setAllSubTask((allSubTask) => [
            ...allSubTask,
            {
              subTaskId: selectedSubTask.subTaskId,
              taskName: selectedSubTask.name,
              dueDate: "",
              status: 1,
            },
          ]);
        });
    }
  }, [props.taskId, taskData, setAllSubTask, setMainTask]);

  //handle adding sub tasks to the Sub Task list
  const handleAddSubTask = () => {
    if (subTask.taskName) {
      setAllSubTask((allSubTask) => [...allSubTask, subTask]);
      setSubTask({ subTaskId: 0, taskName: "", dueDate: "", status: 1 });
    } else {
      toast.warn("Please provide sub task name.");
    }
  };
  //Handle removing tasks form the Sub Task list
  const handleRemoveSubTask = (index) => {
    const newArry = [...allSubTask];
    newArry[index].status = 0;
    setAllSubTask(newArry);
  };

  /**
   * Handle updating of a task from the Edit Task container.
   */
  const handleUpdateTask = async () => {
    if (!mainTask.taskName && !mainTask.workingHours && !mainTask.dueDate) {
      toast.warn("Mandatory fields are required to fill.");
      return false;
    }
    await dispatch(updateTask(props.taskId, mainTask, allSubTask));
    toast.success("Task successfull updated.");
    await dispatch(fetchTasks());
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
                  taskName: e.target.value,
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
                    taskName: e.target.value,
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
                  workingHours: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={moment(mainTask.dueDate).format("YYYY-MM-DD")}
              className="form-control"
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  dueDate: e.target.value,
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
                {allSubTask
                  .filter((subTask, index) => subTask.status === 1)
                  .map((task, index) => (
                    <div
                      key={index}
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      {task.taskName}
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
            onClick={() => handleUpdateTask()}
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTask;
