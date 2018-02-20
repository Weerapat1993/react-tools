import _ from 'lodash'

// Config
const GET_REQUEST = {
  isFetching: true,
  error: '',
  isReload: false
}

const GET_SUCCESS = {
  isFetching: false,
  error: '',
}

const GET_FAILURE = (action) => ({
  isFetching: false,
  error: _.get(action.error, 'response.data.message') || action.error.message
})

/**
 * Reducer Class
 * @example
 * ```js
 * const reducer = new Reducer(state, action)
 * ```
 * @typedef {Object} State
 * @property {boolean} isFetching
 * @property {boolean} isReload
 * @property {string} error
 * @property {*} data
 * 
 * @typedef {Object} Action
 * @property {string} type
 * @property {*} data
 * @property {Error} error
 */
export class Reducer {
  /**
   * Reducer Constructor
   * @param {State} state 
   * @param {Action} action 
   */
  constructor(state, action) {
    this.state = state
    this.action = action
  }

  /**
   * Set state in Reducer
   * @param {State} newState
   * @return {State}
   */
  setState(newState) {
    return {
      ...this.state,
      ...newState,
    }
  }

  /**
   * get Request case in Reducer
   * @param {State} data
   * @return {State}
   */
  getRequest(data) {
    return this.setState({
      ...GET_REQUEST,
      ...data,
    })
  }

  /**
   * get Success case in Reducer
   * @param {State} data
   * @return {State} 
   */
  getSuccess(data) {
    return this.setState({
      ...GET_SUCCESS,
      ...data,
    })
  }

  /**
   * get Failure case in Reducer
   * @param {State} data
   * @return {State}
   */
  getFailure(data) {
    return this.setState({
      ...GET_FAILURE(this.action),
      ...data,
    })
  }
}

export default Reducer

