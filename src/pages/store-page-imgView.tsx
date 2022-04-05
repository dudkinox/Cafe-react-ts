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

export default function StoreImgView() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [image, setImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [isbox, setBox] = useState([]);

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

  const Getimage = () => {
    const box = [];
    for (let i = 0; i < image.length; i++) {
      box.push(
        <Grid item>
          <Box component="div">
            <img src={image[i]} style={styles.image} alt="Thumb" />
          </Box>
        </Grid>
      );
    }
    return box[1];
  };

  const goBack = () => {
    navigate("/store");
  };

  const imageChange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImage(e.target.files[0]);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    if (previewImage) {
      StoreService.uploadImageStoreView(previewImage, token).then(
        async (url): Promise<void> => {
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    StoreService.getImgStoreViewId(token).then((res) => {
      if (res.image.length !== 0) {
        setImage(res.image);
      }
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
              <Grid container spacing={1}>
                <>
                  <Getimage />
                </>
              </Grid>
              //   <Box component="div">
              //     <img src={image} style={styles.image} alt="Thumb" />
              //   </Box>
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
              เพิ่มรูปบรรยากาศ
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
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
