import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add_Foods } from "../../actions/Food_Items_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
import { useFormik } from "formik";
// -----------------------
export default function Addpizza() {
  // -----------------------
  const dispatch = useDispatch();

  const addpizzastate = useSelector((state) => state.addFoodItemsReducer);
  const { success, error, loading } = addpizzastate;
  // -----------------------
  const Input_Form_Validation = useFormik({
    //? Default initial value for input fields...
    initialValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      smallprice: "",
      mediumprice: "",
      largeprice: "",
    },
    //--------------------------------------------------------------------

    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Please enter Item Name";
      } else if (values.name.length > 30) {
        errors.name = "Letters should be below 30 ";
      } else if (values.name.length < 5) {
        errors.name = "Letters should be above 5";
      }
      //--------------------------------------------------------------------
      //? image Condition...
      if (!values.image) {
        errors.image = "Please Paste Image Url";
      }
      //--------------------------------------------------------------------
      //? description Condition...
      if (!values.description) {
        errors.description = "Please enter Item Description";
      } else if (values.description.length > 100) {
        errors.description = "Words must be less than 100 characters";
      }
      //--------------------------------------------------------------------
      //? category Condition...
      if (!values.category) {
        errors.category = "Please enter Item category";
      }
      //--------------------------------------------------------------------
      //? smallprice Condition...
      if (!values.smallprice) {
        errors.smallprice = "Please Enter Small Price";
      } else if (values.smallprice < 0) {
        errors.smallprice = "Price should not be Negative";
      }
      //--------------------------------------------------------------------
      if (!values.mediumprice) {
        errors.mediumprice = "Please Enter Medium Price";
      } else if (values.mediumprice < 0) {
        errors.mediumprice = "Price should not be Negative";
      }
      //--------------------------------------------------------------------
      if (!values.largeprice) {
        errors.largeprice = "Please Enter Large Price";
      } else if (values.largeprice < 0) {
        errors.largeprice = "Price should not be Negative";
      }
      //--------------------------------------------------------------------
      return errors;
    },
    //--------------------------------------------------------------------

    onSubmit: async (values) => {
      try {
        // setBtn_loading(false);
        //--------------------------------------------------------------------
        const Foods = {
          name: values.name,
          image: values.image,
          description: values.description,
          category: values.category,
          prices: {
            small: values.smallprice,
            medium: values.mediumprice,
            large: values.largeprice,
          },
        };
        // console.log(pizza);
        dispatch(Add_Foods(Foods));
        Input_Form_Validation.resetForm();
        //--------------------------------------------------------------------
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}`);
        console.error(error);
        //--------------------------------------------------------------------
        // setBtn_loading(true);
      }
    },
  });
  // -----------------------
  return (
    <div>
      <div className="text-left shadow-lg  p-3 mb-5  bg-white  rounded">
        <div className="All-list-title ">Add Food Items</div>

        {loading && <Loading />}
        {error && <Error error="Please Fill All the Fields" />}
        {success && <Success success="New Food Items added successfully" />}
        <div className="">
          <form
            className="col-md-12 form-div"
            onSubmit={Input_Form_Validation.handleSubmit}
          >
            <div className="col-md-12">
              <label className="input-label col-md-4" htmlFor="Item_Name">
                Item Name:
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Item Name"
                  value={Input_Form_Validation.values.name}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.name ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.name}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>

              <label
                className="input-label col-md-4"
                htmlFor="small_varient_price"
              >
                Small Varient Price:
                <input
                  className="form-control"
                  type="number"
                  name="smallprice"
                  placeholder="Enter Small Varient Price"
                  value={Input_Form_Validation.values.smallprice}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.smallprice ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.smallprice}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>
            </div>

            <div className="col-md-12">
              <label
                className="input-label col-md-4"
                htmlFor="medium_varient_price"
              >
                Medium Varient Price:
                <input
                  className="form-control"
                  type="number"
                  name="mediumprice"
                  placeholder="Enter Medium Varient Price"
                  value={Input_Form_Validation.values.mediumprice}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.mediumprice ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.mediumprice}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>

              <label
                className="input-label col-md-4"
                htmlFor="large_varient_price"
              >
                Large Varient Price:
                <input
                  className="form-control"
                  type="number"
                  name="largeprice"
                  placeholder="Enter large varient price"
                  value={Input_Form_Validation.values.largeprice}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.largeprice ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.largeprice}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>
            </div>

            <div className="col-md-12">
              <label className="input-label col-md-4" htmlFor="Category">
                Category:
                <input
                  className="form-control"
                  type="text"
                  name="category"
                  placeholder="Enter Item Category"
                  value={Input_Form_Validation.values.category}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.category ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.category}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>
              <label className="input-label col-md-4" htmlFor="image_url">
                Image Url:
                <input
                  className="form-control"
                  type="url"
                  name="image"
                  placeholder="Paste Image Url"
                  value={Input_Form_Validation.values.image}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.image ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.image}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>
            </div>

            <div className="col-md-12">
              <label className="input-label col-md-8" htmlFor="Description">
                Description:
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Enter Item Description"
                  value={Input_Form_Validation.values.description}
                  onChange={Input_Form_Validation.handleChange}
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.description ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "lighter",
                    }}
                  >
                    {Input_Form_Validation.errors.description}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </label>
            </div>

            <button className="pizza-btn mt-3" type="submit">
              Add Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
