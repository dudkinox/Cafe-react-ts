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
  const [photo, setPhoto] = useState<any>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  function createData(food: string, photo: string, price: number): Data {
    return {
      food,
      photo,
      price,
    };
  }

  const rows = [
    createData("ราเมน", "image", 1000),
    createData("บะหมี่", "image", 1000),
    createData("คะน้าหมูกรอบ", "image", 1000),
    createData("ซูชิ", "image", 1000),
    createData("บะหมี่หยก", "image", 1000),
    createData("กะเพรา", "image", 1000),
    createData("ข้าวเปล่า", "image", 1000),
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
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
  ];

  const imageChange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(name);
    console.log(photo);
    console.log(price);
  };

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
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  error={photo === "" ? true : false}
                  onChange={imageChange as any}
                  placeholder="Name food"
                  value={photo}
                  type="file"
                />
              </Grid>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  error={price <= 0 ? true : false}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Price food (THB)"
                  value={price}
                  type="number"
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
