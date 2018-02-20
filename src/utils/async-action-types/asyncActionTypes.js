import axios from 'axios'

/** 
 * @typedef {Object} AsyncActionTypes
 * @property {string} REQUEST
 * @property {string} SUCCESS
 * @property {string} FAILURE
 */

export const asyncActionType = (type) => ({
  REQUEST: type+'_REQUEST',
  SUCCESS: type+'_SUCCESS',
  FAILURE: type+'_FAILURE',
})

/**
 * Async Actions with Axios
 * @param {Object} ACTION_TYPE 
 * @param {Object} header 
 * @param {string} key 
 */
export const asyncAction = (ACTION_TYPE, header, key) => (dispatch, getState) => {
  const action = new AsyncActions(ACTION_TYPE)
  dispatch(action.request(key))
  return axios(header)
    .then(res => dispatch(action.success(res.data, key)))
    .catch(error => dispatch(action.failure(error, key)))
}

export class AsyncActions {
  /**
   * Async Actions Creator
   * @param {AsyncActionTypes} type 
   * @param {string} key
   */
  constructor(type, key) {
    this.type = type
    this.key = key
  }

  request(key) {
    return {
      type: this.type.REQUEST,
      key
    }
  }

  success(data, key) {
    return {
      type: this.type.SUCCESS,
      data,
      key,
    }
  }
  failure(error, key) {
    return {
      type: this.type.FAILURE,
      error,
      key,
    }
  }
}