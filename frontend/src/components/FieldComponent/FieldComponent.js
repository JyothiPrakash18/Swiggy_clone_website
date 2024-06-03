import React from "react";
import "../connectForm/Form.css";
import "./FieldComponent.css";

const FieldComponent = ({
  form,
  field,
  error,
  isPassword,
  showPassword,
  setShowPassword,
  ...props
}) => {
  const showError = form.touched[field.name] && form.errors[field.name];

  const handleClick = () => {
    if (showError) {
      form.setFieldValue(field.name, "");
      form.setFieldTouched(field.name, false);
    }
  };

  return (
    <>
      {/* <div className={`input_space ${showError ? "error" : ""}`}>
        <input
          {...field}
          {...props}
          placeholder={showError ? "" : props.plname}
          className={showError ? "error-input" : ""}
          onClick={handleClick}
        />
        {showError && <div className="error-message">{error}</div>}
      </div> */}
      <div className={`mi_input_space  ${showError && "error"}`}>
        <div className={`mi_input_label ${showError && "error"}`}>
          <span>{showError ? error : props.plname}</span>
        </div>
        <div className={`mi_input_field ${isPassword && "password__area"}`}>
          <input
            {...field}
            {...props}
            className={showError ? "error-input" : ""}
            onClick={handleClick}
          />
          {isPassword && (
            <div
              className="show__password_wrap"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i class="bx bx-hide"></i>
              ) : (
                <i class="bx bx-show-alt"></i>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FieldComponent;
