import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Content from "../components/content";
import Footer from "../components/footer";
import Header from "../components/header";
import Loading from "../components/loading";
import AccountService from "../services/AccountService";

export default function Body() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsLoading(true);
    AccountService.getFindById(token).then((res) => {
      setType(res.type);
      setEmail(res.email);
      setName(res.name);
      setIsLoading(false);
    });
  }, [token]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Header email={email} name={name} type={type} />
        <Banner />
        <Content />
        <Footer />
      </>
    );
  }
}
