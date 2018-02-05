import axios from 'axios'
import { SEARCH_GITHUB_REPOSITORIES } from '../githubActionTypes'
import { API_ENDPOINT } from '../../../constants/endpoint'

export const fetchGithubRequest = () => ({ type: SEARCH_GITHUB_REPOSITORIES.REQUEST }) 
export const fetchGithubSuccess = (data) => ({ type: SEARCH_GITHUB_REPOSITORIES.SUCCESS, data }) 
export const fetchGithubFailure = (error) => ({ type: SEARCH_GITHUB_REPOSITORIES.FAILURE, error }) 
export const fetchGithub = (keyword) => (dispatch, getState) => {
  dispatch(fetchGithubRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT.SEARCH_GITHUB(keyword),
  })
    .then(res => dispatch(fetchGithubSuccess(res.data.items)))
    .catch(error => dispatch(fetchGithubFailure(error)))
}


