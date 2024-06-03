import React, { useEffect } from "react";
import TopHeroSection from "./TopHeroSection";
import { useDispatch, useSelector } from "react-redux";
import EachBranch from "./EachBranch";
import { getBranches } from "../../store/apis/branchesApis";

const Home = () => {
  const { branches } = useSelector((state) => state.branches);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranches());
  }, []);
  return (
    <>
      <TopHeroSection />
      <section className="media_post_list">
        <div className="mi_container">
          <div className="section_title">
            <article className="solution_content_space">
              <h1 className="mi_title showcase_title max_width special_title">
                Pick Your Favourite
              </h1>
            </article>
          </div>
        </div>
      </section>

      <section className="shopie_section">
        <div className="mi_container">
          <div className="home_store_list_container">
            {branches &&
              branches.map((branch) => (
                <EachBranch key={branch._id} branch={branch} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
