import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/Cart_Actions";
import "../Stylesheet/Foods_Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// -----------------------
function Foods({ pizza }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const history = useHistory();
  // -----------------------
  function addtocart() {
    const user_Details = window.localStorage.getItem("currentUser");
    if (!user_Details) {
      toast.error("! Please Login and Add Items", { autoClose: 2000 });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } else {
      dispatch(addToCart(pizza, quantity, varient));
    }
  }
  // -----------------------
  return (
    <div className="pizza-cards shadow-inset-center p-3 mb-5 " key={pizza._id}>
      {/* ---------------- */}

      <span className="card-image-title">{pizza.name}</span>
      <div onClick={handleShow} className="card-images-div">
        <img src={pizza.image} className="card-images" alt="Not Available" />
      </div>
      {/* ---------------- */}
      <div className="flex-container items-options-div">
        <div className="m-1">
          <p className="card-subtitle">Size</p>
          <select
            className="form-control options"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {pizza.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>
        <div className="m-1">
          <p className="card-subtitle">Quantity</p>
          <select
            className="form-control options"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(5).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      {/* ---------------- */}
      <div className="card-footer-div">
        <div className="m-1 w-100">
          <div className="mt-1 cart-price">
            Price : Rs/-
            <span className="item-price">
              {pizza.prices[0][varient] * quantity}
            </span>
          </div>
        </div>
        <div className="m-1 w-100">
          <div class="button-borders">
            <button class="primary-button" onClick={addtocart}>
              <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* ---------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={pizza.image}
            className="img-fluid"
            style={{ height: "400px" }}
            alt="Not Found"
          />
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn modal-close-btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
      {/* ---------------- */}
    </div>
  );
}
export default Foods;
