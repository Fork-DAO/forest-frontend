import { Alert } from "@mui/material";

const SoldOutDisclaimer: React.FC = () => {
  return <Alert severity="success" className="m-2">
    {"¡SOLD OUT!"}
  </Alert>
}

export default SoldOutDisclaimer;
