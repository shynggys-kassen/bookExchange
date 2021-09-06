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


export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo'); 
	dispatch({
		type: 'USER_LOGOUT', 
	})
}






// Registration actions
export const register = (name,  email, password) => async (dispatch) => {
	try{
		dispatch({
			type: 'USER_REGISTER_REQUEST',
		})

		const config = {
			headers: {
				'Content-Type': 'application/json', 
			}
		}

		const {data} = await axios.post('/api/user/register', {name, email, password}, config)

		dispatch({
			type: "USER_REGISTER_SUCCESS", 
			payload: data, 
		})

		// LOGIN THE USER AFTER REGISTRATION IS SUCCESS
		dispatch({
			type: "USER_LOGIN_SUCCESS", 
			payload: data, 
		})

		// Save userInfo localStorage 
		localStorage.setItem('userInfo', JSON.stringify(data)); 

	} catch(error){
		dispatch({
			type: "USER_REGISTER_FAIL", 
			payload:  (error.response && error.response.data.message) ? error.response.data.message : error.message,  
			// payload: 'Hey there is an error', 
		})
	}
}






// Registration actions
export const getUserDetails = (id) => async (dispatch, getState) => {
try{
		dispatch({
			type: 'USER_DETAILS_REQUEST',
		})

		const {userLogin: {userInfo}} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const {data} = await axios.get(`/api/user/${id}`, config)

		dispatch({
			type: "USER_DETAILS_SUCCESS", 
			payload: data, 
		})

	} catch(error){
		dispatch({
			type: "USER_DETAILS_FAIL", 
			payload:  (error.response && error.response.data.message) ? error.response.data.message : error.message,  
		})
	}
}




export const updateUserProfile = (user) => async (dispatch, getState) => {
	try{
			dispatch({
				type: 'USER_UPDATE_REQUEST',
			})

			const {userLogin: {userInfo}} = getState()

			const config = {
				headers: {
					'Content-Type': 'application/json', 
					Authorization: `Bearer ${userInfo.token}`
				}
			}

			const {data} = await axios.put(`/api/user/profile`, user, config)

			dispatch({
				type: "USER_UPDATE_SUCCESS",
				payload: data,
			})

			// relogin again
			dispatch({
				type: "USER_LOGIN_SUCCESS",
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data)); 
				
		} catch(error){
			dispatch({
				type: "USER_UPDATE_FAIL", 
				payload:  (error.response && error.response.data.message) ? error.response.data.message : error.message,  
			})
		}
}
