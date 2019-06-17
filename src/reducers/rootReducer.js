export const initialState = {
  people: [],
  profileActive: true,
  editActive: false,
  searchKey: ""
};
export default (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "people":
      return { ...state, people: payload };
    case "profileTab":
      return { ...state, ...payload };
    case "editTab":
      return { ...state, ...payload };
    case "person":
      return { ...state, person: payload };
    case "searchKey":
      return { ...state, searchKey: payload };
    default:
      return state;
  }
};
