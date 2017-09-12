function appReducer (state, action) {
  switch (action.type) {
    case 'UpdateHashLocation': {
      if (state.hashLocation === action.hashLocation) {
        return state
      } else {
        return {
          ...state,
          hashLocation: action.hashLocation,
        }
      }
    }
    default: return state
  }
}

module.exports.reducer = appReducer
