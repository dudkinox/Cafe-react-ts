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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedTable from "../components/Table";
import { Data, HeadCell } from "../models/TableModel";
import FoodService from "../services/FoodService";
import { Themes } from "../themes/color";
import Loading from "../components/loading";

export default function MenuFood() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<any>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [rows, setRows] = useState<Data[]>([]);
  const id = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function createData(food: string, photo: string, price: string): Data {
    return {
      food,
      photo,
      price,
    };
  }

  useEffect(() => {
    if (refresh) {
      setIsLoading(true);
      FoodService.getFoodByID(id).then((res) => {
        const data = res.list.map((item) =>
          createData(item.name, item.image, item.price)
        );
        setRows(data);
        setRefresh(false);
        setIsLoading(false);
      });
    }
  }, [id, refresh]);

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
    event.preventDefault();
    const food = {
      name: name,
      image: "",
      price: price.toString(),
    };
    setIsLoading(true);
    FoodService.addFoodByID(id, food, photo)
      .then((res) => {
        if (res.data === "success") {
          setRefresh(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.data === "success") {
          setRefresh(true);
          setIsLoading(false);
        }
      });
  };

  const goBack = () => {
    navigate("/store");
  };

  return (
    <>
      {isLoading ? <Loading /> : <></>}
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
                  <Button variant="contained" component="label">
                    {photo ? photo.name : "Upload Image"}
                    <input type="file" hidden onChange={imageChange as any} />
                  </Button>
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
    </>
  );
}
