import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/Order_Actions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { toast } from "react-toastify";

function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const [userExists, setUserExists] = useState(false);
  const dispatch = useDispatch();
  // -----------------------
  function tokenHander(token) {
    // console.log(token);
    dispatch(placeOrder(token, subtotal));
  }
  // -----------------------
  useEffect(() => {
    const UserCheck = JSON.parse(window.localStorage.getItem("currentUser"));
    if (!UserCheck) {
      setUserExists(false);
      toast.error("Please Login and Select an Item", { autoClose: 2000 });
    } else {
      setUserExists(true);
    }
  }, []);
  // -----------------------
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && (
        <Success success="Your Order Placed Successfully .Check Your Orders" />
      )}
      {userExists ? (
        <StripeCheckout
          amount={subtotal * 100}
          name="Test Stripe Payment"
          description="Payment for Food Items"
          billingAddress
          shippingAddress
          token={tokenHander}
          stripeKey={`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`}
          currency="INR"
        >
          <button className="checkout-btn">PAY NOW</button>
        </StripeCheckout>
      ) : (
        ""
      )}
    </div>
  );
}
export default Checkout;
