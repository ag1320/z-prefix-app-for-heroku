import { Grid, Card, TextField, CardContent, Button } from "@mui/material";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import history from "../history.js";

async function patchData(title, body, postId) {
  let res = await axios.patch("http://localhost:3001/patch", {
    title,
    body,
    postId,
});
return;
}

export default function Edit({ data, setData }) {

    let { postId } = useParams();
    const filterPosts = (obj) => {
    return obj.post_id == postId;
};
  console.log('dataorgin', data)
  let post = data.filter(filterPosts)[0];
  console.log('datafiltered', data)
  let [title, setTitle] = useState(post.title);
  let [body, setBody] = useState(post.body);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleBodyChange(event) {
    setBody(event.target.value);
  }

  function handleSubmit() {
    patchData(title, body, postId);
    let i = 100000000000
    let dataCopy = data
    post.title = title;
    post.body = body;
    data.forEach((obj, index) => {
      if (obj.post_id == postId) {
        i = index
      }
    });
    dataCopy[i] = post;
    setData(dataCopy)
    history.back();
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item style={{ margin: 100 }}>
          <Card
            variant="oulined"
            style={{ maxWidth: "80vw", maxHeight: "auto" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-textarea"
                    label="Body"
                    placeholder="Write your story!"
                    value={body}
                    onChange={handleBodyChange}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
