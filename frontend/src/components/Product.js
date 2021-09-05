import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
	return (
		<Card className = 'my-3 p3 rounded'> 
			<Link to= {`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to = {`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.title}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews}`}/>
				</Card.Text>

				<Card.Text as='h3'>
					{product.price === 0 ? "Free" : `$${product.price}`}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product




/*

<div className='my-3'>
						{product.rating} from {product.numReviews} reviews
					</div>

*/