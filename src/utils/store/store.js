/**
 * @typedef {Object} DefaiultReducer
 * @property {boolean} isFetching
 * @property {boolean} isReload
 * @property {Error} error
 * @property {Array|Object} data 
 * 
 * @typedef {Object} InitalStore
 * @property {DefaiultReducer} github 
 * 
 * Store in Reducer
 * @param {InitalStore} state
 * @return {InitalStore}
 */
export const store = (state) => state