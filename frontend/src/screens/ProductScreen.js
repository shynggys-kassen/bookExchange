import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Message from '../components/Message'; 
import Rating from '../components/Rating'
// import products from '../products'
import axios from 'axios'
import {createBookReview} from '../actions/bookAction'
import {useDispatch, useSelector} from 'react-redux'; 

const ProductScreen = ({match, history}) => {
	const [product, updateProduct] = useState({reviews: []})
	const [email, updateEmail] = useState('18080342d@connect.polyu.hk')

	// reviews
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')


	const bookReviewCreate = useSelector((state) => state.bookReviewCreate);  
	const {
		success: successBookReview,
    loading: loadingBookReview,
    error: errorBookReview
	} = bookReviewCreate

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin; 
	
	useEffect(() => {
		if (successBookReview){
			setRating(0); 
			setComment('')
		}

		const url = `/api/books/${match.params.id}`
		const fetchProduct = async () => {
			let {data} = await axios.get(url); 
			updateProduct(data); 
		}
		
		fetchProduct(); 
	}, [dispatch, match, successBookReview])

	console.log(`product:`); 
	console.log(product); 


	const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createBookReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

	
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

			{/* Review form and other reviews */}
			<Row>
				<Col md={6}>
					<h2>Comments</h2>
					{(product.reviews.length === 0) ? <Message>No Comments</Message> : (
							<ListGroup variant='flush'>
										{product.reviews.map((review) => (
											<ListGroup.Item key={review._id}>
												<strong>{review.name}</strong>
												<Rating value={review.rating} />
												<p>{review.createdAt.substring(0, 10)}</p>
												<p>{review.comment}</p>
											</ListGroup.Item>
										))}
										<ListGroup.Item>
											<h2>Write a Comment</h2>
											{successBookReview && (
												<Message variant='success'>
													Review submitted successfully
												</Message>
											)}
											{loadingBookReview && "Loading..."}
											{errorBookReview && (
												<Message variant='danger'>{errorBookReview}</Message>
											)}
											{userInfo ? (
												<Form onSubmit={submitHandler}>
													<Form.Group controlId='rating'>
														<Form.Label>Rating</Form.Label>
														<Form.Control
															as='select'
															value={rating}
															onChange={(e) => setRating(e.target.value)}
														>
															<option value=''>Select...</option>
															<option value='1'>1 - Poor</option>
															<option value='2'>2 - Fair</option>
															<option value='3'>3 - Good</option>
															<option value='4'>4 - Very Good</option>
															<option value='5'>5 - Excellent</option>
														</Form.Control>
													</Form.Group>
													<Form.Group controlId='comment'>
														<Form.Label>Comment</Form.Label>
														<Form.Control
															as='textarea'
															row='3'
															value={comment}
															onChange={(e) => setComment(e.target.value)}
														></Form.Control>
													</Form.Group>
													<Button
														disabled={loadingBookReview}
														type='submit'
														variant='primary'
													>
														Submit
													</Button>
												</Form>
											) : (
												<Message>
													Please <Link to='/login'>sign in</Link> to write a review{' '}
												</Message>
											)}
										</ListGroup.Item>
									</ListGroup>
						)}
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen; 