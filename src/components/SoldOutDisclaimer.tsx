import { Alert } from "@mui/material";

const SoldOutDisclaimer: React.FC = () => {
  return <Alert severity="success" className="m-2">
    {"SOLD OUT! Gracias por la colaboración, seguí el proyecto en el telegram de Fork DAO!"}
  </Alert>
}

export default SoldOutDisclaimer;
