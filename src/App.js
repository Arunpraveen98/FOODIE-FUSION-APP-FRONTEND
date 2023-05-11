import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./Pages/Users/Home_Page";
import Cartscreen from "./Pages/Users/Add_To_Cart_Lists";
import Ordersscreen from "./Pages/Users/Cart_Orders_List";
import Adminscreen from "./Pages/Admin/Admin_Panel";
import User_Login from "./Pages/Authentication/User_Login";
import User_Register from "./Pages/Authentication/User_Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// -----------------------
function App() {
  return (
    <div className="App">
      {/* -------------------- */}
      <ToastContainer
        position="top-center"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* -------------------- */}
      <Navbar />
      {/* -------------------- */}
      <BrowserRouter>
        <Route path="/register" exact component={User_Register} />
        <Route path="/login" exact component={User_Login} />
        <Route path="/" exact component={Homescreen} />
        <Route path="/cart" exact component={Cartscreen} />
        <Route path="/orders" exact component={Ordersscreen} />
        <Route path="/admin" component={Adminscreen} />
      </BrowserRouter>
      {/* -------------------- */}
    </div>
  );
}

export default App;
