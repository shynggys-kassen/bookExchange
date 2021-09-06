import React from 'react'; 
import {Route} from 'react-router-dom'; 
import {LinkContainer} from 'react-router-bootstrap'; 
import SearchBox from './searchBox'; 
import {
	Navbar, 
	Nav, 
	Container, 
	NavDropdown
} from 'react-bootstrap';

const {useDispatch, useSelector} = require('react-redux'); 
const {logout} = require('../actions/userActions');  

const Header = () => {
	const dispatch = useDispatch( )

	const userLogin = useSelector(state => state.userLogin); 
	const {userInfo} = userLogin

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header>
			<Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to='/'><Navbar.Brand>CEE BOOK EXCHANGE</Navbar.Brand></LinkContainer>
					<Route render={({history}) => <SearchBox history={history}/>}></Route>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className='ml-auto'>
							{/* <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link></LinkContainer> */}
							{!userInfo ? (
								<LinkContainer to='/login'><Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link></LinkContainer>
								) : (
									<NavDropdown title={userInfo.name} id='username'>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
									</NavDropdown>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}


export default Header


