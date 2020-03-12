
import React from 'react'

import Loadable from 'react-loadable';

import { connect } from 'react-redux'

import { Switch, Route,Redirect } from 'react-router-dom'

import BottomBar from '../../comp/BottomBar/BottomBar.jsx'

// import Home from '../Home/Home.jsx'

// import Order from '../Order/Order.jsx'

// import My from '../My/My.jsx'

import config from '../../config'

function Loading() {
    return (
        <div>加载中...</div>
    )
}

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'../Home/Home.jsx'),
    loading: Loading,
});

const Order = Loadable({
    loader: () => import(/* webpackChunkName: "order" */'../Order/Order.jsx'),
    loading: Loading,
});

const My = Loadable({
    loader: () => import(/* webpackChunkName: "my" */'../My/My.jsx'),
    loading: Loading,
});


class Main extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Redirect exact from='/' to={`/${config.TabKey.home}`} />
                    <Route exact path={`/${config.TabKey.home}`} component={Home} />
                    <Route exact path={`/${config.TabKey.order}`} component={Order} />
                    <Route exact path={`/${config.TabKey.my}`} component={My} />
                </Switch>
                <BottomBar />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const createActions = {

}

export default connect(mapStateToProps, createActions)(Main)