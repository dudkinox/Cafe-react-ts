import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Themes } from "../themes/color";

interface CardCoffeeProps {
  onClick: () => void;
  nameStore: string;
  imageStore: string;
  timeStore: string;
  address: string;
  tel: string;
  idStore: string;
  map: string;
}

export default function CardCoffee({
  onClick,
  nameStore,
  imageStore,
  timeStore,
  address,
  tel,
  idStore,
  map,
}: CardCoffeeProps) {
  const handleMap = () => {
    window.open(map, "_blank");
  };
  return (
    <Card sx={{ maxWidth: 345 }} style={{ cursor: "pointer" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: Themes.primary }} aria-label="recipe">
            {nameStore}
          </Avatar>
        }
        title={nameStore}
        subheader={`ID Store : ${idStore}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageStore}
        alt="ไม่มีแสดงรูปภาพ"
        onClick={onClick}
      />
      <CardContent onClick={onClick}>
        <Typography variant="body2" color="text.secondary">
          เวลาทำการ: {timeStore}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ที่อยู่: {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          เบอร์โทรติดต่อ: {tel}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleMap}>
          <LocationOnIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
