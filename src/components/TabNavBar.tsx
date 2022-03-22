import { Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Themes } from "../themes/color";

export default function TabNavBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container sx={{ backgroundColor: Themes.primary }}>
      <Grid item xs={11}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<HomeIcon />} label="HOME" />
        </Tabs>
      </Grid>
      <Grid item xs={1}>
        <Tab icon={<PersonPinIcon />} label="Account" />
      </Grid>
    </Grid>
  );
}
