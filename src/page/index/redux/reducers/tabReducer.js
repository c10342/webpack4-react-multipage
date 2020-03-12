
import {CHANGE_TAB} from '../types/tabType'

import config from '../../config'

const {TabKey} = config

const initState = {
    tabs:[
        {name:'首页',key:TabKey.home},
        {name:'订单',key:TabKey.order},
        {name:'我的',key:TabKey.my}
    ],
    activeKey:TabKey.home
}

const tabReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return {...state,activeKey:action.activeKey};
        default:
            return state
    }
}

export default tabReducer