import { Request, Router } from "express";
import bodyParser from "body-parser";
import { pool } from "./db";
import {
  User,
  UserRow,
  Post,
  PostRow,
  Channel,
  ChannelRow,
  Comment,
  CommentRow,
} from "./types";

export async function getUsers() {
  const client = await pool.connect();
  const users: Record<string, User> = {};
  const results = await client.query("SELECT * FROM users");

  results.rows.forEach((row: UserRow) => {
    console.log(row);
    users[row.id] = { name: row.name, createdAt: row.created_at };
  });

  client.release();
  return users;
}

export async function getPosts() {
  const client = await pool.connect();
  const posts: Record<string, Post> = {};
  const results = await client.query("SELECT * FROM posts");
  results.rows.forEach((row: PostRow) => {
    posts[row.id] = {
      title: row.title,
      content: row.content,
      channelId: row.channel_id,
      createdAt: row.created_at,
      authorId: row.author_user_id,
    };
  });
  client.release();
  return posts;
}

export async function getComments() {
  const client = await pool.connect();
  const comments: Record<string, Comment> = {};
  const results = await client.query("SELECT * FROM comments");
  results.rows.forEach((row: CommentRow) => {
    comments[row.id] = {
      content: row.content,
      createdAt: row.created_at,
      authorId: row.author_id,
      postId: row.post_id,
    };

    const responding_to_comment_id = row.responding_to_comment_id;
    if (responding_to_comment_id) {
      comments[row.id].respondingToCommentID = responding_to_comment_id;
    }
  });
  client.release();
  return comments;
}

export async function getChannels() {
  const client = await pool.connect();
  const channels: Record<string, Channel> = {};
  const results = await client.query("SELECT * FROM channels");

  results.rows.forEach((row: ChannelRow) => {
    channels[row.id] = { name: row.name, createdAt: row.created_at };
  });

  client.release();
  return channels;
}

export async function createPost(
  post: { title: string; content: string },
  authorId: string
) {
  const { title, content } = post;
  const client = await pool.connect();
  const results = await client.query(
    "INSERT INTO posts(title,content,author_user_id) VALUES($1, $2, $3) RETURNING *",
    [title, content, authorId]
  );
  client.release();
  console.log(results);
}

export async function createChannel(name: string) {
  const client = await pool.connect();
  const results = await client.query(
    "INSERT INTO channels(name) VALUES($1) RETURNING *",
    [name]
  );
  client.release();
  console.log(results);
}

const apiRouter = Router();

apiRouter.use(bodyParser.json());

apiRouter.get("/users", async (_req, res) => {
  const users = await getUsers();
  res.json({ users });
});

apiRouter.post(
  "/channels/:channelId/new",
  async (
    req: Request<{ channelId: string }, {}, { title: string; content: string }>,
    res
  ) => {
    const { channelId } = req.params;
    const { title, content } = req.body;
    createPost({ title, content }, res.locals.userId);
  }
);

export default apiRouter;
