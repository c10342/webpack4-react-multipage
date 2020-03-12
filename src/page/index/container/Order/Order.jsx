import './Order.scss';
import React from 'react';

import { connect } from 'react-redux';

import { getOrderData, changeLoadingStatus } from '../../redux/actions/orderAction';

import ScrollView from '@/component/ScrollView/ScrollView.jsx';

import Loading from '@/component/Loading/Loading.jsx';


import ListItem from './ListItem/ListItem';


/**
 * @constructor <Order />
 * @description 订单tab代码
 */

class Order extends React.Component {
    constructor(props) {
        super(props);

        // 标示分页
        this.page = 1;


        // 是否还可以滚动加载
        this.state = {
            isEnd: false
        };

        this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
        this.props.changeLoadingStatus(true)
        this.props.getOrderData()
    }

    onScroll() {
        if (!this.props.isLoading) {
            this.props.changeLoadingStatus(true)
            this.props.getOrderData()
            this.page++
            if (this.page > 3) {
                this.setState({
                    isEnd: true
                })
            }
        }
    }

    fetchData(page) {
        this.props.dispatch(getOrderData(page));
    }
    renderList() {
        let list = this.props.list;

        return list.map((item, index) => {
            return <ListItem itemData={item} key={index}></ListItem>
        });
    }
    render() {
        return (
            <div className="order-container">
                <div className="header">订单</div>
                <ScrollView scrollCallback={this.onScroll} isEnd={this.state.isEnd}>
                    <div className="order-list">{this.renderList()}</div>
                </ScrollView>
                <Loading isend={this.state.isEnd} />
            </div>
        );
    }
}
export default connect(
    state => ({
        list: state.orderReducer.list
    }),
    {
        getOrderData,
        changeLoadingStatus
    }
)(Order);