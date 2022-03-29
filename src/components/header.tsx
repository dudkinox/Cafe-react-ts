import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/signIn");
  };
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#eb1c24" }}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {" "}
              <Grid item xs />
              <Grid item xs={2}>
                <Typography variant="inherit" component="span">
                  ค้นหาร้านอาหารที่ชอบ เน้นรีวิวจริง อร่อยจริง |
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Link onClick={goToSignIn} sx={{ cursor: "pointer" }}>
                  <PersonIcon sx={{ color: "white" }} />
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
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
              <Grid item xs={2}>
                <Button
                  sx={{ color: "#000", fontSize: "20px" }}
                  onClick={goToHomePage}
                >
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
        </AppBar>
      </Box>
    </>
  );
}
