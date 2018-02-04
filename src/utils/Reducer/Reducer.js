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
   * @return {this.state}
   */
  setState(newState) {
    return {
      ...this.state,
      ...newState,
    }
  }

  getRequest() {
    return {
      ...this.state,
      isFetching: true,
      error: '',
      isReload: false
    }
  }

  getFailure() {
    return {
      ...this.state,
      isFetching: false,
      error: this.action.error.message
    }
  }
}

export default Reducer