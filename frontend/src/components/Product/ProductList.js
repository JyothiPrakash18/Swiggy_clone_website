import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBranch } from "../../store/apis/branchesApis";
import ProductCart from "./ProductCart";

const ProductList = () => {
  const { products } = useSelector((state) => state.branches);
  const [viewModes, setViewModes] = useState("grid");
  console.log(products);
  const dispatch = useDispatch();

  const getProductsInfo = (value) => {
    dispatch(getProductsByBranch({ id: value }));
  };
  useEffect(() => {
    getProductsInfo();
  }, []);

  return (
    <>
      <div className="product_list_wrapper">
        <div className="product_list_header">
          <h1 className="section_subheading_ts">
            Rishi’s Classic Curries
            <span className="section_note_ts">(Showing products )</span>
          </h1>
        </div>
        <div className="product_filter">
          <ul className="filter_menuList">
            <li className="filter_menuItem active">
              <a href="#" className="filter_menuLinks">
                Relevance
              </a>
            </li>
            <li className="filter_menuItem">
              <a href="#" className="filter_menuLinks">
                Delivery Time
              </a>
            </li>
            <li className="filter_menuItem">
              <a href="#" className="filter_menuLinks">
                Rating
              </a>
            </li>
            <li className="filter_menuItem">
              <a href="#" className="filter_menuLinks">
                Cost: Low to High
              </a>
            </li>
            <li className="filter_menuItem">
              <a href="#" className="filter_menuLinks">
                Cost: High to Low
              </a>
            </li>
          </ul>
          <div className="view_option">
            <div className="view_mode_wrapper">
              <div className="view_mode" onClick={() => setViewModes("grid")}>
                <i className="bx bxs-grid-alt"></i>
              </div>
              <div className="view_mode" onClick={() => setViewModes("list")}>
                <i className="bx bx-list-ul"></i>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`product_list_container ${
            viewModes === "grid"
              ? "grid_view"
              : viewModes === "list" && "list_view"
          }`}
        >
          {products &&
            products.map((product) => (
              <ProductCart product={product} key={product._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
