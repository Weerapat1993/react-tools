import { FETCH_GITHUB_PROFILE, RELOAD_GITHUB_PROFILE } from '../githubActionTypes'
import { Reducer } from '../../../utils'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: null,
  byID: [],
  keys: {},
}

/**
 * Github Profile Reducer
 * @param {initialState} state 
 * @param {{ type: string, data: [], key: string, error: Error }} action 
 * @return {initialState}
 */
export const githubProfileReducer = (state = initialState, action) => {
  const reducer = new Reducer(state, action)
  switch(action.type) {
    case FETCH_GITHUB_PROFILE.REQUEST:
      return reducer.getRequestWithKey()
    case FETCH_GITHUB_PROFILE.SUCCESS:
      return reducer.getSuccessWithKey({ data: action.data })
    case FETCH_GITHUB_PROFILE.FAILURE:
      return reducer.getFailureWithKey()
    case RELOAD_GITHUB_PROFILE:
      return reducer.setStateWithKey({ isReload: true })
    default:
      return state
  }
}