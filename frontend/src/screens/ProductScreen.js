import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import axios from 'axios'


const ProductScreen = ({match}) => {
	const [product, updateProduct] = useState({})
	const [email, updateEmail] = useState('18080342d@connect.polyu.hk')
	
	useEffect(() => {
		const url = `/api/books/${match.params.id}`
		const fetchProduct = async () => {
			let {data} = await axios.get(url); 
			updateProduct(data); 
		}
		
		fetchProduct(); 
				
		
	}, [])
	
	// const product = products.find(p => p._id === match.params.id)
	return (
		<>
			<Link to = '/' className = 'btn btn-light my-3'>Go Back</Link>
			<Row>
				<Col md = {4}>
					<Image src={product.image} alt={product.title} fluid/> 
				</Col>
				<Col md = {3}>
					<ListGroup variant='flush'> 
						<ListGroup.Item>
							<h3>{product.title}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews}`} />
						</ListGroup.Item>
						<ListGroup.Item>
							Price: {product.price === 0 ? 'Free' : `$${product.price}`}
						</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Row>	
								<Col>
									Price:
								</Col> 
								<Col>
									{product.price === 0 ? 'Free' : `$${product.price}`}
								</Col> 
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Status:</Col>
								<Col>
									{product.format === 'physical' ? (product.countInStock > 0 ? "In Stock" : "Out of Stock ") : 'In Stock'}
								</Col> 
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Fromat:</Col>
								<Col>
									{product.format}
								</Col> 
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Contact</Col>
								<Col>
									{email}
								</Col> 
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>	
							<Link to={`${product.file}`} target="_blank" download>
								<Button className='btn-block' type='button'>Download Book PDF</Button>
							</Link>
						</ListGroup.Item>
					</ListGroup>					
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen; 