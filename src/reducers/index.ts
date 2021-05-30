import user from '././user'

import { combineReducers } from 'redux'

export interface IRootState {
    user: any
}

const rootReducer = combineReducers<IRootState>({
    user
})

export default rootReducer