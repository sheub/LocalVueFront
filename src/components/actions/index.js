export const setStateValue = (key, value) => ({
    type: "SET_STATE_VALUE",
    key,
    value
  });
  
  export const setStateValues = (modifiedState) => ({
    type: "SET_STATE_VALUES",
    modifiedState
  });
  
  export const resetStateKeys = (keys) => ({
    type: "RESET_STATE_KEYS",
    keys
  });
  