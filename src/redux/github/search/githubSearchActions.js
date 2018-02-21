import axios from 'axios'
import { SEARCH_GITHUB_REPOSITORIES, CLEAR_GITHUB_REPOSITORIES } from '../githubActionTypes'
import { API_ENDPOINT_SEARCH_GITHUB } from '../../../constants/endpoint'
import { AsyncActions } from '../../../utils'

// export const fetchGithubRequest = () => ({ type: SEARCH_GITHUB_REPOSITORIES.REQUEST }) 
// export const fetchGithubSuccess = (data) => ({ type: SEARCH_GITHUB_REPOSITORIES.SUCCESS, data }) 
// export const fetchGithubFailure = (error) => ({ type: SEARCH_GITHUB_REPOSITORIES.FAILURE, error }) 
// export const fetchGithub = (keyword) => (dispatch, getState) => {
//   dispatch(fetchGithubRequest())
//   return axios({
//     method: 'GET',
//     responseType: 'json',
//     url: API_ENDPOINT_SEARCH_GITHUB(keyword),
//   })
//     .then(res => dispatch(fetchGithubSuccess(res.data)))
//     .catch(error => dispatch(fetchGithubFailure(error)))
// }

export const fetchGithub = (keyword) => (dispatch, getState) => {
  const action = new AsyncActions(SEARCH_GITHUB_REPOSITORIES)
  dispatch(action.request())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_SEARCH_GITHUB(keyword),
  })
    .then(res => dispatch(action.success(res.data)))
    .catch(error => dispatch(action.failure(error)))
}

// export const fetchGithub = (keyword) => (
//   asyncAction(SEARCH_GITHUB_REPOSITORIES, {
//     method: 'GET',
//     responseType: 'json',
//     url: API_ENDPOINT_SEARCH_GITHUB(keyword),
//   })
// )

export const clearGithubRepositories = () => ({ type: CLEAR_GITHUB_REPOSITORIES })
