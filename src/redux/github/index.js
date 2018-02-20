import { combineReducers } from 'redux'
import { githubProfileActions, githubProfileReducer } from './profile'
import { githubSearchActions, githubSearchReducer } from './search'

// const githubProfileReducerInitalState = githubProfileReducer()
// const githubSearchReducerInitalState = githubSearchReducer()
  
/**
 * @typedef {Object} GithubReducer
 * @property {githubProfileReducerInitalState} profile
 * @property {githubSearchReducerInitalState} search
 */

/** @type {GithubReducer} */
const githubReducer = combineReducers({
  profile: githubProfileReducer,
  search: githubSearchReducer,
})

export {
  githubProfileActions,
  githubSearchActions,
  githubReducer,
}

export * from './githubConnects'
