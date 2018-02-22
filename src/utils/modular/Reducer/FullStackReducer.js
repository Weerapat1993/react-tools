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
 * @property {Array.<string>} byID
 * @property {Object.<Object>} keys 
 * 
 * @typedef {Object} Action
 * @property {string} type
 * @property {string} key
 * @property {*} data
 * @property {Error} error
 */
export class FullStackReducer {
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

 /**
   * get Request case withKey in Reducer
   * @param {StateWithKey} data
   * @return {State}
   */
  getRequestWithKey(data) {
    return this.setStateWithKey({
      ...GET_REQUEST,
      ...data,
    })
  }

  /**
   * get Success case withKey in Reducer
   * @param {StateWithKey} data
   * @return {State}
   */
  getSuccessWithKey(data) {
    const { byID } = this.state
    const { key } = this.action
    const { keys } = this.setStateWithKey({
      ...GET_SUCCESS,
      ...data,
    })
    return this.setState({
      byID: byID.filter(item => item === key).length ? byID : byID.concat([key]),
      keys,
    })
  }

  /**
   * get Success case withKey in Reducer
   * @param {StateWithKey} data
   * @return {State}
   */
  getFailureWithKey(data) {
    return this.setStateWithKey({
      ...GET_FAILURE(this.action),
      ...data,
    })
  }
}

export default FullStackReducer

