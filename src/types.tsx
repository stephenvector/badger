declare global {
  interface Window {
    INITIAL_STATE?: AppData;
  }
}

export enum FormStatus {
  INITIAL = "INITIAL",
  INVALID = "INVALID",
  SUBMITTING = "SUBMITTING",
  SUBMIT_SUCCEEDED = "SUBMIT_SUCCEEDED",
  SUBMIT_FAILED = "SUBMIT_FAILED",
}

export type Channel = {
  name: string;
  createdAt: Date;
};

export type ChannelRow = {
  name: string;
  created_at: Date;
  id: string;
};

export type User = {
  name: string;
  createdAt: Date;
};

export type UserRow = {
  name: string;
  created_at: Date;
  id: string;
};

export type Post = {
  title: string;
  content: string;
  channelId: string;
  createdAt: Date;
  authorId: string;
};

export type PostRow = {
  id: string;
  content: string;
  title: string;
  channel_id: string;
  author_user_id: string;
  created_at: Date;
};

export type Message = {
  name: string;
  createdAt: Date;
};

export type MessageRow = {
  name: string;
  id: string;
  created_at: Date;
};

export type Comment = {
  content: string;
  createdAt: Date;
  postId: string;
  authorId: string;
  respondingToCommentID?: string;
};

export type CommentRow = {
  content: string;
  created_at: Date;
  id: string;
  post_id: string;
  author_id: string;
  responding_to_comment_id?: string;
};

export type AppData = {
  users: Record<string, User>;
  posts: Record<string, Post>;
  messages: Record<string, Message>;
  comments: Record<string, Comment>;
  channels: Record<string, Channel>;
};
