import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TableAccount from "../components/TableAccount";
import AccountService from "../services/AccountService";
import AccountModel from "../models/AccountModel";

const theme = createTheme();

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManagePage() {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (_event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  function createData(
    id: string,
    email: string,
    name: string,
    username: string,
    status: boolean,
    tel: string,
    type: string,
    verify: boolean,
    password: string,
    idStore: string
  ): AccountModel | never {
    return {
      id,
      email,
      name,
      username,
      status,
      tel,
      type,
      verify,
      password,
      idStore,
    };
  }

  const [rows, setRows] = useState<AccountModel[]>([]);

  useEffect(() => {
    AccountService.getUserAll().then((res) => {
      console.log(res);

      const data = res.map((item) =>
        createData(
          item.id,
          item.email,
          item.name,
          item.username,
          item.status,
          item.tel,
          item.type,
          item.verify,
          item.password,
          item.idStore
        )
      );
      setRows(data);
    });
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "\n    footer.footer {\n    display: none;\n}\n    ",
        }}
      />
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 224,
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="จัดการผู้ใช้งาน" {...a11yProps(0)} />
                <Tab label="จัดการร้าน" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Box
                  component="div"
                  sx={{
                    width: "100vh",
                    textAlign: "center",
                    marginLeft: 10,
                  }}
                >
                  <TableAccount rows={rows} />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}></TabPanel>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
