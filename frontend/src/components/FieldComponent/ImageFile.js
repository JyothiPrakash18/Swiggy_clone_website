import React, { useState } from "react";

const ImageFile = ({ form, field, ...props }) => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };
  return (
    <div className={`input_space}`}>
      <input
        {...form}
        {...field}
        type="file"
        onChange={handleImageChange}
        className="form-control"
      />
      {avatarPreview && (
        <img
          src={avatarPreview}
          alt="Avatar Preview"
          style={{ width: "100px" }}
        />
      )}
    </div>
  );
};

export default ImageFile;
