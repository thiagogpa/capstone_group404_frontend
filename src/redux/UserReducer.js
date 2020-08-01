const initialState = {
  username: "",
  isStaff: false,
  userId: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        isStaff: action.payload.isStaff,
        userId: action.payload.userId,
      };
    case "LOGOFF":
      return { ...state, username: "", isStaff: false, userId: "" };
    default:
      return state;
  }
}

export default reducer;
