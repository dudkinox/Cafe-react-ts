import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AlertsProps {
  message: string;
  show: boolean;
  severity: AlertColor;
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Alerts({
  message,
  show,
  severity,
  setIsAlert,
}: AlertsProps) {
  return (
    <Collapse in={show}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setIsAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={severity}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
