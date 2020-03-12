import tabReducer from './tabReducer'

import {combineReducers} from 'redux'

import categoryReducer from './categoryReducer'

import contentListReducer from './contentListReducer'

import orderReducer from './orderReducer'


const reducers = combineReducers({
    tabReducer,
    categoryReducer,
    contentListReducer,
    orderReducer
})

export default reducers