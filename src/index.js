import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routes from './views/routes'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

// StyleSheet
// import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
// import './views/styles/styles.css'
import 'font-awesome/css/font-awesome.min.css'

const App = () => (
  <Provider store={configureStore()}>
    <Routes />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
