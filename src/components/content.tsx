import { Container, Grid, Typography } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Themes } from "../themes/color";
import CardCoffee from "./card";

export default function ConnTent() {
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
        <Grid item xs={4}>
          <CardCoffee />
        </Grid>
        <Grid item xs={4}>
          <CardCoffee />
        </Grid>
        <Grid item xs={4}>
          <CardCoffee />
        </Grid>
      </Grid>
    </Container>
  );
}
