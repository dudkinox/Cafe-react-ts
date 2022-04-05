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

export default function StorePage1() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [tel, setTel] = useState("");
  const [web, setWeb] = useState("");
  const [map, setLinkmap] = useState("");
  const [image, setImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();

  const styles = {
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  };

  const goBack = () => {
    navigate("/");
  };

  const imageChange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImage(e.target.files[0]);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (previewImage) {
      StoreService.uploadImageStore(previewImage, token).then(
        async (url): Promise<void> => {}
      );
    }
    StoreService.UpdateStoreId(token, name, address, time, tel, web, map).then(
      (res) => {
        if (res.data === "อัพเดตข้อมูลแล้ว") {
          setIsLoading(false);
        }
      }
    );
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
      setImage(res.image);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {}, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
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
            {previewImage && (
              <Box component="div">
                <img
                  src={URL.createObjectURL(previewImage)}
                  style={styles.image}
                  alt="Thumb"
                />
              </Box>
            )}
            {image && !previewImage && (
              <Box component="div">
                <img src={image} style={styles.image} alt="Thumb" />
              </Box>
            )}
            <Button
              sx={{ marginBottom: 3 }}
              variant="contained"
              component="label"
            >
              Upload File
              <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                <PersonIcon sx={{ color: "white" }} />
              </Avatar>
              <input type="file" hidden onChange={imageChange as any} />
            </Button>
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
                    placeholder="เบอร์โทรติดต่อ"
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
