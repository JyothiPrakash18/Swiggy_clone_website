import React, { useEffect, useRef, useState } from "react";
import CartItems from "../Product/CartItems";
import Login from "../Users/Login";
import Register from "../Users/Register";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../Layouts/AddressCard";
import AddressDrawer from "../Layouts/AddressDrawer";
import { getAddressByCusId } from "../../store/apis/loginApis";
import EditAddressDrawer from "../Layouts/EditAddressDrawer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { clearMessage } from "../../store/slices/ordersSlice";

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

const Carting = () => {
  const [connect, setConnect] = useState("");
  const [openAddress, setOpenAddress] = useState(false);
  const [AddressEdit, setAddressEdit] = useState(false);
  const { customer = {} } = useSelector((state) => state.login);
  const { address = {} } = useSelector((state) => state.login);
  const { items } = useSelector((state) => state.products);
  console.log(items);
  const {Message} = useSelector((state) => state.orders);
  console.log(Message)
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const [addressUpdated, setAddressUpdated] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const params = useLocation();
  // console.log(params.state.branchId);

  const AddAddressDrawerNode = useClickOutside(() => {
    setOpenAddress(false);
  });

  const EditAddressDrawerNode = useClickOutside(() => {
    setAddressEdit(false);
  });

  useEffect(() => {
    setSelectedAddress(address[0]?._id);
  }, [address]);
  console.log(selectedAddress);

  useEffect(() => {
    if (token) {
      dispatch(getAddressByCusId({ token, customerId: customer._id }));
      
    }
  }, [addressUpdated]);

  useEffect(() => {
    if(token && Message) {
        toast(Message, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'success',
      })
    } 
  },[Message])

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);



  return (
    <div>
      <>
        <div className="page_container body_bg_color">
          <section className="carting_section">
            <div className="mi_container">
              <div className="carting_section_grid">
                <div className="carting_user_details">
                  {token ? (
                    <>
                      <div className="delivery_address_area">
                        <div className="delivery_content_info">
                          <div className="carting_headline">
                            <h1 className="carting_headline_ts">
                              Add a delivery address
                            </h1>
                            <h1 className="carting_subheadline_ts">
                              You seem to be in the new location
                            </h1>
                          </div>
                          <div className="address_container_list">
                            {address.length > 0 && (
                              <>
                                {address.map((addr, index) => (
                                  <AddressCard
                                    addr={addr}
                                    index={index}
                                    setOpenAddress={setAddressEdit}
                                    selectedAddress={selectedAddress}
                                    setSelectedAddress={setSelectedAddress}
                                    setAddressUpdated={setAddressUpdated}
                                    page={"profile"}
                                  />
                                ))}
                              </>
                            )}
                            {address.length < 3 && (
                              <>
                                <div
                                  className="address_card"
                                  onClick={() => setOpenAddress(true)}
                                >
                                  <h1 className="address_title_ts">
                                    New Address
                                  </h1>
                                  <p className="address_body_ts">
                                    Please add your new address
                                  </p>
                                  <div className="address_action">
                                    <button className="mi_btn mi_btn_sm mi_btn_primary">
                                      Add New Address
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="user_login_area">
                        <div className="user_content_info">
                          <div className="carting_headline">
                            <h1 className="carting_headline_ts">Account</h1>
                            <h1 className="carting_subheadline_ts">
                              To place your order now, log in to your existing
                              account or sign up.
                            </h1>
                          </div>
                          <div className="account_button_group">
                            <button
                              className="mi_btn mi_btn_md mi_btn_secondary"
                              onClick={() => setConnect("login")}
                            >
                              <span> Have an Account?</span>
                              <div className="btn_bold">LOG IN</div>
                            </button>
                            <button
                              className="mi_btn mi_btn_md mi_btn_primary"
                              onClick={() => setConnect("register")}
                            >
                              <span> New User?</span>
                              <div className="btn_bold">SIGN UP</div>
                            </button>
                          </div>
                          {connect === "login" && <Login />}
                          {connect === "register" && (
                            <Register setConnect={setConnect} />
                          )}
                        </div>
                        <div className="user_content_banner">
                          <img
                            src="./asset/assets/account.webp"
                            alt="account"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="carting_bill_details">
                  <CartItems
                    // subTotal={subTotal}
                    // discountAmount={discountAmount}
                    // charges={charges}
                    // finalTotal={finalTotal}
                    selectedAddress={selectedAddress}
                    id={params.state.branchId}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div ref={AddAddressDrawerNode}>
          <AddressDrawer
            openAddress={openAddress}
            setOpenAddress={setOpenAddress}
            setAddressUpdated={setAddressUpdated}
          />
        </div>

        <div ref={EditAddressDrawerNode}>
          <EditAddressDrawer
            openAddress={AddressEdit}
            setOpenAddress={setAddressEdit}
            setAddressUpdated={setAddressUpdated}
          />
        </div>

        {openAddress && <div className="Background_overlay"></div>}
        {AddressEdit && <div className="Background_overlay"></div>}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossorigin="anonymous"
        ></script>
      </>
    </div>
  );
};

export default Carting;
