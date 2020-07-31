const initialState = {
  username: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, username: action.payload };
    case "LOGOFF":
      return { ...state, username: "" };
    default:
      return state;
  }
}

export default reducer;
