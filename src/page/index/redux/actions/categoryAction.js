import { HEAD_DATA } from '../types/categoryType'

import axios from 'axios'

export const getHeadData = () => {
    return async (dispatch) => {
        // axios({
        //     method: 'get',
        //     url: './json/head.json'
        // }).then(res=>{
        //     dispatch({
        //         type:HEAD_DATA,
        //         data:res.data.data.primary_filter
        //     })
        // })
        const result = await axios({
            method: 'get',
            url: './static/json/head.json'
        })
        dispatch({
            type: HEAD_DATA,
            data: result.data.data.primary_filter
        })
    }
}