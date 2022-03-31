import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile";
import Body from "./pages/reviewpage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signup";
import StorePage from "./pages/storepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/store" element={<StorePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
