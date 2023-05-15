import axios from "axios";
import { config } from "../config";
import { authorize } from "./Authorize";
import { toast } from "react-toastify";
// -----------------------
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/orders/placeorder`,
      {
        token,
        subtotal,
        currentUser,
        cartItems,
        // payment_method: token.paymentMethod.id
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    // console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED" });
    console.log(error);
  }
};
// -----------------------
export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/orders/getuserorders`,
      { userid: currentUser._id },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    // console.log(response);
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};
// -----------------------
export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_ALLORDERS_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.get(`${config.api}/api/orders/getallorders`, {
      headers: { Authorization: `${verify_user}` },
    });
    // console.log(response);
    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_ALLORDERS_FAILED", payload: error });
  }
};
// -----------------------
export const deliverOrder = (orderid) => async (dispatch) => {
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/orders/deliverorder`,
      {
        orderid,
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    // console.log(response);
    toast.success("Order Delivered",{autoClose:2000});
    const orders = await axios.get(`${config.api}/api/orders/getallorders`);
    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: orders.data });
  } catch (error) {
    console.log(error);
  }
};
// -----------------------
