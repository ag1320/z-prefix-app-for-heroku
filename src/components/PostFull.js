import { useParams, NavLink, Navigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import axios from "axios";
import history from "../history.js";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Grid,
  Modal,
  Box,
  Button,
} from "@mui/material";

async function getData(userId) {
  let res = await axios.post("http://localhost:3001/getUsersPosts", {
    userId,
  });
  return res.data;
}

async function deletePost(postId) {
  let res = await axios.delete(`http://localhost:3001/delete/${postId}`);
  return res.data;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Post({
  data,
  userId,
  isUsersPost,
  setIsUsersPost,
  isAuthenticated,
}) {
  history.push()
  let { postId } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deletePost(postId);
    handleClose();
    history.back();
  };

  const filterPosts = (obj) => {
    return obj.post_id == postId;
  };

  let post = data.filter(filterPosts)[0];

  function checkUser(obj) {
    return obj.post_id == postId;
  }

  useEffect(() => {
    let mounted = true;
    getData(userId, postId).then((items) => {
      if (mounted && isAuthenticated) {
        let filteredPosts = items.filter(checkUser);
        filteredPosts.length > 0 ? setIsUsersPost(true) : setIsUsersPost(false);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      {post ? (
        <Grid container justifyContent="center">
          <Grid item style={{ margin: 100 }}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this post?
                </Typography>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </Box>
            </Modal>
            <Card
              variant="oulined"
              style={{ maxWidth: "80vw", maxHeight: "auto" }}
            >
              <CardHeader
                title={post.title}
                avatar={
                  <IconButton>
                    <ChevronLeftIcon onClick={history.back} />
                  </IconButton>
                }
                action={
                  isUsersPost ? (
                    <>
                      <IconButton onClick={handleOpen}>
                        <DeleteIcon />
                      </IconButton>
                      <NavLink to = {`/edit/${postId}`} >
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </NavLink>
                    </>
                  ) : (
                    <></>
                  )
                }
              />
              <CardContent>
                <Typography>{post.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
