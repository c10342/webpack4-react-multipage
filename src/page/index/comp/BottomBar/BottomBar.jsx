import './BottomBar.scss'

import React from 'react'

import {withRouter,NavLink} from 'react-router-dom'

import {connect} from 'react-redux'

import {changeTab} from '../../redux/actions/tabAction'

class BottomBar extends React.Component{
    render(){
        return (
            <div className='bottom-bar'>
                {this.renderItems()}
            </div>
        )
    }

    renderItems(){
        const tabs = this.props.tabs

        return tabs.map((tab,index)=>{
            const key = tab.key
            const name = tab.name
            let cls = `${key} tab-item`

            return (
                <NavLink to={'/'+key} activeClassName="active" key={index} className={cls} onClick={()=>this.clickTab(key)}>
                    <div className='tab-icon'></div>
                    <div className='tab-name'>{name}</div>
                </NavLink>
            )
        })
    }

    clickTab(key){
        this.props.changeTab(key)
    }
}

const mapStateToProps = state=>{
    return {
        tabs:state.tabReducer.tabs,
        activeKey:state.tabReducer.activeKey,
    }
}

const createActions = {changeTab}

export default withRouter(connect(mapStateToProps,createActions)(BottomBar))