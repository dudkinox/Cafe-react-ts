import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import Header from "./components/header";

function App() {
  const styles = {
    paperContainer: {
      height: 650,
      width: "100%",
      backgroundSize: "auto",
      backgroundImage: `url(${"https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"})`,
    },
  };
  return (
    <>
      <Header />
      <Box style={styles.paperContainer}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item>
            <Typography sx={{ color: "#fff", fontSize: "100px" }}>
              ร้านอร่อยอยู่ที่ไหน ?
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "25px" }}>
              หาได้ที่นี่เรามีคำตอบ
            </Typography>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              style={{ backgroundColor: "white" }}
              disableClearable
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ค้นหาร้านคาเฟ่"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#eb1c24",
            height: 150,
            width: "60%",
            alignItems: "center",
            justifyContent: "center",
            direction: "column",
          }}
        ></Box>
        {/* <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {" "}
              <Grid item xs={2}>
                <IconButton size="large" edge="start" aria-label="menu" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <img
                    src="assets/image/logo.png"
                    width="120"
                    height="100"
                    alt=""
                  />
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button sx={{ color: "#000", fontSize: "20px" }}>
                  <HomeIcon sx={{ fontSize: 45 }} />
                  หน้าแรก
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button sx={{ color: "#000", fontSize: "20px" }}>
                  <RestaurantMenuOutlinedIcon sx={{ fontSize: 45 }} />
                  รีวิวร้านอาหาร
                </Button>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Toolbar>
        </AppBar> */}
      </Box>
      {/* <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography> */}
    </>
  );
}

export default App;
