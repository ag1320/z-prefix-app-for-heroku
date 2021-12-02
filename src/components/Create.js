import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import {
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export default function Create(userId) {
  let [title, setTitle] = useState();
  let [body, setBody] = useState();
  let [isSubmitted, setIsSubmitted] = useState();
  let [isError, setIsError] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSubmitted(false);
    setIsError(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/create`, {
        title,
        body,
        userId,
      })
      .then(function (response) {
        setIsSubmitted(true);
      })
      .catch(function (error) {
        setIsError(true);
      });
    setTitle("");
    setBody("");
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item style={{ margin: 100 }}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={4}>
                <Grid item sx={12}>
                  <Typography>Write a good story!</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={title}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-textarea"
                    label="Body"
                    placeholder="Write your story!"
                    onChange={handleBodyChange}
                    value={body}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link to ='/myposts'>
                    <Button variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={isSubmitted}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert severity="success">
            Submitted! check the home page or my posts to see your article!
          </Alert>
        </Snackbar>
        <Snackbar open={isError} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="error">task failed successfully!</Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
