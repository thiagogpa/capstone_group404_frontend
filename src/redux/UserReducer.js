const initialState = {
  username: "",
  isStaff: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        isStaff: action.payload.isStaff,
      };
    case "LOGOFF":
      return { ...state, username: "" };
    default:
      return state;
  }
}

export default reducer;
