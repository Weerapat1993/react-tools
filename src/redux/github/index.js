import { combineReducers } from 'redux'
import { githubProfileActions, githubProfileReducer } from './profile'
import { githubSearchActions, githubSearchReducer } from './search'

const githubReducer = combineReducers({
  profile: githubProfileReducer,
  search: githubSearchReducer,
})

export {
  githubProfileActions,
  githubSearchActions,
  githubReducer,
}
