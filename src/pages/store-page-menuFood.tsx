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

  function createData(no: string, photo: string, food: string): Data {
    return {
      no: no,
      photo,
      food,
    };
  }

  const rows = [
    createData("1", "image", "ราเมน"),
    createData("2", "image", "บะหมี่"),
    createData("3", "image", "คะน้าหมูกรอบ"),
    createData("4", "image", "ราเมน"),
    createData("5", "image", "บะหมี่"),
    createData("6", "image", "คะน้าหมูกรอบ"),
    createData("7", "image", "ราเมน"),
    createData("8", "image", "บะหมี่"),
    createData("9", "image", "คะน้าหมูกรอบ"),
    createData("10", "image", "ราเมน"),
    createData("11", "image", "บะหมี่"),
    createData("12", "image", "คะน้าหมูกรอบ"),
    createData("13", "image", "ราเมน"),
    createData("14", "image", "บะหมี่"),
    createData("15", "image", "คะน้าหมูกรอบ"),
    createData("16", "image", "ราเมน"),
    createData("17", "image", "บะหมี่"),
    createData("18", "image", "คะน้าหมูกรอบ"),
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "no",
      numeric: false,
      disablePadding: true,
      label: "Select",
    },
    {
      id: "photo",
      numeric: true,
      disablePadding: false,
      label: "Photo",
    },
    {
      id: "food",
      numeric: true,
      disablePadding: false,
      label: "Food",
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
