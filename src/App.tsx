import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./pages/reviewpage";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
