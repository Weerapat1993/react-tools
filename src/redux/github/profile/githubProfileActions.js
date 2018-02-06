import axios from 'axios'
import { FETCH_GITHUB_PROFILE } from '../githubActionTypes'
import { API_ENDPOINT_GITHUB_PROFILE } from '../../../constants/endpoint'

export const githubProfileRequest = (key) => ({ type: FETCH_GITHUB_PROFILE.REQUEST, key }) 
export const githubProfileSuccess = (key, data) => ({ type: FETCH_GITHUB_PROFILE.SUCCESS, data, key }) 
export const githubProfileFailure = (key, error) => ({ type: FETCH_GITHUB_PROFILE.FAILURE, error, key }) 
export const githubProfile = (name) => (dispatch, getState) => {
  dispatch(githubProfileRequest(name))
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_GITHUB_PROFILE(name),
  })
    .then(res => dispatch(githubProfileSuccess(name, res.data)))
    .catch(error => dispatch(githubProfileFailure(name, error)))
}