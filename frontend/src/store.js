import {createStore, combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'
import {bookListReducer} from './reducers/bookListReducer.js';

const reducer = combineReducers({
	bookList: bookListReducer, 
})

const initialState = {}
const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware)); 
export default store;