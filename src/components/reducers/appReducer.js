const defaultAppState = {
    languageSet: "en",
    placeInfo: null,
    resultData: null,
    userFavoritePlaces:[]
};

const appReducer = (state = defaultAppState, action) => {
    switch (action.type) {
  
      case "SET_STATE_VALUE": {
        const modifiedState = {};
        modifiedState[action.key] = action.value;
        return Object.assign({}, state, modifiedState);
      }
  
      case "SET_STATE_VALUES": {
        return Object.assign({}, state, action.modifiedState);
      }
  
      case "RESET_STATE_KEYS": {
        const modifiedState = {};
        action.keys.forEach(k => {
          modifiedState[k] = defaultAppState[k];
        });
        return Object.assign({}, state, modifiedState);
      }
      case "SET_STATE_FROM_URL": {
        return state;
      }
  
      default:
        return state;
    }
}
export default appReducer;
export { appReducer, defaultAppState };