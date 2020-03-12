


import './ContentList.scss'

import React from 'react'

import { connect } from 'react-redux'

import { getContentListData, changeLoadingStatus } from '../../../redux/actions/contentListAction'

import ListItem from '../../../comp/LIstItem/LIstItem.jsx'

import Loading from '@/component/Loading/Loading'

import ScrollView from '@/component/ScrollView/ScrollView'

class ContentList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isEnd: false
        }
        this.page = 1

        this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
        this.props.changeLoadingStatus(true)
        this.props.getContentListData()
    }

    render() {
        return (
            <div className="list-content">
                <h4 className="list-title">
                    <span className="title-line"></span>
                    <span>附近商家</span>
                    <span className="title-line"></span>
                </h4>
                <ScrollView isEnd={this.state.isEnd} scrollCallback={this.onScroll}>
                    {this.renderItems()}
                </ScrollView>
                <Loading isend={this.state.isEnd} />
            </div>
        );
    }

    renderItems() {
        let list = this.props.list;
        return list.map((item, index) => {
            return <ListItem key={index} itemData={item}></ListItem>
        });
    }

    onScroll() {
        if (!this.props.isLoading) {
            this.props.changeLoadingStatus(true)
            this.props.getContentListData()
            this.page++
            if (this.page > 3) {
                this.setState({
                    isEnd: true
                })
            }
        }
    }
}


const mapStateToProps = state => {
    return {
        list: state.contentListReducer.list,
        isLoading: state.contentListReducer.isLoading
    }
}

const createActions = { getContentListData, changeLoadingStatus }

export default connect(mapStateToProps, createActions)(ContentList)