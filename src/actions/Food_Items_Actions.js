import axios from "axios";
import { config } from "../config";
import { authorize } from "./Authorize";
import { toast } from "react-toastify";
//? This function is exported as a named function expression `getAllPizzas`
//? It returns an asynchronous function that takes `dispatch` as an argument
export const getAllFoodItems = () => async (dispatch) => {
  //? Dispatch an action object with type `GET_PIZZAS_REQUEST`
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  //? Use a try-catch block to handle any errors that may occur during the axios request
  try {
    //? Use axios to send a GET request to the specified API endpoint
    //? `response` will hold the response data from the server
    const response = await axios.get(
      `${config.api}/api/FoodItems/GetAllFoodItems`
    );
    // console.log(response);
    //? Dispatch an action object with type `GET_PIZZAS_SUCCESS` and the response data as the payload
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
    //? If an error occurs during the axios request, catch it and handle it here
  } catch (error) {
    console.log(error);
    //? Dispatch an action object with type `GET_PIZZAS_FAILED` and the error as the payload
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};
// -----------------------
export const getFoodItemsById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/FoodItems/GetFoodItemsById`,
      {
        pizzaid,
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    // console.log(response);
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error });
  }
};
// -----------------------
export const filterPizzas = (searchkey, category) => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    // console.log(searchkey,category)
    var filteredPizzas;
    const response = await axios.get(
      `${config.api}/api/FoodItems/GetAllFoodItems`
    );
    filteredPizzas = response.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchkey)
    );
    if (category !== "all") {
      filteredPizzas = response.data.filter(
        (pizza) => pizza.category.toLowerCase() === category
      );
    }
    // console.log(filterPizzas)
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};
// -----------------------
export const Add_Foods = (Foods) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/FoodItems/AddFoodItem`,
      {
        Foods,
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    // console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};
// -----------------------
export const editPizza = (editedpizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/FoodItems/EditFoodItem`,
      {
        editedpizza,
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    // console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/admin/Foodslist";
  } catch (error) {
    console.log(error);
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};
// -----------------------
export const Delete_Food_Item = (FoodId) => async (dispatch) => {
  try {
    const verify_user = authorize();
    const response = await axios.post(
      `${config.api}/api/FoodItems/DeleteFoodItem`,
      {
        FoodId,
      },
      {
        headers: { Authorization: `${verify_user}` },
      }
    );
    toast.success("✅Food Item deleted successfully", { autoClose: 2000 });

    // console.log(response);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {

    console.log(error);
  }
};
// -----------------------
