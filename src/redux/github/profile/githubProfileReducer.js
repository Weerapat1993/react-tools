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
  const reducerKeys = new Reducer(state.keys, action)
  switch(action.type) {
    case FETCH_GITHUB_PROFILE.REQUEST:
      return reducer.setState({
        keys: reducerKeys.setStateWithKey(action.key, {
          isFetching: true,
          isReload: false,
          error: null,
          data: [],
        })
      })
      // return reducer.getRequest()
    case FETCH_GITHUB_PROFILE.SUCCESS:
      return reducer.setState({
        byID: state.byID.filter(item => item === action.key).length ? state.byID.concat([action.key]) : state.byID,
        keys: reducerKeys.setStateWithKey(action.key, {
          isFetching: false,
          error: null,
          data: action.data
        })
      })
      // return reducer.getSuccess({ data: action.data })
    case FETCH_GITHUB_PROFILE.FAILURE:
    return reducer.setState({
      keys: reducerKeys.setStateWithKey(action.key, {
        isFetching: false,
        error: action.error.response.data.message,
      })
    })
    // return reducer.getFailure()
    case RELOAD_GITHUB_PROFILE:
    return reducer.setState({
      keys: reducerKeys.setStateWithKey(action.key, {
        isReload: true,
      })
    })
    default:
      return state
  }
}