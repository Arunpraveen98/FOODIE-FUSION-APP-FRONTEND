import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Addpizza from "./Add_Food_Items";
import Editpizza from "./Edit_Food_Items";
import Orderslist from "./Orders_List";
import Pizzaslist from "./Food_Items_List";
import Userslist from "./Users_List";
import "../../Stylesheet/Admin_Screen.css";
// -----------------------
export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

// -----------------------
  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);
// -----------------------
  return (
    <div className="conatiner admin-screen-div">
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <div className="admin-panel-title">Admin Panel</div>

          <ul className="adminfunctions">
            <li>
              <Link
                className="admin-list"
                style={{ listStyleType: "none" }}
                to={"/admin/userslist"}
              >
                Users List
              </Link>
            </li>
            <li>
              <Link className="admin-list" to={"/admin/Foodslist"}>
                Foods List
              </Link>
            </li>
            <li>
              <Link className="admin-list" to={"/admin/orderslist"}>
                Orders List
              </Link>
            </li>
            <li>
              <Link className="admin-list" to={"/admin/AddFoodItems"}>
                Add Foods
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/admin" component={Userslist} exact />
            <Route path="/admin/userslist" component={Userslist} exact />
            <Route path="/admin/orderslist" component={Orderslist} exact />
            <Route path="/admin/Foodslist" component={Pizzaslist} exact />
            <Route path="/admin/AddFoodItems" component={Addpizza} exact />
            <Route
              path="/admin/EditFoodItem/:pizzaid"
              component={Editpizza}
              exact
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
