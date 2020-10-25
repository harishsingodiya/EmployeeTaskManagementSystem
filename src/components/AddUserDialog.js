import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUsers, addUser } from "../store";

function AddUser(props) {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState({
    name: "",
    designation: "",
    wokingHours: ""
  });

  const handleUploadFile = (e) => {
    document.getElementById("filename").innerHTML = e.target.value
      .split("\\")
      .pop();
  };

  /**
   * Create a new user with provided parameters
   */
  const handleSaveNewUser = async () => {
    if (
      !userDetail.name ||
      !userDetail.designation ||
      !userDetail.wokingHours
    ) {
      toast.warn("Mandatory fields can not be empty.");
      return false;
    }
    var userData = new FormData();
    var fileInput = document.getElementById("uploadfile-input");
    var file = fileInput.files[0];

    userData.append("profilePic", file);
    userData.append("name", userDetail.name);
    userData.append("designation", userDetail.designation);
    userData.append("wokingHours", userDetail.wokingHours);

    await dispatch(addUser(userData));
    props.onClose();
    toast.success("User successfully created.");
    await dispatch(fetchUsers());
    setUserDetail({
      name: "",
      designation: "",
      wokingHours: ""
    });
  };

  return (
    <div
      className={["overlay", props.show ? "d-block" : "d-none"].join(" ")}
      id="exampleModal"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button type="button" className="close" onClick={props.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">
            <div className="form-group text-left">
              <label>Name</label>
              <input
                className={"form-control"}
                type="text"
                placeholder="Enter name"
                value={userDetail.name}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, name: e.target.value })
                }
              />
            </div>
            <div className="form-group text-left">
              <label>Designation</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                defaultValue="0"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, designation: e.target.value })
                }
              >
                <option value="0">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Sr. Developer">Sr. Developer</option>
                <option value="Jr. Developer">Jr. Developer</option>
              </select>
            </div>
            <div className="form-group text-left">
              <label>Working Hours (per week)</label>
              <input
                className={"form-control"}
                type="number"
                placeholder="Working hours per week"
                value={userDetail.wokingHours}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, wokingHours: e.target.value })
                }
              />
            </div>
            <div className="form-group text-left">
              <label>Profile Picture</label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="uploadfile-input"
                    accept=".jpg,.png"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={handleUploadFile}
                  />
                  <label className="custom-file-label text-left" id="filename">
                    Choose file
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveNewUser()}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default AddUser;
