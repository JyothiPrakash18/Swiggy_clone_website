import React from 'react';

const ImagePreview = ({ image }) => {
  return (
    <div className="image-preview">
      {image && <img src={image} alt="Preview" style={{ width: "100px", height: "100px" }} />}
    </div>
  );
};

export default ImagePreview;
