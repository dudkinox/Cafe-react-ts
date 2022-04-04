import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  CardHeader,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function CommentPage() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 3 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ร้านกาแฟ
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
                      sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      alt="The house from the offer."
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <Card>
                    <CardHeader
                      title="ร้านอาหารดีมาก"
                      subheader="September 14, 2016"
                    />
                    <CardContent>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <Typography component="span">
                        &emsp;รีวิวโดย : ชื่อ สกุล
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>detail</CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ส่วน comment
            </Typography>
          </CardContent>
        </Card>
      </Card>
    </Container>
  );
}
