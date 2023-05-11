import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../actions/Order_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
  // -----------------------
export default function Ordersscreen() {
    // -----------------------
  const dispatch = useDispatch();
  // -----------------------
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;
  // -----------------------
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  // -----------------------
  return (
    <div>
      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <hr />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}

        <div className="col-md-10">
          <table class="table table-sm  table-responsive-lg table-striped table-bordered orders-table">
            <thead className="orders-table-head">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Food Items</th>
                <th scope="col">Address</th>
                <th scope="col">Order Info</th>
              </tr>
            </thead>
            <tbody className="orders-table-body">
              {orders &&
                orders.map((order, index) => {
                  // console.log(order.isDelivered);
                  return (
                    <tr>
                      <th scope="row">{index + 1}.</th>
                      <td>
                        {order.orderItems.map((item) => {
                          return (
                            <div>
                              <p>
                                {item.name} [{item.varient}] * {item.quantity} ={" "}
                                {item.price}
                              </p>
                            </div>
                          );
                        })}
                        <p>
                          <span className="orders-key-name">
                            {" "}
                            Order Status :
                          </span>
                          {order.isDelivered ? (
                            <span className="orders-status-delivered">
                              DELIVERED
                            </span>
                          ) : (
                            <span className="orders-status-shipping">
                              SHIPPING
                            </span>
                          )}
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="orders-key-name">Street :</span>{" "}
                          {order.shippingAddress.street}
                        </p>
                        <p>
                          <span className="orders-key-name">City :</span>{" "}
                          {order.shippingAddress.city}
                        </p>
                        <p>
                          <span className="orders-key-name">Country :</span>{" "}
                          {order.shippingAddress.country}
                        </p>
                        <p>
                          <span className="orders-key-name">Pincode :</span>{" "}
                          {order.shippingAddress.pincode}
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="orders-key-name">
                            Order Amount :
                          </span>{" "}
                          {order.orderAmount} Rs/-
                        </p>
                        <p>
                          <span className="orders-key-name">Date :</span>{" "}
                          {order.createdAt.substring(0, 10)}
                        </p>
                        <p>
                          <span className="orders-key-name">
                            Transaction Id :
                          </span>{" "}
                          {order.transactionId}
                        </p>
                        <p>
                          <span className="orders-key-name">Order Id :</span>{" "}
                          {order._id}
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  // -----------------------