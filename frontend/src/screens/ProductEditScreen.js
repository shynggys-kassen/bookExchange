import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/bookAction'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [author, setAuthor] = useState('')
  const [file, setFile] = useState(''); 
  const [lessonsCode, setLessonsCode] = useState('')
  const [description, setDescription] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [fileUploading, setFileUploading] = useState(false)
  const [image, setImage] = useState(''); 
  const [format, setFormat] = useState('PDF')

  /* 
  user: req.user._id,
  title: 'Sample name',
  author: 'Sample', 
  image: '/images/sample.jpg',
  file: '/books/sample.jpg', 
  lessonsCode: 'CSE111111',
  description: 'Message me to get this book',
  rating: 0, 
  numReviews: 0, 
  price: 0,
  reviews: [], 
  format: 'PDF', 
  */

  const dispatch = useDispatch()

  const bookDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = bookDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  console.log('success and update'); 
  console.log(successUpdate); 
  console.log(loadingUpdate)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "BOOK_UPDATE_RESET" })
      history.push('/profile') // go back to prfile when successfull upload
    } else {
      if (!product || (!product.title || product._id !== productId)) {
        dispatch(listProductDetails(productId))
      } else {
        setTitle(product.title)
        setPrice(product.price)
        setImage(product.image)
        setFile(product.file)
        setLessonsCode(product.lessonsCode); 
        setDescription(product.description)
        setAuthor(product.author);

      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setImageUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setImageUploading(false)
    } catch (error) {
      console.error(error)
      setImageUploading(false)
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setFileUploading(true)

    try{
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
      }

      const {data} = await axios.post()
    } catch (error){
      console.log(error); 
      setFileUploading(false); 
    }

  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        title,
        price,
        image,
        file,
        author,
        description,
        format,
        lessonsCode, 
        rating: product.rating,  
        numReviews: product.numReviews, 
      })
    )
  }

  return (
    <>
      <Link to='/profile' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && "Loading..."}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          "Loading..."
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Title</Form.Label>p
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose Front Image'
                custom
                onChange={uploadImageHandler}
              ></Form.File>
              {imageUploading && "Loading..."}
            </Form.Group>


            <Form.Group controlId='file'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter file url'
                value={file}
                onChange={(e) => setFile(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {fileUploading && "Loading..."}
            </Form.Group>

            <Form.Group controlId='Author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='format'>
              <Form.Label>Format</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter format (PDF)'
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={lessonsCode}
                onChange={(e) => setLessonsCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen