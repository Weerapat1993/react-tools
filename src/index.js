import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import configureStore from './redux/store'
import { App } from './views/components'

// import registerServiceWorker from './registerServiceWorker'
import locale from 'antd/lib/locale-provider/en_US';

// StyleSheet
import 'antd/dist/antd.css'
import './views/styles/styles.css'
import 'font-awesome/css/font-awesome.min.css'

const Index = () => (
  <Provider store={configureStore()}>
    <LocaleProvider locale={locale}>
      <Router>
        <Route path='/' component={App} />
      </Router>
    </LocaleProvider>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'))
// registerServiceWorker()
