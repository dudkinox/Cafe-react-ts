import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Themes } from "../themes/color";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountService from "../services/AccountService";
import AccountModel from "../models/AccountModel";
import { DeleteOutlined } from "@mui/icons-material";
import StoreService from "../services/StoreService";
import StoreModel from "../models/StoreModel";

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [data, setDataUser] = useState<any>([]);
  const [storeData, setStoreData] = useState<any>([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsLoading(true);
    AccountService.getUserAll().then((res: any) => {
      var new_result = [];
      for (var i = 0; i < res.length; i++) {
        if (res[i].type !== "admin") {
          const data = {
            email: res[i].email.toString(),
            id: res[i].id.toString(),
            id_store: res[i].id_store.toString(),
            name: res[i].name.toString(),
            status: res[i].status,
            tel: res[i].tel.toString(),
            type: res[i].type.toString(),
          };
          new_result.push(data);
        }
      }
      setDataUser(new_result);
    });
    StoreService.getStoreAll().then((res: any) => {
      setStoreData(res);
      setIsLoading(false);
    });
  }, []);

  const onDeleteAccount = (token: string | null) => {
    setIsLoading(true);
    AccountService.closeAccount(token).then((res: any) => {
      setIsLoading(false);
    });
  };

  const onDeleteStore = (token: string | null) => {
    setIsLoading(true);
    StoreService.closeStore(token).then((res: any) => {
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>อีเมล์</TableCell>
                        <TableCell align="right">ชื่อ - สกุล</TableCell>
                        <TableCell align="right">เบอร์โทร</TableCell>
                        <TableCell align="right">สถานะ</TableCell>
                        <TableCell align="right">ตำแหน่ง</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item: AccountModel) => (
                        <TableRow
                          key={item.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.email}
                          </TableCell>
                          <TableCell align="right">{item.name}</TableCell>
                          <TableCell align="right">{item.tel}</TableCell>
                          <TableCell align="right">
                            {item.status == true ? "ปกติ" : "ปิดบัญชี"}
                          </TableCell>
                          <TableCell align="right">{item.type}</TableCell>
                          <TableCell align="right">
                            <DeleteOutlined
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                onDeleteAccount(item.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ชื่อร้าน</TableCell>
                        <TableCell align="right">ข้อมูลร้าน</TableCell>
                        <TableCell align="right">เวลาทำการ</TableCell>
                        <TableCell align="right">เบอร์โทรติดต่อ</TableCell>
                        <TableCell align="center">เว็บไซต์</TableCell>
                        <TableCell align="center">แผนที่</TableCell>
                        <TableCell align="right">สถานะร้าน</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {storeData.map((item: StoreModel) => (
                        <TableRow
                          key={item.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell align="right">{item.address}</TableCell>
                          <TableCell align="right">{item.open}</TableCell>
                          <TableCell align="right">{item.tel}</TableCell>
                          <TableCell align="right">{item.website}</TableCell>
                          <TableCell align="right">{item.latitude}</TableCell>
                          <TableCell align="right">
                            {item.status == true ? "เปิด" : "ปิดทำการ"}
                          </TableCell>
                          <TableCell align="right">
                            <DeleteOutlined
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                onDeleteStore(item.idstore);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      );
    </>
  );
}
