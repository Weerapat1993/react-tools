import axios from 'axios'
import { FETCH_GITHUB } from './githubActionTypes'
import { API_ENDPOINT_SEARCH_GITHUB } from '../../constants/ednpoint'

export const fetchGithubRequest = () => ({ type: FETCH_GITHUB.REQUEST }) 
export const fetchGithubSuccess = (data) => ({ type: FETCH_GITHUB.SUCCESS, data }) 
export const fetchGithubFailure = (error) => ({ type: FETCH_GITHUB.FAILURE, error }) 
export const fetchGithub = (keyword) => (dispatch, getState) => {
  dispatch(fetchGithubRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_SEARCH_GITHUB(keyword),
  })
    .then(res => dispatch(fetchGithubSuccess(res.data.items)))
    .catch(error => dispatch(fetchGithubFailure(error)))
}
