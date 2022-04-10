import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  CardHeader,
  Paper,
  Avatar,
  Divider,
  Link,
  TextField,
  Button,
} from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { useEffect, useState } from "react";
import StoreService from "../services/StoreService";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import StoreModel, { StoreImgViewModel } from "../models/StoreModel";

type CommentPageParams = {
  id: string;
};

export default function CommentPage() {
  const { id } = useParams<CommentPageParams>();
  const token = localStorage.getItem("token");
  const [image, setImage] = useState<any>([]);
  const [rating, setRating] = React.useState<number | null>(0);
  const [showcomment, setShowComment] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>([]);
  const [comment, setComment] = useState("");
  const [showlimit, setShowLimit] = useState(false);
  const [listStore, setListStore] = useState<StoreModel>();
  const [listViewImage, setListViewImage] = useState<StoreImgViewModel>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    StoreService.uploadImgComment(previewImage, token).then((res) => {
      console.log(res.data);
      StoreService.CommentReview(id, token, comment, res.data, rating).then(
        (res) => {
          console.log(res.data);
        }
      );
    });
  };

  const showBox = () => {
    if (showcomment === false) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  };

  const imageChange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length < 6) {
        setPreviewImage(e.target.files);
        setShowLimit(false);
      } else {
        setPreviewImage([]);
        setShowLimit(true);
      }
    }
  };

  useEffect(() => {
    StoreService.getStoreId(id).then((res) => {
      setListStore(res);
    });
  }, [id]);

  useEffect(() => {
    StoreService.getImgStoreViewId(id).then((res) => {
      console.log(res);

      setListViewImage(res);
    });
  }, [id]);

  useEffect(() => {
    StoreService.getComment(`${id}`).then((res) => {
      setImage(res.data);
    });
  }, [id]);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 50, textAlign: "center" }}
              color="text.secondary"
              gutterBottom
            >
              {listStore?.name}
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={4}>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <Typography variant="h5" component="div">
                      <Box
                        component="img"
                        sx={{ textAlign: "center" }}
                        width="500px"
                        alt="The house from the offer."
                        src={listStore?.image}
                      />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Card>
                      <CardHeader
                        title="ภาพบรรยากาศ"
                        subheader={`Open ${listStore?.open}`}
                      />
                      <CardContent>
                        <Paper style={{ padding: "40px 20px" }}>
                          <>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                              <SimpleImageSlider
                                width={710}
                                height={300}
                                images={listViewImage?.image ?? []}
                                showBullets={true}
                                showNavs={true}
                              />
                            </Grid>
                          </>
                        </Paper>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Card>
            <CardContent>
              {showcomment && (
                <>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={onSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </Box>
                    {showlimit && (
                      <Typography>จำกัดรูปภาพไม่เกิน 5 รูป</Typography>
                    )}
                    <Button
                      sx={{ marginBottom: 3 }}
                      variant="contained"
                      component="label"
                    >
                      Upload File
                      <input
                        accept=".jpg,.jpeg,.png"
                        type="file"
                        hidden
                        multiple
                        onChange={imageChange as any}
                      />
                    </Button>

                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="เล่าประสบการณ์ที่ได้รับจากสถานที่นี้โดยละเอียด"
                          multiline
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          color="success"
                        >
                          โพสต์
                        </Button>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          onClick={showBox}
                          sx={{
                            mt: 3,
                            mb: 2,
                            color: "white",
                            backgroundColor: "#eb1c24",
                            "&:hover": {
                              backgroundColor: "#eb1c24",
                            },
                          }}
                        >
                          ยกเลิก
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              <Typography>
                <Link
                  onClick={showBox}
                  sx={{ cursor: "pointer" }}
                  underline="none"
                >
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Typography sx={{ color: "black" }}>เขียนคอมเม้น</Typography>
                </Link>
              </Typography>
              <Paper style={{ padding: "40px 20px" }}>
                <>
                  {image.map((item: any) => (
                    <Grid
                      container
                      wrap="nowrap"
                      spacing={2}
                      key={item.idstore}
                    >
                      <Grid item>
                        <Avatar alt="Rems Sharp" />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                          {item.name}
                        </h4>
                        <p />
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating name="read-only" value={item.star} readOnly />
                        </Box>
                        <p style={{ textAlign: "left" }}>{item.comment}</p>

                        <p />
                        {item.image.length !== 0 && (
                          <SimpleImageSlider
                            width={710}
                            height={300}
                            images={item.image}
                            showBullets={true}
                            showNavs={true}
                          />
                        )}
                        <Divider
                          variant="fullWidth"
                          style={{ margin: "30px 0" }}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </>
              </Paper>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </>
  );
}
