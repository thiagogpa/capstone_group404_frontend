const initialState = {
  sidebarShow: "responsive",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SIDEMENU":
      return { ...state, sidebarShow: action.payload };
    default:
      return state;
  }
  
}

export default reducer;
