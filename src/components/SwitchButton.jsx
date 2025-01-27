import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import PropTypes from "prop-types";
import { Cancel, Save } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SwitchButton = ({ id, checked, handleChange, ...attributes }) => {
  const [toggle, setToggle] = useState(checked);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setToggle(checked);
  }, [checked]);

  const handleSwitchChange = () => {
    setOpen(true);
  };
  return (
    <>
      <Switch
        checked={toggle}
        onChange={() => handleSwitchChange()}
        {...attributes}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "300px",
            height: "200px",
          },
        }}>
        <DialogTitle id="dialog-title" style={{ margin: 5 }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description" style={{ margin: 5 }}>
            Do you want to continue this process?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            startIcon={<Cancel />}
            sx={{
              backgroundColor: "#dc2626",
              color: "white",
              margin: 1,
              "&:hover": {
                backgroundColor: "#ef4444",
                color: "white",
                margin: 1,
              },
            }}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              setToggle((prevState) => !prevState);
              handleChange(id);
              setOpen(false);
            }}
            startIcon={<Save />}
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              margin: 1,
              "&:hover": {
                backgroundColor: "#1877f2",
                color: "white",
                margin: 1,
              },
            }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SwitchButton;

SwitchButton.propTypes = {
  id: PropTypes.number,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};
