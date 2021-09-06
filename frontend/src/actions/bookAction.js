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