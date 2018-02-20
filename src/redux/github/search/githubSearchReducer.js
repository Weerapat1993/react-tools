import { SEARCH_GITHUB_REPOSITORIES, CLEAR_GITHUB_REPOSITORIES } from '../githubActionTypes'
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
 * @param {{ type: string, data: any, error: string }} action 
 * @return {initialState}
 */
export const githubSearchReducer = (state = initialState, action) => {
  const reducer = new Reducer(state, action)
  switch(action.type) {
    case SEARCH_GITHUB_REPOSITORIES.REQUEST:
      return reducer.getRequest()
    case SEARCH_GITHUB_REPOSITORIES.SUCCESS:
      return reducer.getSuccess({ data: action.data.items })
    case SEARCH_GITHUB_REPOSITORIES.FAILURE:
      return reducer.getFailure()
    case CLEAR_GITHUB_REPOSITORIES:
      return reducer.setState({ data: [] })
    default:
      return state
  }
}