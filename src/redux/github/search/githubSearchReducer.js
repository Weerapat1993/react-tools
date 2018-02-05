import { SEARCH_GITHUB_REPOSITORIES } from '../githubActionTypes'
import { Reducer } from '../../../utils'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: null
}

/**
 * Github Search Reducer
 * @param {initialState} state 
 * @param {{ type: string, data: [], error: string }} action 
 * @return {initialState}
 */
export const githubSearchReducer = (state = initialState, action) => {
  const reducer = new GithubSearchReducer(state, action)
  switch(action.type) {
    case SEARCH_GITHUB_REPOSITORIES.REQUEST:
      return reducer.getRequest()
    case SEARCH_GITHUB_REPOSITORIES.SUCCESS:
      return reducer.searchGithubSuccess()
    case SEARCH_GITHUB_REPOSITORIES.FAILURE:
      return reducer.getFailure()
    default:
      return state
  }
}

export class GithubSearchReducer extends Reducer {
  searchGithubSuccess() {
    return this.setState({
      isFetching: false,
      data: this.action.data,
      error: null,
    })
  }
}
