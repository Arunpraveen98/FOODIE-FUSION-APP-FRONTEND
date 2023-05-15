import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodItems } from "../../actions/Food_Items_Actions";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Footer from "./Home_Footer";
import Home from "./Home_Header";
import "../../Stylesheet/Pagination.css";
import Foods from "../../components/FoodItems";
// -----------------------

// -----------------------

export default function Homescreen() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllFoodItemsReducer);
  const { pizzas, error, loading } = pizzasstate;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // -----------------------
  useEffect(() => {
    dispatch(getAllFoodItems());
  }, []);
  // -----------------------
  //? Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pizzas.slice(indexOfFirstItem, indexOfLastItem);
  // -----------------------
  //? Logic for pagination buttons
  const pageNumbers = Math.ceil(pizzas.length / itemsPerPage);
  // -----------------------
  const handlePageClick = (pageNumber) => {
    if (pageNumber === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === "next" && currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    } else if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };
  // -----------------------
  return (
    <div>
      <Home />

      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          currentItems.map((pizza, index) => (
            <div className="col-md-3 m-3" key={index}>
              <div>
                <Foods pizza={pizza} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => handlePageClick("prev")}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => handlePageClick("next")}
          disabled={currentPage === pageNumbers}
        >
          Next &raquo;
        </button>
      </div>

      <Footer />
    </div>
  );
}
// -----------------------
