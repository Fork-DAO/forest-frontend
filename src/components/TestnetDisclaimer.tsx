import { Alert } from "@mui/material";

const TestnetDisclaimer: React.FC = () => {
  return <Alert severity="warning" className="m-2">
    {"** Esto es un beta en la testnet Mumbai **"}
  </Alert>
}

export default TestnetDisclaimer;
