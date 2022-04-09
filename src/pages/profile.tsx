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
import PersonIcon from "@mui/icons-material/Person";
import { Themes } from "../themes/color";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import AccountModel from "../models/AccountModel";
import Loading from "../components/loading";
import { Md5 } from "md5-typescript";
import Alerts from "../components/alert";

const theme = createTheme();

export default function Profile() {
  const navigate = useNavigate();
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [passwordOldData, setPasswordOldData] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [listAccount, setListAccount] = useState<AccountModel>();
  var isLogin;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isAlert, setIsAlert] = useState(false);

  const goBack = () => {
    navigate("/");
  };

  const changePassword = () => {
    setIsChangePassword(true);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const changeOld = Md5.init(passwordOld);
    const changeNew = Md5.init(newPassword);
    if (passwordOld !== "" || newPassword !== "") {
      if (changeOld === passwordOldData && newPassword !== "") {
        AccountService.UpdateProfile(
          token,
          name,
          email,
          listAccount?.idStore,
          tel,
          listAccount?.type,
          changeNew,
          listAccount?.status
        ).then((res) => {
          setPasswordOldData(changeNew);
          setIsAlert(false);
          setIsLoading(false);
          setIsChangePassword(false);
          setPasswordOld("");
          setNewPassword("");
        });
      } else {
        setIsLoading(false);
        setIsAlert(true);
      }
    } else {
      AccountService.UpdateProfile(
        token,
        name,
        email,
        listAccount?.idStore,
        tel,
        listAccount?.type,
        passwordOldData,
        listAccount?.status
      ).then((res) => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    AccountService.getFindById(token).then((res) => {
      setListAccount(res);
      setName(res.name);
      setEmail(res.email);
      setTel(res.tel);
      setPasswordOldData(res.password);
      setIsLoading(false);
    });
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Alerts
        message={isLogin ? "เข้าสู่ระบบ" : "รหัสผ่านไม่ถูกต้อง"}
        show={isAlert}
        severity={isLogin ? "success" : "error"}
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
            <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
              <PersonIcon sx={{ color: "white" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={name === "" ? true : false}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    value={name}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={email === "" ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    value={email}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={tel === "" ? true : false}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="Phone Number"
                    value={tel}
                    type="text"
                  />
                </Grid>
                {isChangePassword && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        error={passwordOld === "" ? true : false}
                        onChange={(e) => setPasswordOld(e.target.value)}
                        label="Password Old"
                        type="password"
                        // TODO เปลี่ยนรหัสผ่าน
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        error={newPassword === "" ? true : false}
                        onChange={(e) => setNewPassword(e.target.value)}
                        label="Password New"
                        value={newPassword}
                        type="password"
                        // TODO เปลี่ยนรหัสผ่าน
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="success"
              >
                อัพเดต
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="info"
                onClick={changePassword}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={goBack}
                sx={{
                  mt: 3,
                  mb: 2,
                  color: Themes.secondary,
                  backgroundColor: Themes.primary,
                  "&:hover": {
                    backgroundColor: Themes.primary,
                  },
                }}
              >
                ยกเลิก
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      );
    </>
  );
}
