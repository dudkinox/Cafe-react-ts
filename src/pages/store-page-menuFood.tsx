export default function MenuFood() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
            <PersonIcon sx={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={name === "" ? true : false}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  value={name}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={email === "" ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  value={email}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={tel === "" ? true : false}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="Phone Number"
                  value={tel}
                  type="text"
                />
              </Grid>
              {isChangePassword && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      error={passwordOld === "" ? true : false}
                      onChange={(e) => setPasswordOld(e.target.value)}
                      label="Password Old"
                      type="password"
                      // TODO เปลี่ยนรหัสผ่าน
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      error={newPassword === "" ? true : false}
                      onChange={(e) => setNewPassword(e.target.value)}
                      label="Password New"
                      value={newPassword}
                      type="password"
                      // TODO เปลี่ยนรหัสผ่าน
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              อัพเดต
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="info"
              onClick={changePassword}
            >
              เปลี่ยนรหัสผ่าน
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={goBack}
              sx={{
                mt: 3,
                mb: 2,
                color: Themes.secondary,
                backgroundColor: Themes.primary,
                "&:hover": {
                  backgroundColor: Themes.primary,
                },
              }}
            >
              ยกเลิก
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
