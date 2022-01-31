import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#7800EF",
      dark: "#5400A7",
      light: "#A04CF3",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#252A3C",
      secondary: "#252A3C70",
      disabled: "#252A3C57",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", -apple-system, "sans-serif", "Arial"',
    fontSize: 16,
    h1: {
      fontSize: "2.27em",
      fontWeight: 500,
      color: "#252A3C",
    },
    h2: {
      fontSize: "1.98em",
      fontWeight: 500,
      color: "#252A3C",
    },
    h3: {
      fontSize: "1.67em",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.41em",
      fontWeight: 500,
      color: "#252A3C",
    },
    h5: {
      fontSize: "1.27em",
      fontWeight: 500,
      color: "#252A3C",
    },
    h6: {
      fontSize: "1.17em",
      fontWeight: 500,
      color: "#252A3C",
    },
    body1: {
      fontSize: ".93275em",
      fontWeight: 400,
    },
    body2: {
      fontSize: ".82375em",
      fontWeight: 400,
    },
    button: {
      fontSize: ".875em",
      textTransform: "none",
    },
  },
});

export default Theme;
