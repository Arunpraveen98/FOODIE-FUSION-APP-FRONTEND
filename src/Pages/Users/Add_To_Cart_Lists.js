import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/Cart_Actions";
import { deleteFromCart } from "../../actions/Cart_Actions";
import Checkout from "../../components/Checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "../../Stylesheet/Carts_List.css";
  // -----------------------
export default function Cartscreen() {
    // -----------------------
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  // -----------------------
  const dispatch = useDispatch();
  // -----------------------
  return (
    <div className="col-lg-12 cart-items-list">
      <div className="row p-2" data-aos="fade-down">
        <div className="col-md-7">
          <div className="cart-items-title">Cart Lists</div>

          <div className="flex-container">
            <table className="table table-sm table-striped table-bordered table-responsive-lg">
              <thead className="cart-list-table">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr className="table-data-row">
                      <th scope="row">{index + 1}.</th>
                      <td>
                        {item.name} [{item.varient}]
                      </td>
                      <td>
                        <FontAwesomeIcon
                          className="fa fa-minus inc-dec"
                          onClick={() => {
                            dispatch(
                              addToCart(item, item.quantity - 1, item.varient)
                            );
                          }}
                          icon={faCircleMinus}
                        />

                        <b>{item.quantity}</b>
                        <FontAwesomeIcon
                          className="fa fa-plus inc-dec"
                          onClick={() => {
                            dispatch(
                              addToCart(item, item.quantity + 1, item.varient)
                            );
                          }}
                          icon={faCirclePlus}
                        />
                      </td>
                      <td>
                        {item.quantity} * {item.prices[0][item.varient]} =
                        {item.price}
                      </td>
                      <td>
                        <div className="m-1 w-100">
                          <img
                          className="item-image"
                            src={item.image}
                            alt="Not Found"
                            style={{ width:"80px",height: "70px" }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="m-1 w-100">
                          <i
                            className="fa fa-trash mt-5"
                            aria-hidden="true"
                            onClick={() => {
                              dispatch(deleteFromCart(item));
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-5 paynow-div">
          <div className="checkout-desc">
            Please proceed to checkout to complete your payment.
          </div>
          <div className="mt-4 col-md-11">
            <span className="total-amount">Total Amount :</span>{" "}
            <span className="total-price">{subtotal} /-</span>
          </div>
          <div className="paynow-btn mt-5">
            <Checkout subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
