import { AppBar, IconButton } from "../elements";
import { ArrowBack } from "@mui/icons-material";
import { Divider, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="relative" color="transparent" sx={{}}>
      <Toolbar sx={{ columnGap: ".75rem", height: "100%" }}>
        <IconButton size="large">
          <ArrowBack />
        </IconButton>
        <Divider orientation="vertical" sx={{ height: "50%" }} />
        <Typography
          variant="h6"
          sx={{ marginLeft: ".75rem" }}
          color={(theme) => theme.palette.text.primary}>
          Event
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
