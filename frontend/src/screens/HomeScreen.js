import React, {useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; 
import {listBooks} from '../actions/bookAction'; 

const HomeScreen = () => {
	const dispatch = useDispatch(); 
	const bookList = useSelector(state => state.bookList); 
	const {loading, error, books} = bookList


	useEffect(() => {
		dispatch(listBooks())
	}, [dispatch]); 

	console.log(books); 
	

	return ( 
		<>
		<h1 style={{marginTop: "5px"}}>Civil Engineering Course Books</h1>
			{loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : 
				<Row>
					{books.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product}/>
						</Col>
					))}
				</Row>
			}
		</>
	)
}

export default HomeScreen