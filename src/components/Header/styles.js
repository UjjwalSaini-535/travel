import { makeStyles, alpha } from "@material-ui/core";

export default makeStyles((theme) => ({
  title: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  "react-mapbox-ac-suggestion": {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      border: "none",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
    },
    marginRight: 0,
    marginLeft: 0,
    "&::placeholder": {
      color: "white",
    },
    border: "none",
    color: "white",
    height: "100%",
    width: "auto",
    fontSize: "1rem",
  },

  "react-mapbox-ac-input": {
    marginBottom: "1.5rem",
  },
}));
