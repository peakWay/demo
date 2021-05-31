

export default function reducers(state = { isLogined: false, isLoging: false, list: [] }, action) {
    console.log(action)
    switch (action.type) {
      case 'LOGIN_PENDING':
        return {
            ...state,
            isLogined: false, 
            isLoging: true
        }  
      case 'LOGIN_SUCCESS':
        return {
            ...state,
            isLogined: true, 
            isLoging: false
        }
      case 'LOGIN_ERROR':
        return {
            ...state,
            isLogined: false, 
            isLoging: false
        }
      case 'LOGOUT':
        return {
            ...state,
            isLogined: false, 
            isLoging: false
        }  
    case 'ADD_POST':
        return {
            ...state,
            list: state.list.concat(action.payload)
        }
      default:
        return state
    }
}