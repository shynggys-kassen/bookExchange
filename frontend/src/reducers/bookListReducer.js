export const bookListReducer = (state = {books: []}, action) => {
	switch (action.type) {
		case 'BOOK_LIST_REQUEST':
			return {loading: true}
		case 'BOOK_LIST_SUCCESS': 
			// pages and page are for pagination
			console.log('books')
			console.log(action.payload); 
			return {loading: false, books: action.payload.books, pages: action.payload.pages, page: action.payload.page} 
		case 'BOOK_LIST_FAIL': 
			return {loading: false, error: action.payload}
		default: 
			return state
	}
}

export const bookReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case 'BOOK_CREATE_REVIEW_REQUEST':
			return {loading: true}
		case 'BOOK_CREATE_REVIEW_SUCCESS': 
			return {loading: false, success: true}
		case 'BOOK_CREATE_REVIEW_FAIL': 
			return {loading: false, error: action.payload}
		case 'BOOK_CREATE_REVIEW_RESET': 
			return {}
		default: 
			return state
	}
}



export const bookCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case 'BOOK_CREATE_REQUEST':
			return {loading: true}
		case 'BOOK_CREATE_SUCCESS': 
			return {loading: false, success: true, product: action.payload}
		case 'BOOK_CREATE_FAIL': 
			return {loading: false, error: action.payload}
		case 'BOOK_CREATE_RESET': 
			return {}
		default: 
			return state
	}
}





export const bookDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case 'BOOK_DELETE_REQUEST':
			return {loading: true}
		case 'BOOK_DELETE_SUCCESS': 
			return {loading: false, success: true, product: action.payload}
		case 'BOOK_DELETE_FAIL': 
			return {loading: false, error: action.payload}
		case 'BOOK_DELETE_RESET': 
			return {}
		default: 
			return state
	}
}