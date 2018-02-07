import axios from 'axios'
import { FETCH_GITHUB_PROFILE, RELOAD_GITHUB_PROFILE } from '../githubActionTypes'
import { API_ENDPOINT_GITHUB_PROFILE } from '../../../constants/endpoint'
import { AsyncActions } from '../../../utils/async-action-types/asyncActionTypes';

export const githubProfile = (key) => (dispatch, getState) => {
  const action = new AsyncActions(FETCH_GITHUB_PROFILE)
  dispatch(action.request(key))
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_GITHUB_PROFILE(key),
  })
    .then(res => dispatch(action.success(res.data, key)))
    .catch(error => dispatch(action.failure(error, key)))
}

// export const githubProfileRequest = (key) => ({ type: FETCH_GITHUB_PROFILE.REQUEST, key }) 
// export const githubProfileSuccess = (key, data) => ({ type: FETCH_GITHUB_PROFILE.SUCCESS, data, key }) 
// export const githubProfileFailure = (key, error) => ({ type: FETCH_GITHUB_PROFILE.FAILURE, error, key }) 
// export const githubProfile = (key) => (dispatch, getState) => {
//   dispatch(githubProfileRequest(key))
//   return axios({
//     method: 'GET',
//     responseType: 'json',
//     url: API_ENDPOINT_GITHUB_PROFILE(key),
//   })
//     .then(res => dispatch(githubProfileSuccess(key, res.data)))
//     .catch(error => dispatch(githubProfileFailure(key, error)))
// }

export const reloadGithibProfile = (key) => ({ type: RELOAD_GITHUB_PROFILE, key })

export const handleGithubProfile = (key) => async (dispatch, getState) => {
  await dispatch(reloadGithibProfile(key))
  await dispatch(githubProfile(key))
} 