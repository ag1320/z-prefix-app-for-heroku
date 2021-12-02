import axios from "axios";
import { useEffect, useState } from "react";
import './MyPosts.css'
import { Grid } from '@mui/material'
import { NavLink,  } from 'react-router-dom'
import Post from './Post.js'
import history from '../history.js'

async function getData(userId) {
  let res = await axios.post("http://localhost:3001/getUsersPosts", { userId });
  return res.data;
}

export default function MyPosts({ userId, data, setData }) {
  let [usersPosts, setUsersPosts] = useState([]);
  history.push('/myposts')
  useEffect(() => {
    let mounted = true;
    getData(userId)
      .then((items) => {
        if (mounted) {
          setUsersPosts(items);
        }
      })
      .catch(setData([]));
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <div className="greeting">
          <h1>Welcome!</h1>
          <h4>Here are the posts you've written!</h4>
        </div>
        {console.log(usersPosts)}
        {usersPosts.map((post, index) => {
          return (
            <Grid item xs={12} style={{ margin: 50 }}>
              {console.log(post.post_id)}
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