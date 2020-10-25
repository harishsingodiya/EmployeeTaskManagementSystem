/*
This component shows a list of all users along with options to create, delete and update them.
*/
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";
import AddUserDialog from "./AddUserDialog";
import AllUsers from "./AllUsers";
import EditUserDialog from "./EditUserDialog";

function Users() {
  const dispatch = useDispatch();

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUserDetails, setEditingUserDetails] = useState([]);

  const handleEditButtonClick = (userDetails) => {
    setEditingUserDetails(userDetails);
    setShowEditUserModal(true);
  };

  // Fetch the list of users when this component is mounted
  useEffect(() => {
    const initialsLoad = async () => {
      await dispatch(fetchUsers());
    };
    initialsLoad();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="text-right p-2">
        <button
          className="btn btn-warning mb-2"
          data-toggle="modal"
          onClick={() => setShowAddUserModal(true)}
        >
          Add User
        </button>
      </div>

      <AllUsers handleEditButtonClick={handleEditButtonClick} />

      <AddUserDialog
        show={showAddUserModal}
        title="Create User"
        onClose={() => setShowAddUserModal(false)}
      />
      <EditUserDialog
        show={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        title="Edit User"
        userDetails={editingUserDetails}
      />
    </div>
  );
}

export default Users;
