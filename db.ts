import jwt from "jsonwebtoken";
import { jwtSecretKey } from "./secret";

type User = {
  id: number;
  name: string;
};

const blogs = [
  { id: 1, title: "Good post on abstract art", userId: 2 },
  { id: 2, title: "Best 2023 metal albums", userId: 1 },
  { id: 3, title: "Why drinking water is good for your health", userId: 2 },
];

const users: User[] = [
  { id: 1, name: "Gordon Hip" },
  { id: 2, name: "Nik Daydweller" },
];

export const getBlogs = () => {
  return blogs;
};

export const login = (username: string, password: string) => {
  const user = users.find((user) => user.name === username);

  if (!user || password !== "1234") {
    return null;
  }
  const userObj = { id: user?.id, username: user.name };
  const token = jwt.sign(userObj, jwtSecretKey);

  return { ...userObj, token };
};

export const getUserById = (id: number) => users.find((user) => user.id === id);

export const createBlogPost = (title: string, user: User) => {
  const id = blogs.length + 1;
  const blog = {
    id,
    title,
    userId: user.id,
  };
  blogs.push(blog);
  return blog;
};
