import "core-js/stable";
import "regenerator-runtime/runtime";

import {hot} from 'react-hot-loader'

import React from 'react'

import ReactDOM from 'react-dom'

import {HashRouter} from 'react-router-dom'

import { Provider } from 'react-redux'

import store from './redux/store'

import Main from './container/Main/Main.jsx'

import { initRem } from '../../public/js/htmlFontSize'

import '../../public/css/reset.css'
import '../../public/css/common.css'

initRem()


const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Main></Main>
            </HashRouter>
        </Provider>
    )
}

const HotApp = hot(module)(App)


ReactDOM.render(
    <HotApp/>,
    document.getElementById('root')
)