import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import StoreModel from "../models/StoreModel";

interface BannerProps {
  setListStore: React.Dispatch<
    React.SetStateAction<StoreModel[] | null | undefined>
  >;
  listStore: StoreModel[] | null | undefined;
  fetchData(): void;
}

export default function Banner({
  setListStore,
  listStore,
  fetchData,
}: BannerProps) {
  const [search, setSearch] = useState("");
  const styles = {
    paperContainer: {
      height: 650,
      width: "100%",
      backgroundSize: "auto",
      backgroundImage: `url(${"https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"})`,
    },
  };

  const searchGoogle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const searchName = listStore?.filter((store: StoreModel) =>
        store.name.includes(search)
      );

      setListStore(searchName);
    },
    [listStore, search, setListStore]
  );

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
              id="search"
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
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="button"
                onClick={fetchData}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  padding: "5px 10px",
                  border: "1px solid #fff",
                  cursor: "pointer",
                  marginTop: 3,
                }}
              >
                ล้าง
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
