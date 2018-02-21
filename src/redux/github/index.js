import { combineReducers } from 'redux'
import { githubProfileActions, githubProfileReducer } from './profile'
import { githubSearchActions, githubSearchReducer } from './search'
  
/**
 * @typedef {Object} GithubReducer
 * @property {githubProfileReducer} profile
 * @property {githubSearchReducer} search
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
