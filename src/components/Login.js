import { Navigate } from "react-router-dom";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

export default function Login({
  checked,
  username,
  password,
  handleUserChange,
  handlePassChange,
  handleSwitchChange,
  handleSubmit,
  isAuthenticated,
  isLoginError,
  setIsLoginError,
  isSignupError,
  setIsSignupError,
  isSignupSuccess,
  setIsSignupSuccess,
  setZeroEntry,
  zeroEntry
}) {
  const handleLoginClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsLoginError(false);
  };

  const handleSignupErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSignupError(false);
  };

  const handleSignupSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSignupSuccess(false);
  };
  const handleZeroEntryClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setZeroEntry(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/myposts" />
      ) : (
        <>
          <Grid container justifyContent="center">
            <Grid item style={{ margin: 100 }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onChange={handleSwitchChange}
                            />
                          }
                          label="Sign up"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        autoComplete="current-password"
                        onChange={handleUserChange}
                        value={username}
                        placeholder="Username"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handlePassChange}
                        value={password}
                        placeholder="Password"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={isLoginError}
              autoHideDuration={2000}
              onClose={handleLoginClose}
            >
              <Alert severity="error">Incorrect login credentials</Alert>
            </Snackbar>
            <Snackbar
              open={isSignupError}
              autoHideDuration={2000}
              onClose={handleSignupErrorClose}
            >
              <Alert severity="error">
                Invalid signup: username already exists
              </Alert>
            </Snackbar>
            <Snackbar
              open={isSignupSuccess}
              autoHideDuration={2000}
              onClose={handleSignupSuccessClose}
            >
              <Alert severity="success">Success!</Alert>
            </Snackbar>
            <Snackbar
              open={zeroEntry}
              autoHideDuration={2000}
              onClose={handleZeroEntryClose}
            >
              <Alert severity="error">password and username are required</Alert>
            </Snackbar>
          </Stack>
        </>
      )}
    </>
  );
}
