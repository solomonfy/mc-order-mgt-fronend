import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    align: "center",
  },
  title: {
    marginTop: "5%",
    marginBottom: "2%",
    align: "center",
  },
  header: {
    marginTop: "6%",
    marginLeft: "10%",
    width: "80%",
  },
  tableHeader:{
      textWeight:"250px",
  }
}));
