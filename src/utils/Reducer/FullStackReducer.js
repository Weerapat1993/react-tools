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
    this.key = action.key
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
   * @param {State} newState
   * @return {State}
   */
  setStateWithKey(newState) {
    return {
      ...this.state,
      keys: {
        ...this.state.keys,
        [this.key]: {
          ...this.state.keys[this.key],
          ...newState
        }
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
   * @return {State}
   */
  getRequestWithKey() {
    return this.setStateWithKey(GET_REQUEST)
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
   * @param {State} data
   * @return {State}
   */
  getSuccessWithKey(data) {
    const { keys } = this.setStateWithKey({
      ...GET_SUCCESS,
      ...data,
    })
    return this.setState({
      byID: this.addByID(),
      keys,
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
   * @return {State}
   */
  getFailureWithKey() {
    return this.setStateWithKey(GET_FAILURE(this.action))
  }

  /**
   * Add Key By ID
   * @return {Array.<string>}
   */
  addByID() {
    const { byID } = this.state
    const { key } = this.action
    return byID.filter(item => item === key).length ? byID : byID.concat([key])
  }
}

export default Reducer

