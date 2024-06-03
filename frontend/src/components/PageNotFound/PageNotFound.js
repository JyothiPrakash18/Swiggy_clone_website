import React from "react";
import "./PageNotFound.css";
import Ilustration from "../../assets/Ilustration.png";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <section className="ErrorPage__section">
        <div className="mi_home_container">
          <div className="ErrorPage__layout">
            <div className="ErrorPage__content">
              <div className="ErrorPage__text">
                <h1 className="ErrorPage__title_fs">Oops....</h1>
                <h2 className="ErrorPage__subtitle_fs">Something went wrong</h2>
                <p className="ErrorPage__description">
                  This page doesn't exist or was removed! We suggest you back to
                  home.
                </p>
                <button
                  className="mi_btn mi_btn_large ErrorPage__btn"
                  onClick={() => navigate(-1)}
                >
                  <i class="fa-solid fa-arrow-left"></i>
                  Back to previous page
                </button>
                <button
                  className="mi_btn mi_btn_link error_link"
                  onClick={() => navigate("/")}
                >
                  <i class="fa-solid fa-home"></i>
                  <span> Back to Home</span>
                </button>
              </div>
              <div className="ErrorPage__image">
                <img src={Ilustration} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
