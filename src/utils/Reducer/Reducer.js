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
   * @param {Object} newState
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
      error: this.action.error.message
    })
  }
}

export default Reducer