import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ListType } from "../enum/ListTypeRegister";
import AccountService from "../services/AccountService";
import Alerts from "../components/alert";
import Loading from "../components/loading";
import Header from "../components/header";
import PersonIcon from "@mui/icons-material/Person";

const theme = createTheme();

export default function Profile() {
  const navigate = useNavigate();
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordconfirm, setPasswordConfirm] = React.useState("");
  const [isAlert, setIsAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ischecking, setChecking] = React.useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fullname !== "") {
      if (tel !== "") {
        if (password !== "" && password === passwordconfirm) {
        }
      }
    }
  };

  const optionSelect = [
    {
      value: ListType.USER,
    },
    {
      value: ListType.EMPLOYER,
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <Alerts
        message={
          ischecking === true
            ? "สมัครสมาชิกสำเร็จ"
            : "กรุณากรอกข้อมูลให้ถูกต้อง"
        }
        show={isAlert}
        severity={ischecking === true ? "success" : "error"}
        setIsAlert={setIsAlert}
      />
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon sx={{ color: "white" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    disabled
                    autoComplete="email"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={email === "" ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                    id="fullname"
                    label="Fullname"
                    name="fullname"
                    autoComplete="fullname"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={tel === "" ? true : false}
                    onChange={(e) => setTel(e.target.value)}
                    id="tel"
                    label="Tel"
                    name="tel"
                    autoComplete="tel"
                    value={tel}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    name="passwordconfirm"
                    label="PasswordConfirm"
                    type="password"
                    id="passwordconfirm"
                    autoComplete="new-passwordconfirm"
                    value={passwordconfirm}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Commit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      );
    </>
  );
}
