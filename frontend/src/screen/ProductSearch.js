import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {Helmet} from 'react-helmet/'
import { Row, Col, Container } from "react-bootstrap";
// import Products from "../products"
import Product from "../Components/Product";
import Message from '../Components/Message'
import Countdown from '../Components/Countdown'
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
import Form from 'react-bootstrap/Form';
// import Meta from "../Components/Meta";

import ProductCarousel from "../Components/ProductCarousel";
import { listProducts } from "../actions/productActions";

const ProductSearch = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // const products=[]

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <Meta /> */}
          <div className="my-4">
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductSearch;
