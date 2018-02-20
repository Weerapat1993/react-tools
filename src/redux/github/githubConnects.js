import { connect } from 'react-redux'
import { githubProfileActions } from './profile'

const { githubProfile, reloadGithibProfile, handleGithubProfile } = githubProfileActions

export const withProfileGithub = (WrapperComponent) => connect(
  // mapStateToProps
  state => ({
    byID: state.github.profile.byID,
    keys: state.github.profile.keys,
  }),
  // mapDispatchToProps
  {
    githubProfile, 
    reloadGithibProfile, 
    handleGithubProfile
  }
)(WrapperComponent)

export const withSearchGithub = (WrapperComponent) => connect(
  // mapStateToProps
  state => ({
    github: state.github.search,
  }),
  // mapDispatchToProps
  dispatch => ({
    
  }),
)(WrapperComponent)



