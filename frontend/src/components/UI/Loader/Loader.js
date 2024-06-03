import React from 'react'
import {ColorRing} from 'react-loader-spinner';
import styles from './Loader.module.css';
const Loader = ({visible}) => {
  return (
    <div className={styles.Container}>
            <div className={styles.Item}>
                <ColorRing
                    visible={visible}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        </div>
  )
}

export default Loader