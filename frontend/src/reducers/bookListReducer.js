export const bookListReducer = (state = {books: []}, action) => {
	switch (action.type) {
		case 'BOOK_LIST_REQUEST':
			return {loading: true}
		case 'BOOK_LIST_SUCCESS': 
			return {loading: false, books: action.payload} 
		case 'PRODUCT_LIST_FAIL': 
			return {loading: false, error: action.payload}
		default: 
			return state
	}
}
