import { AppBar, Toolbar, Link } from "@mui/material";
import { Link as RouterLink} from "react-router";

export default function NavBar() {
  return (
    <AppBar>
      <Toolbar>
        <Link
          component={RouterLink}
          to={"/"}
          variant="h6"
          color="inherit"
          underline="none"
          padding={1}
        >
          TieBreaker
        </Link>
      </Toolbar>
    </AppBar>
  );
}