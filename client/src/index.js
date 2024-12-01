import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/app'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
