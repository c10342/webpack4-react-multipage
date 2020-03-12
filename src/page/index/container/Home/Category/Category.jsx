
import './Category.scss'

import React from 'react'

import {connect} from 'react-redux'

import {getHeadData} from '../../../redux/actions/categoryAction'


class Category extends React.Component{

    componentDidMount(){
        this.props.getHeadData()
    }

    render(){
        return (
            <div className="category-content clearfix">
                {this.renderItems()}
            </div>
        );
    }

    renderItems(){
        let items = this.props.items;
        
        // 复制数组防止引用
        let _items = JSON.parse(JSON.stringify(items));
        
        return _items.splice(0,8).map((item, index)=>{
            return (
                <div key={index} className="category-item">
                    <img className="item-icon" src={item.url} />
                    <p className="item-name">{item.name}</p>
                </div>
            )
        });
    }
}


const mapStateToProps = state =>{
    return {
        items:state.categoryReducer.items
    }
}

const createActions = {
    getHeadData
}

export default connect(mapStateToProps,createActions)(Category)