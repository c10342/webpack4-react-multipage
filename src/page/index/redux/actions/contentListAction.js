import { CONTENTLIST_DATA ,CHANGE_LOADING_STATUS} from '../types/contentListType'

import axios from 'axios'

export const getContentListData = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: './static/json/homelist.json'
        }).then(res=>{
            dispatch({
                type:CONTENTLIST_DATA,
                data:res.data.data.poilist
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