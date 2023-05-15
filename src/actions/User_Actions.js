import axios from "axios";
import { config } from "../config";
import { toast } from "react-toastify";
import { authorize } from "./Authorize";
// -----------------------
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post(`${config.api}/api/users/register`, user);
    // console.log(response.data);

    dispatch({ type: "USER_REGISTER_SUCCESS" });
    toast.success(response.data.message, { autoClose: 2000 });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000); // Redirect after 2 seconds
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    console.log(error);
    toast.error(error.response.data.message, { autoClose: 2000 });
  }
};

// -----------------------

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post(`${config.api}/api/users/login`, user);
    // console.log(response);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

    localStorage.setItem(
      "currentUser",
      JSON.stringify(response.data.currentUser)
    );

    if (response.data.currentUser.isAdmin === true) {
      localStorage.setItem(
        "AdminUser",
        JSON.stringify(response.data.currentUser.isAdmin)
      );
      toast.success("Successfully Admin Logged-in", { autoClose: 2000 });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 2000);
    } else {
      toast.success("Successfully User logged in", { autoClose: 2000 });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    toast.error(error.response.data.message, { autoClose: 2000 });
  }
};
// -----------------------
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cartItems");
  JSON.stringify(window.localStorage.setItem("AdminUser", false));
  toast.success("Logged out successfully👋", { autoClose: 2000 });
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};
// -----------------------
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.get(`${config.api}/api/users/getallusers`, {
      headers: { Authorization: `${verify_user}` },
    });
    // console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};
// -----------------------
export const deleteUser = (userid) => async (dispatch) => {
  try {
    const verify_user = authorize();
    await axios.post(
      `${config.api}/api/users/deleteuser`,
      { userid },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    alert("User deleted successfully");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
// -----------------------
