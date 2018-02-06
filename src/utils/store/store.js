/**
 * @typedef {Object} DefaiultReducer
 * @property {boolean} isFetching
 * @property {boolean} isReload
 * @property {Error} error
 * @property {Array|Object} data
 * @property {Array.<string>} byID
 * @property {Object.<Object>} keys 
 * 
 * @typedef {Object} Github
 * @property {DefaiultReducer} search
 * @property {DefaiultReducer} profile
 * 
 * @typedef {Object} InitalStore
 * @property {Github} github 
 * 
 * Store in Reducer
 * @param {InitalStore} state
 * @return {InitalStore}
 */
export const store = (state) => state