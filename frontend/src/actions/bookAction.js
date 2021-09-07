import axios from 'axios'; 

// action reducer
export const listBooks = (keyword = '', pageNumber = '') => async(dispatch) => {

	try{ 
		dispatch({ type: 'BOOK_LIST_REQUEST' }); 
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






// DELETE BOOK
export const deleteBook = (id)  => async(dispatch, getState) => {
	try{ 
		dispatch({ type: 'BOOK_DELETE_REQUEST' }); 

		const {userLogin: {userInfo}} = getState()
		
		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		// delete
		const {data} = await axios.delete(`/api/books/${id}`, config);

		
		dispatch({
			type: 'BOOK_DELETE_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_DELETE_FAIL',
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}



// list book details
export const listProductDetails = (id)  => async(dispatch, getState) => {
	try{ 
		dispatch({ type: 'BOOK_DETAIL_REQUEST' }); 

		const {userLogin: {userInfo}} = getState()
		
		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		// delete
		const {data} = await axios.get(`/api/books/${id}`, config);
		console.log('data from Actions'); 
		console.log(data); 
		
		dispatch({
			type: 'BOOK_DETAIL_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_DETAIL_FAIL',
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}


// UDPATE PRODUCT
// list book details
export const updateProduct = (product)  => async(dispatch, getState) => {
	try{ 
	 	dispatch({ type: 'BOOK_UPDATE_REQUEST' });

		const {userLogin: {userInfo}} = getState()
		
		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}


		// delete
		const {data} = await axios.put(`/api/books/${product._id}`, product, config);
		
		dispatch({
			type: 'BOOK_UPDATE_SUCCESS', 
			payload: data, 
		})

	} catch (error){
		dispatch({
			type: 'BOOK_UPDATE_FAIL',
			payload: (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}
