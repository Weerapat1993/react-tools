import { SEARCH_GITHUB_REPOSITORIES, CLEAR_GITHUB_REPOSITORIES } from '../githubActionTypes'
import { Reducer, classReducer } from '../../../utils'

export const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: null,
}

/** @type {initialState} */
// export const githubSearchReducer = (state = initialState, action) => {
//   const reducer = new Reducer(state, action)
//   switch(action.type) {
//     case SEARCH_GITHUB_REPOSITORIES.REQUEST:
//       return reducer.getRequest()
//     case SEARCH_GITHUB_REPOSITORIES.SUCCESS:
//       return reducer.getSuccess({ data: action.data.items })
//     case SEARCH_GITHUB_REPOSITORIES.FAILURE:
//       return reducer.getFailure()
//     case CLEAR_GITHUB_REPOSITORIES:
//       return reducer.setState({ data: [] })
//     default:
//       return state
//   }
// }

class GithubReducer extends Reducer {
  getState() {
    switch(this.action.type) {
      case SEARCH_GITHUB_REPOSITORIES.REQUEST:
        return this.getRequest()
      case SEARCH_GITHUB_REPOSITORIES.SUCCESS:
        return this.getSuccess({ data: this.action.data.items })
      case SEARCH_GITHUB_REPOSITORIES.FAILURE:
        return this.getFailure()
      case CLEAR_GITHUB_REPOSITORIES:
        return this.setState({ data: [] })
      default:
        return this.state
    }
  }
}

/** @type {initialState} */
export const githubSearchReducer = classReducer(GithubReducer, initialState)