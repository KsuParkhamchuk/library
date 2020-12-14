import { START, SUCCESS, ERROR } from "../constants"


interface IUserState {
  tokens: Array<any>
}

const defaultState = {
  tokens: {}
} as IUserState

function userReducer(state: IUserState = defaultState, action: any) {
 
  const { type, payload, response } = action
  // if (response !== undefined) {
  //   localStorage.setItem("latestSelectedDate", response.date);
  // }

  switch (type) {
    case 'REGISTER_USER' :
      return {...state, tokens: action.payload}
    default:
      return state
  }
  
}

export default userReducer
