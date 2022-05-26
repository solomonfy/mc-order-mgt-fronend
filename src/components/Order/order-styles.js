import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    alignItems: "center",
  },
  title: {
    marginTop: "5%",
    marginBottom: "2%",
    alignItems: "center",
  },
  header: {
    marginTop: "6%",
    marginLeft: "10%",
    width: "80%",
  },
  tableHeader: {
    backgroundColor: "#333",
    // color: theme.palette.common.white,
    // fontSize: 14,
  },
  tableHeaderRows: {
    color: theme.palette.common.white,
    fontSize: 18,
  },
}));
