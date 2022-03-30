import { Modal, Box, Button, Grid } from "@mui/material";
import { Themes } from "../themes/color";

interface ModalAlertProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  detail: string;
  buttonSubmitted?: string;
  buttonCancel?: string;
  functionSubmitted?: () => void;
  functionCancel?: () => void;
}

export default function ModalAlert({
  show,
  handleClose,
  title,
  detail,
  buttonSubmitted,
  buttonCancel,
  functionSubmitted,
  functionCancel,
}: ModalAlertProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400, textAlign: "center" }}>
        <h2 id="parent-modal-title">{title}</h2>
        <p id="parent-modal-description">{detail}</p>
        <Grid container spacing={2}>
          {buttonSubmitted && (
            <Grid item xs={6}>
              <Button variant="outlined" onClick={functionSubmitted}>
                {buttonSubmitted}
              </Button>
            </Grid>
          )}
          {buttonCancel && (
            <Grid item xs={6}>
              <Button
                onClick={functionCancel}
                variant="outlined"
                sx={{ color: Themes.primary }}
              >
                {buttonCancel}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}
