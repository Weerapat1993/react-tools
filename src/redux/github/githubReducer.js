import { FETCH_GITHUB } from './githubActionTypes'
import { Reducer } from '../../utils'

export const initialState = {
  isFetching: false,
  data: [],
  error: null
}

/**
 * Github Reducer
 * @param {initialState} state 
 * @param {{ type: string, data: [], error: string }} action 
 * @return {initialState}
 */
export const githubReducer = (state = initialState, action) => {
  const reducer = new GithubReducer(state, action)
  switch(action.type) {
    case FETCH_GITHUB.REQUEST:
      return reducer.getRequest()
    case FETCH_GITHUB.SUCCESS:
      return reducer.searchGithubSuccess()
    case FETCH_GITHUB.FAILURE:
      return reducer.getFailure()
    default:
      return state
  }
}

export class GithubReducer extends Reducer {
  searchGithubSuccess() {
    return this.setState({
      isFetching: false,
      data: this.action.data,
      error: null,
    })
  }
}
