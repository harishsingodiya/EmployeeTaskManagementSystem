import { TASK_REQUEST, TASK_SUCCESS, TASK_ERROR } from "./taskType";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TASK_SUCCESS:
      return {
        loading: false,
        tasks: action.payload,
        error: "",
      };
    case TASK_ERROR:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
