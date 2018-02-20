import { combineReducers } from 'redux'
import { githubProfileActions, githubProfileReducer, githubProfileState } from './profile'
import { githubSearchActions, githubSearchReducer, githubSearchState } from './search'
  
/**
 * @typedef {Object} GithubReducer
 * @property {githubProfileState} profile
 * @property {githubSearchState} search
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

export * from './githubConnector'
