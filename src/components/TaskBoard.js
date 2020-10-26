import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks, fetchUsers } from "../store";
import { useLocation } from "react-router-dom";
import DoingTaskBoard from "./DoingTaskBoard";
import DoneTaskBoard from "./DoneTaskBoard";
import TaskReport from "./TaskReport";
export default function TaskBoard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(
    location.state.userId ? location.state.userId : 0
  );

  // Fetch the list of users and tasks when this component is mounted
  useEffect(() => {
    const initialsLoad = async () => {
      await dispatch(fetchTasks());
      await dispatch(fetchUsers());
    };
    initialsLoad();
  });

  return (
    <div
      className="container-fluid  text-left h-100 position-absolute"
      style={{ background: " #85c1e9 " }}
    >
      <div className="row d-flex p-4 w-80" style={{ background: " #85c1e9 " }}>
        <div className="col-sm-12  text-left p-2">
          <span className="badge badge-secondary p-2">
            <h4>Team Tasks</h4>
          </span>
        </div>

        <div className="col-sm-12 d-flex  p-2">
          <DoingTaskBoard title="Doing" userId={userId} />
          <DoneTaskBoard title="Done" userId={userId} />
          <TaskReport title="Task Report" userId={userId} />
        </div>
      </div>
    </div>
  );
}
