import { Card, CardContent, Typography, CardHeader } from "@mui/material";

export default function Post({ post }) {

  return (
    <Card variant="oulined">
      <CardHeader title = {post.title}/>
      <CardContent>
        <Typography>
            {post.body?.length<100?post.body:(post.body?.substring(0,99)+'...')}
        </Typography>
      </CardContent>
    </Card>
  );
}
