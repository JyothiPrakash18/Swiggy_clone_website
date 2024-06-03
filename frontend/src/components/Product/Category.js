import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBranch } from "../../store/apis/branchesApis";

const Category = ({ category, index, ShowDropdown, setShowDropdown }) => {
  const dispatch = useDispatch();
  const {subCategory} = useSelector(state => state.branches)


  const { id, name } = category;

  const menuHandler = (subCatId) => {
    dispatch(getProductsByBranch({ id: subCatId }));
  };

  return (
    <div
      className={`accordion-item submenu_item ${
        ShowDropdown === category._id && "active"
      } `}
    >
      <h2 className="accordion-header">
        <div className="submenu_accordion_header">
          <div className="submenu_heading">
            {ShowDropdown === category._id ? (
              <i
                className="bx bx-minus Collapse_icon"
                onClick={() => setShowDropdown(category._id)}
              ></i>
            ) : (
              <i
                className="bx bx-plus Collapse_icon"
                onClick={() => setShowDropdown(category._id)}
              ></i>
            )}

            <h1 className="category_name_ts">{name}</h1>
          </div>
          <div className="submenu_banner"></div>
        </div>
      </h2>
      {subCategory && (
        <SubCategoryRow
          category={category}
          id={id}
          menuHandler={menuHandler}
          subCategory={subCategory}
          ShowDropdown={ShowDropdown}
        />
      )}
    </div>
  );
};

export default Category;

function SubCategoryRow({ category, subCategory, menuHandler, ShowDropdown, id }) {
  return (
    <div
      className={`accordion-collapse collapse ${
        ShowDropdown === category._id && "show"
      } `}
    >
      <div className="accordion-body submenu_body">
        <div className="sub_category_list">
          
                  

          {subCategory?.map((subCat) => (
            (subCat.categoryId === id) &&(
              <p

              key={subCat._id}
              className="category_submenu_ts"
              onClick={() => menuHandler(subCat._id)}
            >
              {subCat.name}
            </p>
            )

          ))}
        </div>
      </div>
    </div>
  );
}
