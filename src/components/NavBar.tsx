import { AppBar, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function NavBar() {
  return (
    <AppBar position="sticky" color="inherit" >
      <Toolbar >
        <Link
          component={RouterLink}
          to={"/"}
          variant="h6"
          color="primary"
          underline="none"
          padding={1}
        >
          TieBreaker
        </Link>
        <img src="/assets/logo.jpg" width={120} height={50} />
      </Toolbar>
    </AppBar>
  );
}