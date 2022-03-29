import { Box, Container, Typography } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Themes } from "../themes/color";

export default function ConnTent() {
  return (
    <Container>
      <Box>
        <Typography variant="h2">
          <LocalDiningIcon
            sx={{ fontSize: 50, marginTop: 5, color: Themes.primary }}
          />
          &nbsp; อัปเดตเนื้อหาล่าสุด
        </Typography>
      </Box>
      <Box sx={{ float: "right" }}>
        <Typography variant="h3">ร้านกาแฟ</Typography>
      </Box>
    </Container>
  );
}
