import { ORDER_DATA,CHANGE_LOADING_STATUS } from '../types/orderType'

import axios from 'axios'

export const getOrderData = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: './static/json/orders.json'
        }).then(res=>{
            dispatch({
                type:ORDER_DATA,
                data:res.data.data.digestlist
            })
        })
    }
}

export const changeLoadingStatus = (status)=>{
    return {
        type:CHANGE_LOADING_STATUS,
        data:status
    }
}