import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getFoodItemsById } from "../../actions/Food_Items_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Success from "../../components/Success";
// -----------------------
export default function Editpizza({ match }) {
  // -----------------------
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
// -----------------------
  const getpizzabyidstate = useSelector((state) => state.getFoodItemsByIdReducer);
  const { pizza, error, loading } = getpizzabyidstate;
  const editpizzastate = useSelector((state) => state.editFoodItemsReducer);
  const { editloading, editsuccess } = editpizzastate;
// -----------------------
  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaid) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setsmallprice(pizza.prices[0]["small"]);
        setmediumprice(pizza.prices[0]["medium"]);
        setlargeprice(pizza.prices[0]["large"]);
        setimage(pizza.image);
      } else {
        dispatch(getFoodItemsById(match.params.pizzaid));
      }
    } else {
      dispatch(getFoodItemsById(match.params.pizzaid));
    }
  }, [pizza, dispatch]);
// -----------------------
  function formHandler(e) {
    e.preventDefault();
    const editedpizza = {
      _id: match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
    dispatch(editPizza(editedpizza));
  }
// -----------------------
  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <div className="All-list-title ">Edit Food Items</div>

        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && <Success success="Food details edited successfully" />}
        {editloading && <Loading />}
        <div className="">
          <form className="col-md-12 form-div" onSubmit={formHandler}>
            <div className="col-md-12">
              <label className="input-label col-md-4" htmlFor="Item_Name">
                Item Name:
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Item Name"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
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
                  value={smallprice}
                  onChange={(e) => {
                    setsmallprice(e.target.value);
                  }}
                />
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
                  value={mediumprice}
                  onChange={(e) => {
                    setmediumprice(e.target.value);
                  }}
                />
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
                  value={largeprice}
                  onChange={(e) => {
                    setlargeprice(e.target.value);
                  }}
                />
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
                  value={category}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
              </label>
              <label className="input-label col-md-4" htmlFor="image_url">
                Image Url:
                <input
                  className="form-control"
                  type="url"
                  name="image"
                  placeholder="Paste Image Url"
                  value={image}
                  onChange={(e) => {
                    setimage(e.target.value);
                  }}
                />
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
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
              </label>
            </div>

            <button className="pizza-btn mt-3" type="submit">
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
