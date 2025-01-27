import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  label = "Field",
  error = "",
  handleChange,
  ...attributes
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      variant="standard"
      onChange={handleChange}
      error={!!error}
      helperText={error}
      {...attributes}
      InputLabelProps={{
        sx: {
          fontSize: "0.875rem",
          fontWeight: 400,
          "& .MuiFormLabel-asterisk": {
            color: "red",
          },
        },
      }}
      InputProps={{
        sx: {
          fontSize: "0.875rem",
          fontWeight: 400,
        },
        inputProps: {
          min: 1,
        },
      }}
    />
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
