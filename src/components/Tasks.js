/*
This component shows a list of all tasks along with their sub task
*/
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateTask from "./CreateTask";
import TaskAssignment from "./TaskAssignment";
import EditTask from "./EditTask";
import AllTasks from "./AllTasks";
import { fetchTasks, fetchUsers } from "../store";

function Tasks() {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState(0);
  // This value is used as key to force rerender Task component
  const [createTaskComponentKey, setCreateTaskComponentKey] = useState(
    performance.now()
  );

  // Fetch the list of tasks and users when this component is mounted
  useEffect(() => {
    const initialsLoad = async () => {
      await dispatch(fetchTasks());
      await dispatch(fetchUsers());
    };
    initialsLoad();
  });

  //display edit task container when edit button clicked
  const handleEditButtonClick = (taskId) => {
    setTaskId(taskId);
    document.getElementById("pills-edit-tab").click();
  };

  //display all task container when Create task button clicked
  const handleCreateTaskButtonClick = () => {
    document.getElementById("pills-task-tab").click();
    setCreateTaskComponentKey(performance.now());
  };

  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="col-sm-12 text-left">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-task-tab"
                    data-toggle="pill"
                    href="#all-task-tab"
                    role="tab"
                    aria-controls="pills-task"
                    aria-selected="true"
                  >
                    All Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-assign-tab"
                    data-toggle="pill"
                    href="#assign-task-tab"
                    role="tab"
                    aria-controls="pills-assign"
                    aria-selected="false"
                  >
                    Task Assignment
                  </a>
                </li>
                <li className="nav-item d-none">
                  <a
                    className="nav-link"
                    id="pills-edit-tab"
                    data-toggle="pill"
                    href="#edit-task-tab"
                    role="tab"
                    aria-controls="pills-assign"
                    aria-selected="false"
                  >
                    Edit Task
                  </a>
                </li>

                <i className="flex flex-fill" />
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pill-task-tab"
                    data-toggle="pill"
                    href="#create-task-tab"
                    role="tab"
                    aria-controls="pills-task"
                    aria-selected="false"
                  >
                    Create Task
                  </a>
                </li>
              </ul>
              <div className="card">
                <div className="card-body">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="all-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-task-tab"
                    >
                      <AllTasks
                        key={createTaskComponentKey}
                        handleEditButtonClick={handleEditButtonClick}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="assign-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-assign-tab"
                    >
                      <TaskAssignment />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="edit-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-assign-tab"
                    >
                      <EditTask
                        taskId={taskId}
                        handleCreateTaskButtonClick={
                          handleCreateTaskButtonClick
                        }
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="create-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-task-tab"
                    >
                      <CreateTask
                        handleCreateTaskButtonClick={
                          handleCreateTaskButtonClick
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
