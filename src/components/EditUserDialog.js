import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers, updateUser } from "../store";
function EditUser(props) {
  const dispatch = useDispatch();
  // The data of the currently edited user
  const [editUserDetails, setEditUserDetails] = useState({});

  useEffect(() => {
    // Create a copy of the props.userDetails when dialog shows
    if (props.show) {
      setEditUserDetails({ ...props.userDetails });
    }
  }, [props.show, setEditUserDetails, props.userDetails]);

  /**
   * Handle updating of a user from the Edit User dialog.
   */
  const handleUpdateClick = async () => {
    await dispatch(updateUser(editUserDetails));
    props.onClose();
    toast.success("User successfully updated.");
    await dispatch(fetchUsers());
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
                defaultValue={props.userDetails.name}
                onChange={(e) =>
                  setEditUserDetails({
                    ...editUserDetails,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group text-left">
              <label>Designation</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={props.userDetails.designation}
                onChange={(e) =>
                  setEditUserDetails({
                    ...editUserDetails,
                    designation: e.target.value,
                  })
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
                type="text"
                placeholder="Working hours per week"
                defaultValue={props.userDetails.working_hours}
                onChange={(e) =>
                  setEditUserDetails({
                    ...editUserDetails,
                    working_hours: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdateClick()}
              >
                Update
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

export default EditUser;
