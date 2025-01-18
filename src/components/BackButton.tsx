import { ArrowBack } from "@mui/icons-material";
import { Button, Icon } from "@mui/material";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <Button onClick={handleClick} sx={{borderRadius: "50%"}}>
      <Icon>
        <ArrowBack/>
      </Icon>
    </Button>
  )
}