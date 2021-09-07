import axios from 'axios'; 

// action reducer
export const listBooks = (keyword = '', pageNumber = '') => async(dispatch) => {

	try{ 
		dispatch({ type: 'BOOK_LIST_REQUEST' }); 
		console.log(`pageNumeber ${pageNumber}`); 
		const {data} = await axios.get(`/api/books?keyword=${keyword}&pageNumber=${pageNumber}`);
		
		dispatch({
			type: 'BOOK_LIST_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_LIST_FAIL', 
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}



export const createBookReview = (productID, review)  => async(dispatch, getState) => {
	try{ 
		dispatch({ type: 'BOOK_CREATE_REVIEW_REQUEST' }); 

		const {userLogin: {userInfo}} = getState()
		
		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		// review is object with {rate: rate, comment: comment} 
		const {data} = await axios.post(`/api/books/${productID}/reviews`, review, config);

		
		dispatch({
			type: 'BOOK_CREATE_REVIEW_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_CREATE_REVIEW_FAIL', 
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}


// BOOK CREATE
export const createBook = ()  => async(dispatch, getState) => {
	try{ 
		dispatch({ type: 'BOOK_CREATE_REQUEST' }); 

		const {userLogin: {userInfo}} = getState()
		
		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		// review is object with {rate: rate, comment: comment} 
		const {data} = await axios.post(`/api/books/`, {}, config);

		
		dispatch({
			type: 'BOOK_CREATE_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_CREATE_FAIL',
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}
