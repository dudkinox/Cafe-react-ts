import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import "./App.css";
import TabNavBar from "./components/TabNavBar";
import { Themes } from "./themes/color";

function App() {
  return (
    <div>
      <Container maxWidth="xl">
        <AppBar position="static" sx={{ backgroundColor: Themes.white }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <img
                  src="assets/image/logo.png"
                  width="190"
                  height="190"
                  alt=""
                />
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                LOGO
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <TabNavBar />
      </Container>
    </div>
  );
}

export default App;
