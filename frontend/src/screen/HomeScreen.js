import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {Helmet} from 'react-helmet/'
import { Row, Col, Container, Button, ListGroup, Form } from "react-bootstrap";
// import Products from "../products"
import Product from "../Components/Product";
import Message from '../Components/Message'
import Countdown from '../Components/Countdown'
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
// import Meta from "../Components/Meta";

import ProductCarousel from "../Components/ProductCarousel";
import { listProducts } from "../actions/productActions";
const HomeScreen = ({ match }) => {
  const [sortOrder, setSortOrder] = useState("");
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, sortOrder));
  }, [dispatch, keyword, pageNumber, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // const products=[]

  return (
    <>
      {!keyword && <ProductCarousel />}
      <Container className="features-inner">
        <Row className="py-4 my-5">
          <Col xl={3}>
            <div className="list-group flex-center">
              <i className=" my-3 fas fa-gas-pump"></i>
              <strong>Free oil change support</strong>
            </div>
          </Col>
          <Col xl={3}>
            <div className="list-group flex-center">
              <i className=" my-3 fas fa-headset"></i>
              <strong>24/7 Support</strong>
            </div>
          </Col>
          <Col xl={3}>
            <div className="list-group flex-center">
              <i className=" my-3 fas fa-screwdriver-wrench"></i>
              <strong>Parts Repair</strong>
            </div>
          </Col>
          <Col xl={3}>
            <div className="list-group flex-center">
              <i className=" my-3 fas fa-arrows-rotate"></i>
              <strong>Return Policy</strong>
            </div>
          </Col>
        </Row>
      </Container>
      <Form className="center" id="filter" value={sortOrder} onChange={handleSortChange}>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Lowest price"
          value="lowToHigh"
        />
        <Form.Check // prettier-ignore
          type="switch"
          label="Highest price"
          id="custom-switch"
          value="highToLow"
        />
      </Form>
      <h1 className="flex-center"><span className="heading">featured</span>cars</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <Meta /> */}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
      <section>
        <div>
          <h1 className="flex-center"><span className="heading">Hot</span>deals</h1>
          <Countdown />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {/* <Meta /> */}
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
          </>
        )}
      </section>
      <section>
        <div>
          <h1 className="flex-center"><span className="heading">Contact</span> us</h1>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {/* <Meta /> */}
            <Row className='py-3'>
              <Col md={6}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d23651.30408792001!2d106.62409558413344!3d10.868459536359174!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1690950899112!5m2!1svi!2s" allowfullscreen="" loading="lazy" width="600" height="450"></iframe>
              </Col>
              <Col md={6}>
                <Form className="bg-white ">
                  <Form.Group controlId='comment'>
                    <h3 className="flex-center">Get In Touch</h3>
                    <div className="px-4">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        as='textarea'
                        className="form-control-sm"
                        row='3'
                      ></Form.Control>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        as='textarea'
                        className="form-control-sm"
                        row='3'
                      ></Form.Control>
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as='textarea'
                        className="form-control-lg"
                        row='3'
                      ></Form.Control>
                    </div>
                  </Form.Group>
                  <Button
                    className='my-3'
                    type='submit'
                    variant='outline-primary'
                  >
                    Submit
                  </Button>
                </Form>

              </Col>
            </Row>
          </>
        )}
      </section>
    </>
  );
};

export default HomeScreen;
