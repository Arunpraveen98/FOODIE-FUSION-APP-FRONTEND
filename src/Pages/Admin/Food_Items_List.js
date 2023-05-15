import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Delete_Food_Item,
  getAllFoodItems,
} from "../../actions/Food_Items_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
// -----------------------
export default function Pizzaslist() {
  // -----------------------
  const dispatch = useDispatch();
  // -----------------------
  const pizzasstate = useSelector((state) => state.getAllFoodItemsReducer);
  const { pizzas, error, loading } = pizzasstate;
  // -----------------------
  useEffect(() => {
    dispatch(getAllFoodItems());
  }, []);
  // -----------------------
  return (
    <div>
      <div className="All-list-title">Foods List</div>

      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}

      <table className="table table-bordered table-striped table-responsive-sm">
        <thead className="table-head">
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]} Rs/-
                    <br />
                    Medium : {pizza.prices[0]["medium"]} Rs/-
                    <br />
                    Large : {pizza.prices[0]["large"]} Rs/-
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <i
                      className="fa fa-trash m-1"
                      onClick={() => {
                        dispatch(Delete_Food_Item(pizza._id));
                      }}
                    ></i>
                    <Link to={`/admin/EditFoodItem/${pizza._id}`}>
                      <i className="fa fa-edit m-1"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
