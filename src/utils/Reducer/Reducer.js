import _ from 'lodash'

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
    return this.setState({
      isFetching: true,
      error: '',
      isReload: false
    })
  }

  /**
   * get Success case in Reducer
   * @param {State} data
   * @return {State} 
   */
  getSuccess(data) {
    return this.setState({
      isFetching: false,
      error: '',
      ...data,
    })
  }

  /**
   * get Failure case in Reducer
   * @return {State}
   */
  getFailure() {
    return this.setState({
      isFetching: false,
      error: _.get(this.action.error, 'response.data.message') || this.action.error.message
    })
  }
}

export default Reducer

