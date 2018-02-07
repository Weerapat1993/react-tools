import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd';
import Routes from './views/routes'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'
import locale from 'antd/lib/locale-provider/en_US';

// StyleSheet
// import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
// import './views/styles/styles.css'
import 'font-awesome/css/font-awesome.min.css'

const App = () => (
  <Provider store={configureStore()}>
    <LocaleProvider locale={locale}>
      <Routes />
    </LocaleProvider>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
