import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/Food_Items_Actions";
import "../Stylesheet/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// -----------------------
function Searchbar() {
  // -----------------------
  const dispatch = useDispatch();

  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");
  // -----------------------
  return (
    <div className="navbar-filter">
      <div className="search-bar">
        <form class="form">
          <div className="serach-svg">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <input
            className="input search-input"
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            value={searchkey}
            placeholder="search Foods"
            required
            type="text"
          />
        </form>
      </div>

      <div className="search-options">
        <select
          className="form-control mt-2"
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non Veg</option>
        </select>
      </div>

      <div className="">
        <button
          type="button"
          className="search-button mt-2"
          onClick={() => {
            dispatch(filterPizzas(searchkey, category));
          }}
        >
          <FontAwesomeIcon className="search-icon" icon={faSearch} /> Search
        </button>
      </div>
    </div>
  );
}
export default Searchbar;
