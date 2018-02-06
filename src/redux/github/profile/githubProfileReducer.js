import { FETCH_GITHUB_PROFILE } from '../githubActionTypes'
import { Reducer } from '../../../utils'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: null
}

/**
 * Github Profile Reducer
 * @param {initialState} state 
 * @param {{ type: string, data: [], error: string }} action 
 * @return {initialState}
 */
export const githubProfileReducer = (state = initialState, action) => {
  const reducer = new Reducer(state, action)
  switch(action.type) {
    case FETCH_GITHUB_PROFILE.REQUEST:
      return reducer.getRequest()
    case FETCH_GITHUB_PROFILE.SUCCESS:
      return reducer.getSuccess({ data: action.data })
    case FETCH_GITHUB_PROFILE.FAILURE:
      return reducer.getFailure()
    default:
      return state
  }
}
