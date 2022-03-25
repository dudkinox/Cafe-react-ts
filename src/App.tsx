import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#eb1c24" }}>
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Typography variant="h6" component="span">
                  ค้นหาร้านอาหารที่ชอบ เน้นรีวิวจริง อร่อยจริง
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <PersonIcon />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src="assets/image/logo.png"
                width="120"
                height="100"
                alt=""
              />
            </Typography>
            <Button sx={{ color: "#000", fontSize: "26px" }}>
              <HomeIcon sx={{ fontSize: 50 }} /> &emsp;หน้าแรก
            </Button>
            &emsp;
            <Button sx={{ color: "#000", fontSize: "26px" }}>
              <RestaurantMenuOutlinedIcon sx={{ fontSize: 50 }} />
              &emsp; รีวิวร้านอาหาร
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <img
        src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        style={{ width: "100%", height: "100%" }}
        alt=""
      />
    </>
  );
}

export default App;
