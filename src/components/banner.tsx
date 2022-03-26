import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Banner() {
  const [search, setSearch] = useState("");
  const styles = {
    paperContainer: {
      height: 650,
      width: "100%",
      backgroundSize: "auto",
      backgroundImage: `url(${"https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"})`,
    },
  };

  const searchGoogle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = "https://www.google.com/search?q=" + search;
  };

  return (
    <Box style={styles.paperContainer}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item>
          <form onSubmit={searchGoogle}>
            <Typography
              sx={{ color: "#fff", fontSize: "100px", marginTop: 20 }}
            >
              ร้านอร่อยอยู่ที่ไหน ?
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "25px", marginTop: 10 }}>
              หาได้ที่นี่เรามีคำตอบ
            </Typography>
            <TextField
              type="search"
              placeholder="ค้นหาร้านอาหารที่ชอบ"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 5,
                width: "100%",
              }}
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
