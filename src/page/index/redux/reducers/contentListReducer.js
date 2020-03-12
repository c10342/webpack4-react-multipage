


import { CONTENTLIST_DATA, CHANGE_LOADING_STATUS } from '../types/contentListType'

const initState = {
    list: [],
    isLoading: false
}

const contentListReducer = (state = initState, action) => {
    switch (action.type) {
        case CONTENTLIST_DATA:
            return { ...state, list: state.list.concat(action.data),isLoading:false };
        case CHANGE_LOADING_STATUS:
            return { ...state, isLoading: action.data }
        default:
            return state
    }
}

export default contentListReducer