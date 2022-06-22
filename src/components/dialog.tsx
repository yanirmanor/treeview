import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { TreeView } from "./treeView";

const treeData = [
  {
    id: "0",
    label: "Documents",
    children: [],
  },
];

export function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="dialog-container">
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Wiz Files
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Check Your Files System
        </DialogTitle>
        <DialogContent>
          <TreeView treeData={treeData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Closed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
