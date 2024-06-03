import React from 'react'
import SocialIcon from '../UI/SocialIcon/SocialIcon'
import { SocialIcons } from '../../config/social-icons'

const Footer = () => {
  return (
    <footer className="site_footer">
      <div className="mi_container">
        <div className="footer_inner_container">
          <p className="mi_note footer_ts">
            &copy; Rishi's 2023, All Rights are Reserved
          </p>
          <div className="footer_social_media_list">
          <div className="footer_social_media_list">
                {SocialIcons.map((socialIcon) => <SocialIcon key={socialIcon.id.toString()} iconName={socialIcon.name} link ={socialIcon.link} />)}
              </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer