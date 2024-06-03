import React from 'react';
import { useNavigate } from 'react-router-dom';


const EachBranch = ({branch}) => {
    
    const {_id,name, address} = branch;
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/branches/${_id}`) 
    }


  return (
    <div className="shopie_card" onClick ={() =>onClickHandler(_id)} >
            <div className="shopie_content_wrap">
                <div className="shopie_image_banner">
                    <div className="img_space"></div>
                </div>
                <div className="promotion_label">
                    <div className="_1kXWW">Promoted</div>
                </div>
                <div className="shopie_content">
                    <div className="shop_title_ts">{name}</div>
                    <div
                        className="shop_subtitle_ts"
                        title="South Indian, North Indian, Sweets, Chinese">
                        {address}
                    </div>
                </div>
                <div className="shop_rating_cards">
                    <div className="rating_card">
                        <span className="icon-star rating_ts"></span>
                        <span>4.3</span>
                    </div>
                    <div>•</div>
                    <div>29 MINS</div>
                    <div>•</div>
                    <div className="price_ts">₹250 FOR TWO</div>
                </div>
            </div>
            <div className="shopie_action">
                <span role="button" aria-label="Open" className="_2ECk4 _24tlh">
                    Quick View
                </span>
            </div>
        </div>
  )
}

export default EachBranch