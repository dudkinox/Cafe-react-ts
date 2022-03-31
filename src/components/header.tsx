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
import { Themes } from "../themes/color";
import ModalAlert from "./Modal";
import { useEffect, useState } from "react";
import StoreService from "../services/StoreService";
import Loading from "./loading";
import StoreModel from "../models/StoreModel";

interface HeaderProps {
  email: string;
  name: string;
  type: string;
  token: any;
  checkStore: any;
}

export default function Header({
  email,
  name,
  type,
  token,
  checkStore,
}: HeaderProps) {
  const navigate = useNavigate();
  const [isProfile, setIsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToSignIn = () => {
    if (type === undefined) {
      navigate("/signIn");
    } else {
      setIsProfile(true);
    }
  };

  const closeProfile = () => {
    setIsProfile(false);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const goLogout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  const goStore = () => {
    navigate("/store");
  };

  const goProfile = () => {
    navigate("/profile");
  };

  const createStore = () => {
    setIsLoading(true);
    StoreService.createStore("", token, "", "", "", "", "", true, "", 0, "")
      .then((res: any) => {
        setIsLoading(false);
        setTimeout(() => {
          if (res.data === true) {
            navigate("/store");
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading && <Loading />}
      {isProfile && (
        <ModalAlert
          show={isProfile}
          handleClose={closeProfile}
          title="ข้อมูลส่วนตัว"
          detail={`ชื่อ: ${name}\nอีเมล: ${email}`}
          buttonSubmitted="Update profile"
          buttonCancel="Logout"
          functionSubmitted={goProfile}
          functionCancel={goLogout}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: Themes.primary }}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={3}>
                <Typography variant="inherit" component="span">
                  ค้นหาร้านอาหารที่ชอบ เน้นรีวิวจริง อร่อยจริง |
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography variant="inherit" component="span">
                  ต้อนรับคุณ : {name}
                </Typography>
              </Grid>
              {type === "employer" && checkStore === false && (
                <Grid item xs={1.1}>
                  <Link
                    onClick={createStore}
                    sx={{ cursor: "pointer" }}
                    underline="none"
                  >
                    <Typography sx={{ color: Themes.white }}>
                      สร้างร้านค้า
                    </Typography>
                  </Link>
                </Grid>
              )}

              {type === "employer" && checkStore !== false && (
                <Grid item xs={1.1}>
                  <Link
                    onClick={goStore}
                    sx={{ cursor: "pointer" }}
                    underline="none"
                  >
                    <Typography sx={{ color: Themes.white }}>
                      แก้ไขร้านค้า
                    </Typography>
                  </Link>
                </Grid>
              )}

              <Grid item xs={2}>
                <Link
                  underline="none"
                  onClick={goToSignIn}
                  sx={{ cursor: "pointer" }}
                >
                  <PersonIcon sx={{ color: "white" }} />
                  <Typography sx={{ color: Themes.white }}>{type}</Typography>
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
