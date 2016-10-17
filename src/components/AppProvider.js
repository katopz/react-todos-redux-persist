import React from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from '../reducers'

import { persistStore, autoRehydrate } from 'redux-persist'

const store = compose(autoRehydrate())(createStore)(reducer)

export default class AppProvider extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
