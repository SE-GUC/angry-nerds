import { combineReducers } from 'redux'
import reducer from './countReducer'


 const rootReducer =  combineReducers({
    count: reducer.count  
})


export default rootReducer