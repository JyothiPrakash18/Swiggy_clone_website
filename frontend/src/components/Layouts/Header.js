import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Drawer from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/apis/loginApis";
import EmptyCart from "./Navbar/EmptyCart";
import NavCart from "./Navbar/NavCart";
import CartSubItems from "../Product/CartSubItems";
import { toast } from "react-toastify";
import { clearMessage } from "../../store/slices/loginSlice";

let useClickOutside = (handler) => {
  let PageNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!PageNode?.current?.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return PageNode;
};

const Header = ({ item }) => {
  const [SearchbarOpen, setSearchbarOpen] = useState(false);
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const [profileClickBtn, setProfileClickBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, customer, Message } = useSelector(
    (state) => state.login
  );
  const { items } = useSelector((state) => state.products);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
  };

  useEffect(() => {
    if (Message) {
      toast(Message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [Message]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearMessage());
  //   }
  // },[logoutHandler]);

  const ProfileNode = useClickOutside(() => {
    setProfileClickBtn(false);
  });

  const DrawerNode = useClickOutside(() => {
    setOpenSidebar(false);
  });
  return (
    <>
      <header className="site_header">
        <div className="mi_container">
          <nav className="site_navbar">
            <Link to="/" className="brand_logo">
              <img src={Logo} alt="logo" />
            </Link>
            <ul className="site_menuList">
              <li className="site_menuItem">
                <div className="nav__search_bar_space">
                  <div
                    className={`nav__search_bar ${SearchbarOpen && "active"}`}
                  >
                    <i class="bx bx-search"></i>
                    <input type="text" placeholder="Search your foods" />
                    <div
                      className="nav__search_icon"
                      onClick={() => setSearchbarOpen(false)}
                    >
                      <i class="bx bx-x"></i>
                    </div>
                  </div>
                </div>
                {!SearchbarOpen && (
                  <div
                    className="menuLink"
                    onClick={() => setSearchbarOpen(true)}
                  >
                    <i className="bx bx-search"></i>
                    <p className="menuLink_ts">Search</p>
                  </div>
                )}
              </li>
              <li className="site_menuItem">
                <Link className="menuLink">
                  <i className="bx bx-info-circle"></i>
                  <p className="menuLink_ts">Help</p>
                </Link>
              </li>

              <li className="site_menuItem carting_list">
                <Link className="menuLink">
                  <i className="bx bx-shopping-bag"></i>
                  <p className="menuLink_ts">
                    Cart {items.length > 0 ? <>({items.length})</> : <></>}{" "}
                  </p>
                </Link>
                <div className="cart_dropdown">
                  <div className="cart_wrapper">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <CartSubItems key={item._id} item={item} />
                      ))
                    ) : (
                      <EmptyCart />
                    )}
                  </div>
                </div>
              </li>
              {isAuthenticated ? (
                <li className="site_menuItem">
                  <div className="profile_options">
                    <div className="Header__menu_item" ref={ProfileNode}>
                      <div className="Header__profile_wrapper">
                        <div
                          className="Header__profile_space"
                          onClick={() => setProfileClickBtn(!profileClickBtn)}
                        >
                          <div className="Header__profile_picture">
                            {customer.images && (
                              <img src={customer.images} alt="Profile" />
                            )}
                          </div>
                        </div>

                        <div
                          className={`Header__profile_dropdown ${
                            profileClickBtn && "active"
                          }`}
                        >
                          <div className="Profile_dropdown_list">
                            <div className="Profile_dropdown_header">
                              <div className="dropdown_header_user">
                                <div className="Header__profile_space_inner">
                                  <div className="Header__profile_picture_inner">
                                    {customer.images && (
                                      <img
                                        src={customer.images}
                                        alt="Profile"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div className="dropdown__header_info">
                                  <div className="user_name_and_role">
                                    <h1 className="User_name_fs no_space_wrap">
                                      {customer.name}
                                    </h1>
                                    <div className="Role_ico">
                                      <span>User</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="Profile_dropdown_body">
                              <div
                                className="dropdown__menu"
                                onClick={() => {
                                  navigate("/profile");
                                  setProfileClickBtn(false);
                                }}
                              >
                                <i class="bx bx-user"></i>
                                <div className="dropdown__menu_link">
                                  Profile
                                </div>
                              </div>

                              <div className="dropdown__menu">
                                <i class="bx bx-cog"></i>
                                <p className="dropdown__menu_link">Settings</p>
                              </div>
                            </div>
                            <div className="Profile_dropdown_footer">
                              <div
                                className="dropdown__menu"
                                onClick={logoutHandler}
                              >
                                <i class="bx bx-log-out"></i>
                                <p className="dropdown__menu_link">Sign Out</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  className="site_menuItem"
                  onClick={() => setOpenSidebar(true)}
                >
                  <div className="menuLink">
                    <i className="bx bx-user"></i>
                    <p className="menuLink_ts">Sign In</p>
                  </div>
                </li>
              )}
            </ul>
          </nav>

          <div ref={DrawerNode}>
            <Drawer OpenSidebar={OpenSidebar} setOpenSidebar={setOpenSidebar} />
          </div>

          {OpenSidebar && <div className="Background_overlay"></div>}
        </div>
      </header>
    </>
  );
};

export default Header;
