import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import {createStore} from 'redux'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
//import store from './globalState/store'
import { Provider }from'react-redux'
import reducer from './globalState/reducers/countReducer'
import './index.css';
import App from './App';
import rootReducer from './globalState/reducers/rootReducer';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "mdbreact/dist/css/mdb.css";

//import * as serviceWorker from './serviceWorker';

//const initialState = 0

const store = createStore(reducer)

// const store = createStore(rootReducer, initialState)



 

ReactDOM.render(
    <Provider store = {store}>
    <App />
    </Provider>,

 document.getElementById('root'));

//Enable CORS on the express server


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
