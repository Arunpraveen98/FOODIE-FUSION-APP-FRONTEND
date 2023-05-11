import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../../actions/Order_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
// -----------------------
export default function Orderslist() {
  // -----------------------
  const dispatch = useDispatch();
// -----------------------
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { orders, error, loading } = getordersstate;
// -----------------------
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
// -----------------------
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <div className="All-list-title ">Orders List</div>
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="table-head">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <td>
                    <span className="order-id">{order._id}</span>
                  </td>
                  <td>{order.email}</td>
                  <td>
                    <span className="user-id">{order.userid}</span>
                  </td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <div className="deliver-btn">Delivered</div>
                    ) : (
                      <button
                        className="btn deliver-order-btn"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver Order
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
