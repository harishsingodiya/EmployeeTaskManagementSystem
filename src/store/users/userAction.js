import axios from "axios";
import { USER_REQUEST, USER_SUCCESS, USER_ERROR } from "./userActionType";

export const fetchUsersRequest = () => {
  return {
    type: USER_REQUEST
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: USER_ERROR,
    payload: error
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest);
    await axios
      .post("http://localhost:5000/user/users")
      .then((res) => {
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const updateUser = (userDetails) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest);
    await axios
      .post("http://localhost:5000/user/update_user", userDetails)
      .then((res) => {
        //const users = res.data;
        //dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const addUser = (userDetails) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest);
    await axios
      .post("http://localhost:5000/user/add_user", userDetails)
      .then((res) => {
        //const users = res.data;
        //dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest);
    await axios
      .post("http://localhost:5000/user/delete_users", { userId: userId })
      .then((res) => {
        //const users = res.data;
        //dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};