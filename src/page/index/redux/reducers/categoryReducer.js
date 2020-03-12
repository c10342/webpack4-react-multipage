


import {HEAD_DATA} from '../types/categoryType'

const initState = {
    items:[]
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case HEAD_DATA:
            return {...state,items:action.data};
        default:
            return state
    }
}

export default categoryReducer