const initialTabState = { profileActive: true, editActive: false };
export const initialState = {
  people: [],
  profileTabs: initialTabState
};
export default (state, action) => {
  switch (action.type) {
    case "people":
      return { ...state, people: action.payload };
    case "profileTab":
      return {
        ...state,
        profileTabs: !state.profileTabs.profileActive
          ? initialTabState
          : state.profileTabs
      };
    case "editTab":
      return {
        ...state,
        profileTabs: !state.profileTabs.editActive
          ? { profileActive: false, editActive: true }
          : state.profileTabs
      };
    case "person":
      return { ...state, person: action.payload };
    default:
      return state;
  }
};
