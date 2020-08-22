import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
} from "./reducers/productReducers";

import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";

import Cookie from "js-cookie";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  myOrderListReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
}; // if cartItems = [] thi initialState={ cart: { cartItems:[] } }

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  myOrderList: myOrderListReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  productReviewSave: productReviewSaveReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
