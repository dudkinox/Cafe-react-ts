import { Container, Grid, Typography } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Themes } from "../themes/color";
import CardCoffee from "./card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StoreModel from "../models/StoreModel";
import StoreService from "../services/StoreService";

export default function ConnTent() {
  const [listStore, setListStore] = useState<StoreModel[] | null>();
  const navigate = useNavigate();
  const goToReview = (id: string) => {
    navigate(`/review/${id}`);
  };

  useEffect(() => {
    StoreService.getAllStore().then((res) => {
      console.log(res);
      setListStore(res);
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant="h2">
            <LocalDiningIcon
              sx={{ fontSize: 50, marginTop: 5, color: Themes.primary }}
            />
            &nbsp; อัปเดตเนื้อหาล่าสุด
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3" sx={{ marginTop: 5 }}>
            ร้านกาแฟ
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ margin: 3 }}>
        {listStore?.map((store) => (
          <Grid item xs={4}>
            <CardCoffee onClick={() => goToReview("1")} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
