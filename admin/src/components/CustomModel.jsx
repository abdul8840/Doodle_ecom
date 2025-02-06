import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const CustomModal = ({ open, hideModal, performAction, title }) => {
  return (
    <Dialog open={open} onClose={hideModal}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{title}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={performAction} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
