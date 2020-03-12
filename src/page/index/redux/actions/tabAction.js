

import {CHANGE_TAB} from '../types/tabType'

export const changeTab = (activeKey)=>{
    return {
        type:CHANGE_TAB,
        activeKey
    }
}