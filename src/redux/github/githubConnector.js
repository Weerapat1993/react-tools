import { connect } from 'react-redux'
import { store } from '../../utils'
import { githubProfileActions } from './profile'

const { githubProfile, reloadGithibProfile, handleGithubProfile } = githubProfileActions

export const withProfileGithub = (WrapperComponent) => connect(
  // mapStateToProps
  state => ({
    byID: store(state).github.profile.byID,
    keys: store(state).github.profile.keys,
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
    github: store(state).github.search,
  }),
  // mapDispatchToProps
  dispatch => ({
    
  }),
)(WrapperComponent)



