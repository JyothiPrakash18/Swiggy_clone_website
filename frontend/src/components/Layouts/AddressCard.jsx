import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { delAddress, getSingleAdd } from "../../store/apis/loginApis";
import Swal from "sweetalert2";
import "../Layouts/styles/Address.css";

export default function AddressCard({
  setOpenAddress,
  addr,
  index,
  page,
  selectedAddress,
  setSelectedAddress,
  setAddressUpdated,
}) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");

  const deleteAddress = () => {
    Swal.fire({
      title: "Are you sure to delete the address?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delAddress({ token, addressId: addr._id }));
        setAddressUpdated((prev) => !prev);
        Swal.fire({
          title: "Deleted!",
          text: "Your address has been deleted.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    // Handle any side effects based on the updated state
  }, [selectedAddress, token]);

  return (
    <>
      <div key={index} onClick={() => {
          setSelectedAddress(addr._id);
        }}
        className={` address_card ${selectedAddress === addr._id && "active"}`}
      >
        {/* <div className="check_btn">
          <input
            type="radio"
            id={addr._id}
            value={selectedAddress === addr._id && selectedAddress}
          />
        </div> */}
        <div className="check_btn">
          <input
            type="radio"
            id={addr._id}
            value={addr._id}
            checked={selectedAddress === addr._id} // This line checks the radio button if selectedAddress matches addr._id
            onChange={(e) => setSelectedAddress(e.target.value)} // Assuming you have a function handleAddressSelection to update selectedAddress
          />
        </div>
        {addr.addressType && (
          <h1 className="address_title_ts text-caps">{addr.addressType}</h1>
        )}
        <p className="address_body_ts">{addr.address}</p>
        <p className="address_body_ts">{addr.doorNo}</p>
        <p className="address_body_ts">{addr.mob}</p>
        <div className="address_action">
          <button
            onClick={() => {
              setOpenAddress(true);
              dispatch(getSingleAdd({ id: addr._id, token }));
            }}
            className="mi_btn mi_btn_sm mi_btn_secondary"
          >
            Edit Address
          </button>

          {/* {page === "profile" && ( */}
          <button className="mi_btn mi_btn_sm mi_btn_secondary">
            <div className="trash_delete" onClick={deleteAddress}>
              <i className="bx bxs-trash"></i>
            </div>
          </button>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
