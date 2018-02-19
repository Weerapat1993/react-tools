import { withConnect } from '../../utils';
import { githubProfileActions } from './profile'

const { githubProfile, reloadGithibProfile, handleGithubProfile } = githubProfileActions

export const withProfileGithub = (WrapperComponent) => withConnect(
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
  },
  // Component
  WrapperComponent
)

export const withSearchGithub = (WrapperComponent) => withConnect(
  // mapStateToProps
  state => ({
    github: state.github.search,
  }),
  // mapDispatchToProps
  dispatch => ({
    
  }),
  // Component
  WrapperComponent
)



