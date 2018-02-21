import { githubSearchReducer, initialState } from './githubSearchReducer'
import { SEARCH_GITHUB_REPOSITORIES } from '../githubActionTypes'

describe('Test', () => {
  it ('Test', () => {
    const action = { type: SEARCH_GITHUB_REPOSITORIES.REQUEST }
    const recieved = githubSearchReducer(initialState, action)
    const expected = initialState
    expect(recieved).toEqual(expected)
  });
})