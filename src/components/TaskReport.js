import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

function TaskReport({ userId, title, profile }) {
  //fetch users list from state
  const userData = useSelector((state) => state.user);

  const [graphDataSet, setGraphDataSet] = useState({});
  const [graphDataOptions, setgraphDataOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  /**
   * Prepare data to render report of a particular user in the graph
   */
  useEffect(() => {
    if (userData && userData.users && userData.users.length) {
      const selectedUser = userData.users.find((user) => {
        return user.userId === userId;
      });
      var graphData = [
        selectedUser.tot_tasks,
        selectedUser.completed_tasks,
        selectedUser.tot_tasks - selectedUser.completed_tasks,
        "",
      ];
      setGraphDataSet({
        labels: ["Total Task Assigned", "Completed Tasks", "Ongoing Tasks"],
        datasets: [
          {
            label: "Task Report",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            barPercentage: 0.5,
            barThickness: 30,
            maxBarThickness: 50,
            minBarLength: 2,
            data: graphData,
          },
        ],
      });
      setgraphDataOptions({
        legend: { display: false },
        title: {
          display: true,
          text: "Task Report of " + selectedUser.name,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      });

      setSelectedUser(selectedUser);
    }
  }, [userId, userData, setSelectedUser, setGraphDataSet, setgraphDataOptions]);

  return (
    <div className="card bg-light p-0  col-4">
      <div className="card-header d-flex text-muted">
        <h5>{title}</h5>
        <i className="flex flex-fill" />
        <img
          src={profile ? profile : "./profiles/user-img.png"}
          className="rounded-circle border mr-1"
          style={{ width: "40px", height: "40px" }}
          alt="profile"
        ></img>
      </div>
      <div className="card m-2">
        <div className="card-body">
          {selectedUser ? (
            <HorizontalBar data={graphDataSet} options={graphDataOptions} />
          ) : (
            <h5>Loading.......</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskReport;
