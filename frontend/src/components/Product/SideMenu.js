import React, { useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

const SideMenu = () => {
  const {category} = useSelector(state => state.branches)
  
  console.log(category);

  const [ShowDropdown, setShowDropdown] = useState(category[0]?._id);
  console.log(ShowDropdown);
  return (
    <div className="product_category">
      <div className="product_category_wrapper">
        <h1 className="section_subheading_ts margin_bottom">Menu Categories</h1>
        <article className="menu_category">
          <div className="accordion" id="accordionExample">
            {category.length > 0 &&
              category.map((cat, index) => (
                <Category
                  key={cat._id}
                  index={index}
                  category={cat}
                  ShowDropdown={ShowDropdown}
                  setShowDropdown={setShowDropdown}
                />
              ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default SideMenu;
