import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedTable from "../components/Table";
import { Data, HeadCell } from "../models/TableModel";
import { Themes } from "../themes/color";

export default function MenuFood() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function createData(food: string, photo: string): Data {
    return {
      food,
      photo,
    };
  }

  const rows = [
    createData("ราเมน", "image"),
    createData("บะหมี่", "image"),
    createData("คะน้าหมูกรอบ", "image"),
    createData("ซูชิ", "image"),
    createData("บะหมี่หยก", "image"),
    createData("กะเพรา", "image"),
    createData("ข้าวเปล่า", "image"),
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "food",
      numeric: true,
      disablePadding: false,
      label: "Food",
    },
    {
      id: "photo",
      numeric: true,
      disablePadding: false,
      label: "Photo",
    },
  ];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const goBack = () => {
    navigate("/store");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EnhancedTable
            title="Manage menu food"
            rows={rows}
            headCells={headCells}
          />
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  error={name === "" ? true : false}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name food"
                  value={name}
                  type="file"
                />
              </Grid>
              <Grid item xs={6}>
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
              เพิ่มเมนูอาหาร
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
