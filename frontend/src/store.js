import {createStore, combineReducers, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'
import {bookListReducer, bookReviewCreateReducer} from './reducers/bookListReducer.js';
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, bookCreateCreateReducer} from './reducers/userReducer'; 

const reducer = combineReducers({
	bookList: bookListReducer, 
	bookReviewCreate: bookReviewCreateReducer,  // create review
	userLogin: userLoginReducer, 
	userRegister: userRegisterReducer, 
	userDetails: userDetailsReducer, 
	userUpdateProfile: userUpdateReducer, 
	bookCreate:	bookCreateCreateReducer,
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