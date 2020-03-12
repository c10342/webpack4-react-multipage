


import { ORDER_DATA, CHANGE_LOADING_STATUS } from '../types/orderType'

const initState = {
    list: [],
    isLoading: false
}

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case ORDER_DATA:
            return { ...state, list: state.list.concat(action.data),isLoading:false };
        case CHANGE_LOADING_STATUS:
            return { ...state, isLoading: action.data }
        default:
            return state
    }
}

export default orderReducer