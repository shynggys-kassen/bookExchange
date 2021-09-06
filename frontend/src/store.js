import {createStore, combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'
import {bookListReducer} from './reducers/bookListReducer.js';
import {userLoginReducer} from './reducers/userReducer'; 


const reducer = combineReducers({
	bookList: bookListReducer, 
	userLogin: userLoginReducer, 
})

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware)); 
export default store;