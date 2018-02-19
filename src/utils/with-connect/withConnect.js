import React from 'react'
import { connect } from 'react-redux'
import { rootReducers } from '../../redux/rootReducers'

/**
 * High-Order Component connect With React-Redux
 * @param {(state: rootReducers) => rootReducers} mapStateToProps 
 * @param {(dispatch: Function) => any} mapDispatchToProps 
 * @param {*} WrapperComponent
 */
export const withConnect = (mapStateToProps, mapDispatchToProps, WrapperComponent) => {
  const HOC = (props) => (
    <WrapperComponent {...props} />
  )
  return connect(mapStateToProps, mapDispatchToProps)(HOC)
}