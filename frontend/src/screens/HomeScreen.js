import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import Rating from "../components/Rating";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const category = props.match.params.id ? props.match.params.id : "";

  const productList = useSelector((state) => state.productList);
  // khoi tao thi { products } = { products: [] } ( state = { products: [] } )
  const { products, loading, error } = productList;

  // store.dispatch(fn)
  const dispatch = useDispatch();

  // get api /api/products
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {};
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    // console.log(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></input>
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <ul className="products">
          {products?.map((product) => (
            <li key={product?._id}>
              <div className="product">
                <Link to={"/product/" + product?._id}>
                  <img
                    className="product-image"
                    src={product?.image}
                    alt="proudct"
                  />
                </Link>

                <div className="product-name">
                  <Link to={"/product/" + product?._id}>{product?.name}</Link>
                </div>
                <div className="product-brand">{product?.brand}</div>
                <div className="product-price">${product?.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product?.rating}
                    text={product?.numReviews + " reviews"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      ;
    </>
  );
}
export default HomeScreen;
