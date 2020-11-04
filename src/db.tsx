import { Pool } from "pg";
import { createChannel, createPost } from "./api";

export const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "postgres",
});

export async function initializeDB() {
  const client = await pool.connect();
  await client.query(`DROP TABLE IF EXISTS users, channels, messages, posts`);

  await client.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )`);

  await client.query(`INSERT INTO users(id,name) VALUES ($1,$2) RETURNING *;`, [
    1,
    "Stephen Vector",
  ]);

  await client.query(
    `CREATE TABLE IF NOT EXISTS channels (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      description VARCHAR,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      root_message_id integer,
      from_user_id integer NOT NULL,
      to_user_id integer NOT NULL,
      content VARCHAR,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      content VARCHAR,
      title VARCHAR,
      author_user_id integer NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content VARCHAR,
      responding_to_comment_id INTEGER,
      post_id INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
  );

  await createPost({ title: "Test", content: "Content" }, "1");

  await createChannel("General");
  await createChannel("Design");
  await createChannel("Development");
  await createChannel("Funny");

  client.release();
}
