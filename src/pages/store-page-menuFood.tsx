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
import { useCallback, useEffect, useState } from "react";
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
  const [listDelete, setListDelete] = useState<string[]>([]);

  function createData(food: string, photo: string, price: string): Data {
    return {
      food,
      photo,
      price,
    };
  }

  const keepListDelete = useCallback(
    (name: string, check: boolean) => {
      if (check) {
        listDelete.push(name);
        setListDelete(listDelete);
      } else {
        const index = listDelete.indexOf(name);
        if (index > -1) {
          listDelete.splice(index, 1);
          setListDelete(listDelete);
        }
      }
      console.log(listDelete);
    },
    [listDelete]
  );

  const handleDelete = useCallback(async () => {
    async function deleteLoop() {
      listDelete.map((name: string) =>
        FoodService.deleteFoodByID(id, name).then((res) => {
          if (res === "success") {
            setRefresh(true);
            setIsLoading(false);
          }
        })
      );
    }

    setIsLoading(true);
    await deleteLoop();
  }, [id, listDelete]);

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

  const imageChange = useCallback(
    (e: { target: { files: string | any[] } }) => {
      if (e.target.files && e.target.files.length > 0) {
        setPhoto(e.target.files[0]);
      }
    },
    []
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [id, name, photo, price]
  );

  const goBack = useCallback(() => {
    navigate("/store");
  }, [navigate]);

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
              handleDelete={handleDelete}
              keepListDelete={keepListDelete}
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
                ??????????????????????????????????????????
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
                ??????????????????
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
