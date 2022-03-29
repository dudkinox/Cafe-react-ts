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

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [type, setType] = React.useState("");
  const [accept, setAccept] = React.useState(false);
  const [isAlert, setIsAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ischecking, setChecking] = React.useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstname !== "") {
      if (lastname !== "") {
        if (email !== "") {
          if (tel !== "") {
            if (password !== "" && password === passwordConfirm) {
              if (type !== "") {
                if (accept !== false) {
                  setIsLoading(true);
                  AccountService.postRegister(
                    email,
                    "",
                    firstname + " " + lastname,
                    password,
                    true,
                    tel,
                    type === "ผู้ใช้งานทั่วไป" ? "user" : "employer"
                  )
                    .then((res: any) => {
                      setChecking(res.data);
                      setIsAlert(true);
                      setIsLoading(false);
                      setTimeout(() => {
                        if (res.data === true) {
                          navigate("/signIn");
                        }
                      }, 1000);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }
            }
          }
        }
      }
    }
  };

  const goToSignIn = () => {
    navigate("/signIn");
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    error={firstname === "" ? true : false}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    error={lastname === "" ? true : false}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={email === "" ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    required
                    fullWidth
                    error={password === "" ? true : false}
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
                    required
                    fullWidth
                    error={passwordConfirm === "" ? true : false}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    name="passwordconfirm"
                    label="PasswordConfirm"
                    type="password"
                    id="passwordconfirm"
                    autoComplete="new-passwordconfirm"
                    value={passwordConfirm}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      เลือกประเภท
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="เลือกประเภท"
                      error={type === "" ? true : false}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {optionSelect.map((option, index) => {
                        return (
                          <MenuItem value={option.value} key={index}>
                            {option.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        value="allowExtraEmails"
                        color="primary"
                        checked={accept}
                        onChange={(e) => setAccept(e.target.checked)}
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    onClick={goToSignIn}
                    sx={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      );
    </>
  );
}
