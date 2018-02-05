export const API_ENDPOINT = {
  SEARCH_GITHUB: (keywords) => `https://api.github.com/search/repositories?q=${keywords.replace(' ', '+')}&sort=stars&order=desc`,
  GITHUB_PROFILE: (name) => `https://api.github.com/users/${name}/repos`
}