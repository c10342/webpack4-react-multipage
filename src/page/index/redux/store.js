

import { createStore,applyMiddleware,compose } from 'redux'

import thunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

if (module.hot) {
    module.hot.accept('./reducers/index.js', () => {
        const nextRootReducer = require('./reducers/index.js').default;
        store.replaceReducer(nextRootReducer)
    });
}

export default store