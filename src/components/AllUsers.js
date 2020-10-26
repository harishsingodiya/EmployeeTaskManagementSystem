import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../store";

export default function AllUsers(props) {
  const history = useHistory();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /**
   * Handle deleting of a user from the list
   * @param {String} userId The id of the user to delete
   */
  const handleDeleteUser = async (userId) => {
    await dispatch(deleteUser(userId));
    toast.success("User successfully deleted.");
    await dispatch(fetchUsers());
  };

  return (
    <div className="text-left">
      {userData && !userData.users.length ? (
        <h5>There are no users, please add users.</h5>
      ) : (
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Users</h4>
            </div>
            <div className="card-body">
              {userData &&
                userData.users &&
                userData.users.map((user, index) => (
                  <div
                    key={user.userId}
                    className="card mr-2 mt-2  d-inline-block "
                    style={{ width: "18rem" }}
                  >
                    <span className="dropdown dropleft position-absolute p-2 d-flex align-self-end mr-2">
                      <span
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-muted"
                          style={{ cursor: "pointer", fontSize: "24px" }}
                        ></i>
                      </span>

                      <div className="dropdown-menu">
                        <li
                          className="dropdown-item"
                          onClick={() => props.handleEditButtonClick(user)}
                        >
                          <i className="fa fa-edit mr-2"></i>
                          Edit
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => handleDeleteUser(user.userId)}
                        >
                          <i className="fa fa-trash mr-2"></i>
                          Delete
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() =>
                            history.push({
                              pathname: "/task-board",
                              state: {
                                userId: user.userId
                              }
                            })
                          }
                        >
                          <i className="fa fa-tasks mr-1"></i> Task Report
                        </li>
                      </div>
                    </span>

                    <span>
                      <img
                        src="./profiles/user-img.png"
                        style={{ width: "18rem", height: "250px" }}
                        alt="Cinque Terre"
                      ></img>
                    </span>
                    <div className="card-body text-center">
                      <h5 className="card-title w-auto">{user.name}</h5>
                      <h6 className="card-title w-auto">
                        ({user.designation})
                      </h6>
                    </div>
                    <div className="card-footer bg-white d-flex">
                      <small>Working Hours : {user.working_hours}</small>
                      <i className="flex flex-fill" />
                      <small>Total Tasks : {user.tot_tasks}</small>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
