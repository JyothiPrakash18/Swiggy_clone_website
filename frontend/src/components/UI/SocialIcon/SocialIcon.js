import React, { memo } from 'react';
import FontAwesomeComponent from '../FontAwesome/FontAwesomeComp';
import Styles from '../../../css/CommonStyles.module.css';


const SocialIcon = ({iconName, link}) => {

    return (
      <div className="social_icon">
          <a href={link} target='_blank' className={Styles.SocialIcons}><FontAwesomeComponent fontIcon={iconName} className={`bx ${iconName}`} /></a>
      </div>
    )
  }
  
  export default memo(SocialIcon)