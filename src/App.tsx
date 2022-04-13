import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Loading from "./components/loading";
import StoreModel from "./models/StoreModel";
import CommentPage from "./pages/comment-page";
import ManagePage from "./pages/manage-page";
import Profile from "./pages/profile";
import Body from "./pages/review-page";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import StorePage from "./pages/store-page";
import StoreImgView from "./pages/store-page-imgView";
import MenuFood from "./pages/store-page-menuFood";
import AccountService from "./services/AccountService";
import StoreService from "./services/StoreService";

function App() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCheckStore, setIsCheckStore] = useState<StoreModel>();
  const path = window.location.pathname;

  useEffect(() => {
    setIsLoading(true);
    AccountService.getFindById(token).then((res) => {
      setType(res.type);
      setEmail(res.email);
      setName(res.name);
    });
    StoreService.getStoreId(token).then((res) => {
      setIsCheckStore(res);
      setIsLoading(false);
    });
  }, [token]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <BrowserRouter>
          {path !== "/signIn" ? (
            <Header
              email={email}
              name={name}
              type={type}
              token={token}
              checkStore={isCheckStore}
            />
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" element={<Body />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/store" element={<StorePage />}></Route>
            <Route path="/store/addImgView" element={<StoreImgView />}></Route>
            <Route path="/store/addMenuFood:id" element={<MenuFood />}></Route>
            <Route path="/manage" element={<ManagePage />}></Route>
            <Route path="/review/:id" element={<CommentPage />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
