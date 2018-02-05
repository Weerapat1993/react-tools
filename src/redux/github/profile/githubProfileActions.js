import axios from 'axios'
import { FETCH_GITHUB_PROFILE } from '../githubActionTypes'
import { API_ENDPOINT } from '../../../constants/endpoint'

export const githubProfileRequest = () => ({ type: FETCH_GITHUB_PROFILE.REQUEST }) 
export const githubProfileSuccess = (data) => ({ type: FETCH_GITHUB_PROFILE.SUCCESS, data }) 
export const githubProfileFailure = (error) => ({ type: FETCH_GITHUB_PROFILE.FAILURE, error }) 
export const githubProfile = (name) => (dispatch, getState) => {
  dispatch(githubProfileRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT.GITHUB_PROFILE(name),
  })
    .then(res => dispatch(githubProfileSuccess(res.data)))
    .catch(error => dispatch(githubProfileFailure(error)))
}