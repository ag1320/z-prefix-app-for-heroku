import { useEffect } from "react";
import axios from "axios";
import Post from "../components/Post.js";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Public.css";
import history from '../history.js'

async function getData() {
  let res = await axios.get("http://localhost:3001/posts");
  return res.data;
}

export default function Create({ data, setData, setIsUsersPost }) {
  history.push('/')
  useEffect(() => {
    let mounted = true;
    getData().then((items) => {
      if (mounted) {
        setData(items);
      }
    }).catch(
      setData([])
    );
    setIsUsersPost(false);
    return () => (mounted = false);
  }, []);
  return (
    <>
      <Grid container justifyContent="center">
        <div className="greeting">
          <h1>Welcome</h1>
          <h4>See below for all of our exciting blog posts!</h4>
        </div>
        {data.map((post, index) => {
          return (
            <Grid item xs={12} style={{ margin: 50 }}>
              <NavLink
                to={`/${post.post_id}`}
                style={{ textDecoration: "none" }}
              >
                <Post post={post} />
              </NavLink>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
