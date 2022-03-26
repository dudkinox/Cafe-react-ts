import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Banner from "../components/banner";
import Conntent from "../components/content";
import Header from "../components/header";

export default function Body() {
  return (
    <>
      <Header />
      <Banner />
      <Conntent />;
    </>
  );
}
