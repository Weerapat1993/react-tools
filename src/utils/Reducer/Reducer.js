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
 * @typedef {Array.<Object>|Object} Data
 * 
 * @typedef {Object} State
 * @property {boolean} isFetching
 * @property {boolean} isReload
 * @property {string} error
 * @property {Data} data
 * @property {Array.<string>} byID
 * @property {Object.<Object>} keys 
 * 
 * @typedef {Object} Action
 * @property {string} type
 * @property {string} key
 * @property {Data} data
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
   * Set state withKey in Reducer
   * @param {string} key
   * @param {State} newState
   * @return {State}
   */
  setStateWithKey(key, newState) {
    return {
      ...this.state,
      [key]: {
        ...this.state[key],
        ...newState
      }
    }
  }

  /**
   * get Request case in Reducer
   * @return {State}
   */
  getRequest() {
    return this.setState(GET_REQUEST)
  }

  /**
   * get Request case withKey in Reducer
   * @param {string} key
   * @return {State}
   */
  getRequestWithKey(key) {
    return this.setStateWithKey(key, GET_REQUEST)
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
   * get Success case withKey in Reducer
   * @param {string} key
   * @param {State} data
   * @return {State}
   */
  getSuccessWithKey(key, data) {
    return this.setStateWithKey(key, {
      ...GET_SUCCESS,
      ...data,
    })
  }

  /**
   * get Failure case in Reducer
   * @return {State}
   */
  getFailure() {
    return this.setState(GET_FAILURE(this.action))
  }

  /**
   * get Success case withKey in Reducer
   * @param {string} key
   * @return {State}
   */
  getFailureWithKey(key) {
    return this.setStateWithKey(key, GET_FAILURE(this.action))
  }
}

export default Reducer

