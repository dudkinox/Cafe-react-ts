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
import Loading from "../components/loading";
import Alerts from "../components/alert";
import StoreService from "../services/StoreService";

const theme = createTheme();

export default function StorePage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isAlert, setIsAlert] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [tel, setTel] = useState("");
  const [web, setWeb] = useState("");
  const [map, setLinkmap] = useState("");
  const [image, setImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<string | undefined>("");

  const goBack = () => {
    navigate("/");
  };

  const preview = (
    event: React.ChangeEvent<HTMLInputElement> | null | FileList
  ) => {
    // setImage(event.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      // console.log(reader.result);
      setPreviewImage(reader.result?.toString());
      console.log(previewImage);
    };
    reader.readAsDataURL(image[0]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // setIsLoading(true);
    // StoreService.UpdateStoreId(token, name, address, time, tel, web, map).then(
    //   (res) => {
    //     if (res.data === "อัพเดตข้อมูลแล้ว") {
    //       setIsLoading(false);
    //     }
    //   }
    // );
  };

  useEffect(() => {
    setIsLoading(true);
    StoreService.getStoreId(token).then((res) => {
      setName(res.name);
      setAddress(res.address);
      setTime(res.open);
      setTel(res.tel);
      setWeb(res.website);
      setLinkmap(res.latitude);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {}, []);

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
            <Button
              sx={{ marginBottom: 3 }}
              variant="contained"
              component="label"
            >
              Upload File
              <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                <PersonIcon sx={{ color: "white" }} />
              </Avatar>
              <input
                type="file"
                hidden
                onChange={(e) => preview(e.target.files)}
              />
            </Button>
            {previewImage !== "" ? (
              <Box component="div">
                <img src={previewImage} />
              </Box>
            ) : (
              <></>
            )}
            <Typography component="h1" variant="h5">
              แก้ไขร้านคาเฟ่
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={name === "" ? true : false}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่อร้าน"
                    value={name}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={address === "" ? true : false}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ข้อมูลร้าน"
                    value={address}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={time === "" ? true : false}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="เวลาทำการ"
                    value={time}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={tel === "" ? true : false}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="เบอร์โทรร้าน"
                    value={tel}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={web === "" ? true : false}
                    onChange={(e) => setWeb(e.target.value)}
                    placeholder="เว็บไซต์"
                    value={web}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={map === "" ? true : false}
                    onChange={(e) => setLinkmap(e.target.value)}
                    placeholder="Link GoogleMap"
                    value={map}
                    type="text"
                  />
                </Grid>
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
