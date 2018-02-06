export const API_ENDPOINT = {
  SEARCH_GITHUB: (keywords) => `https://api.github.com/search/repositories?q=${keywords.replace(' ', '+')}&sort=stars&order=desc`,
  GITHUB_PROFILE: (name) => `https://api.github.com/users/${name}/repos`
}

/** GET https://api.github.com/search/repositories?q=keywords&sort=stars&order=desc */
export const API_ENDPOINT_SEARCH_GITHUB = (keywords) => `https://api.github.com/search/repositories?q=${keywords.replace(' ', '+')}&sort=stars&order=desc`
/** GET https://api.github.com/users/name/repos */
export const API_ENDPOINT_GITHUB_PROFILE = (name) => `https://api.github.com/users/${name}/repos`

class Endpoint {
  constructor(apiRoot) {
    this.apiRoot = apiRoot
  }

  urlGithub(path) {
    return `https://api.github.com${path}`
  }

  API(path) {
    return `${this.apiRoot}${path}`
  }

  /**
   * Search Github
   * @link https://api.github.com/search/repositories?q=keywords&sort=stars&order=desc
   * @param {string} keywords
   * @return {string}
   */
  searchGithub(keywords) {
    return this.API(`/search/repositories?q=${keywords.replace(' ', '+')}&sort=stars&order=desc`)
  }
}

export const ApiEndpoint = new Endpoint('https://api.github.com')