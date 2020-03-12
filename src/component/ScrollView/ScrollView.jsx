
import './ScrollView.scss'

import React from 'react'

class ScrollView extends React.Component{
    constructor(props) {
        super(props)

        this.onScroll = this.onScroll.bind(this)
    }

    render(){
        return (
            <div className='scroll-view'>
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll() {
        if (this.props.isEnd) {
            return
        }
        // 视窗高度
        const clientHeight = document.documentElement.clientHeight
        // 页面高度
        const scrollHeight = document.body.scrollHeight
        // 滚动的高度
        const scrollTop = document.documentElement.scrollTop
        const offsetY = 30

        if ((clientHeight + scrollTop + offsetY) >= scrollHeight) {
            this.props.scrollCallback && this.props.scrollCallback()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }
}

export default ScrollView