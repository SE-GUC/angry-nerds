import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { createStore } from 'redux'
//import rootReducer from './reducers/rootReducer'
import reducer from './reducers/countReducer'

// const initialState = 42
const middleware = [thunk]



const store = createStore(reducer)
    
const store = createStore(reducer , initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

export default store