import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alerts from "../components/alert";
import Loading from "../components/loading";
import Header from "../components/header";
import PersonIcon from "@mui/icons-material/Person";

const theme = createTheme();

export default function Profile() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [isAlert, setIsAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecking, setChecking] = React.useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fullName !== "") {
      if (tel !== "") {
        if (password !== "" && password === passwordConfirm) {
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Alerts
        message={
          isChecking === true
            ? "สมัครสมาชิกสำเร็จ"
            : "กรุณากรอกข้อมูลให้ถูกต้อง"
        }
        show={isAlert}
        severity={isChecking === true ? "success" : "error"}
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
                    value={passwordConfirm}
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
