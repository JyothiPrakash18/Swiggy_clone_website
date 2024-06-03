import React, { useRef } from "react";

export default function ProfileForm({ setOpenSidebar }) {
  const profileFileRef = useRef();
  return (
    <>
      <div className="login_forms">
        <div className="DisplayPicture__container">
          <div
            className="DisplayPicture__input"
            onClick={() => profileFileRef.current.click()}
          >
            {/* <div className={`profile__holder`}></div> */}
            <div className="add_new">
              <i class="bx bx-plus addIcon"></i>
            </div>
          </div>
          <input type="file" ref={profileFileRef} hidden />
        </div>
        <div className="login_action profile__actions">
          <button className="mi_btn mi_btn_link">Skip for Now</button>
          <button className="mi_btn mi_btn_md mi_btn_primary">
            Complete Profile
          </button>
        </div>

        <p className="item_name_ts">
          By submitting, I willingly agree to abide by and accept the Terms &
          Conditions as well as the Privacy Policy.
        </p>
      </div>
    </>
  );
}
