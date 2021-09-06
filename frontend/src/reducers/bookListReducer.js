export const bookListReducer = (state = {books: []}, action) => {
	switch (action.type) {
		case 'BOOK_LIST_REQUEST':
			return {loading: true}
		case 'BOOK_LIST_SUCCESS': 
			// pages and page are for pagination
			console.log('books')
			console.log(action.payload); 
			return {loading: false, books: action.payload.books, pages: action.payload.pages, page: action.payload.page} 
		case 'PRODUCT_LIST_FAIL': 
			return {loading: false, error: action.payload}
		default: 
			return state
	}
}
