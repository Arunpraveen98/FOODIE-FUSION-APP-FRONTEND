export const getAllFoodItemsReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_FOODS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_FOODS_SUCCESS":
      return {
        loading: false,
        pizzas: action.payload,
      };
    case "GET_FOODS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
  // -----------------------
export const getFoodItemsByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FOODS_BY_ID_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_FOODS_BY_ID_SUCCESS":
      return {
        loading: false,
        pizza: action.payload,
      };
    case "GET_FOODS_BY_ID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
  // -----------------------
export const addFoodItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FOODS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_FOODS_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_FOODS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
  // -----------------------
export const editFoodItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_FOODS_REQUEST":
      return {
        editloading: true,
        ...state,
      };
    case "EDIT_FOODS_SUCCESS":
      return {
        editloading: false,
        editsuccess: true,
      };
    case "EDIT_FOODS_FAILED":
      return {
        editerror: action.payload,
        editloading: false,
      };
    default:
      return state;
  }
};
  // -----------------------