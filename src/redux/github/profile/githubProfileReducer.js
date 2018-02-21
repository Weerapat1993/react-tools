import { FETCH_GITHUB_PROFILE, RELOAD_GITHUB_PROFILE } from '../githubActionTypes'
import { NormalizeReducer } from '../../../utils'

export const initialState = {
  byID: [],
  keys: {},
}

/** @type {initialState} */
export const githubProfileReducer = (state = initialState, action) => {
  const reducer = new NormalizeReducer(state, action)
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