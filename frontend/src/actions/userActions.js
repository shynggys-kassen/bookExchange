import axios from "axios"

export const login = (email, password) => async (dispatch) => {
	try{
		dispatch({
			type: 'USER_LOGIN_REQUEST',
		})

		const config = {
			headers: {
				'Content-Type': 'application/json', 
			}
		}

		console.log('email: ', email)
		console.log('pass: ', password)
		const {data} = await axios.post('/api/user/login', {email, password}, config)
		console.log('data'); 
		console.log(data)

		dispatch({
			type: "USER_LOGIN_SUCCESS", 
			payload: data, 
		})

		localStorage.setItem('userInfo', JSON.stringify(data)); 

	} catch(error){
		dispatch({
			type: "USER_LOGIN_FAIL", 
			payload:  (error.response && error.response.data.message) ? error.response.data.message : error.message,  
			// payload: 'Hey there is an error', 
		})
	}
}

