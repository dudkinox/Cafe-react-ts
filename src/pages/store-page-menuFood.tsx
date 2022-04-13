import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Themes } from "../themes/color";

export default function MenuFood() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const goBack = () => {
    navigate("/store");
  };

  return (
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
                  placeholder="Name food"
                  value={name}
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
}
