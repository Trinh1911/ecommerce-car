import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../Components/Rating'
// import products from "../products"
// import { ListGroupItem } from 'react-bootstrap'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = ({ history, match }) => {

  const [active, setActive] = useState(1);
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReviewCreate


  useEffect(() => {
    if (successProductReview) {
      alert("Submitted Review")
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message>{error}</Message> : (
        <>
          <Row className='center'>
            <Col md={7}>
              <Image src={product.image} alt={product.name} className='fluid-detail' />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <div className='px-3'>
                  <h2>{product.name}</h2>
                  <div className='price'>${product.price}</div>
                  <span className='py-2'>Brand: {product.brand}</span>
                  <span className='d-flex py-2'>Ratings: {product.numReviews}   <Rating value={product.rating} /></span>
                  <span className='d-flex border-bottom py-2'>In Stock: {product.countInStock}</span>
                </div>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className='center'>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e) =>
                          setQty(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button className="btn-block" onClick={addToCartHandler} type="button" disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <div className="details-description py-2 my-6">
            <div className="title">
              <div className="description-heading">
                <h5
                  onClick={() => setActive(1)}
                  className={`${active === 1 ? "active-indicator" : null}`}
                >
                  Product Details
                </h5>
              </div>
              <div className="description-heading">
                <h5
                  onClick={() => setActive(2)}
                  className={`${active === 2 ? "active-indicator" : null}`}
                >
                  Product Reviews
                </h5>
              </div>
            </div>
            {active === 1 ? (
              <>
                <ListGroup className='min-height-vw-5'>
                  <span className='d-flex py-2 px-4 text-justify m-auto'>{product.description}</span>
                </ListGroup>
              </>
            ) : null}
            {
              active === 2 ? (
                <Row className='py-3'>
                  <Col md={6}>
                    {product.reviews.length === 0 && <span className='text-center text-danger'>No Reviews</span>}
                    <ListGroup variant='flush' className='mx-3 bg-white'>
                      <h2 className='ms-2'>Comments</h2>
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id} className='border-bottom'>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}

                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup.Item className='border-start mx-3'>
                      <h2>Write a Customer Review</h2>
                      {successProductReview && (
                        <Message variant='success'>
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
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
                            className='my-3'
                            disabled={loadingProductReview}
                            type='submit'
                            variant='outline-primary'
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
                  </Col>
                </Row>
              ) : null
            }
          </div>
        </>
      )}

    </>
  )
}

export default ProductScreen
