import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { githubReducer } from './github'

export const rootReducers = {
  form: formReducer,
  github: githubReducer,
}

export default combineReducers(rootReducers)
