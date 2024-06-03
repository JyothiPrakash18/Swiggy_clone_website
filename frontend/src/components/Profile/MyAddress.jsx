import React, {  useEffect, useState } from "react";
import AddressCard from "../Layouts/AddressCard";
import AddressDrawer from "../Layouts/AddressDrawer";
import EditAddressDrawer from "../Layouts/EditAddressDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getAddressByCusId } from "../../store/apis/loginApis";
import { clearMessage } from "../../store/slices/loginSlice";

export default function MyAddress() {
  const [openAddress, setOpenAddress] = useState(false);
  const [AddressEdit, setAddressEdit] = useState(false);
  const [addressUpdated, setAddressUpdated] = useState(false);
  const { customer = {} } = useSelector((state) => state.login);
  const { address = {} } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  
  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    if (token) {
      dispatch(getAddressByCusId({ token, customerId: customer._id }));
    }
  }, [dispatch, token, customer._id, addressUpdated]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  return (
    <>
      <div className="profile_side_area">
        <div class="delivery_content_info">
          <div class="carting_headline">
            <h1 class="carting_headline_ts">Manage a delivery address</h1>
            <h1 class="carting_subheadline_ts">
              You can add, update or delete a delivery address
            </h1>
          </div>
          <div class="address_container_list">
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
                  />
                ))}
              </>
            )}

            {address.length < 3 && (
              <>
                <div class="address_card">
                  <h1 class="address_title_ts">New Address</h1>
                  <p class="address_body_ts">Please add your new address</p>
                  <div class="address_action">
                    <button
                      class="mi_btn mi_btn_sm mi_btn_primary"
                      onClick={() => setOpenAddress((prev) => !prev)}
                    >
                      Add New Address
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AddressDrawer
        openAddress={openAddress}
        setOpenAddress={setOpenAddress}
      />

      <EditAddressDrawer
        openAddress={AddressEdit}
        setOpenAddress={setAddressEdit}
        setAddressUpdated={setAddressUpdated}
        // key={addressUpdated}
      />
    </>
  );
}
