import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createBlogPost, getBlogs, login } from "./db";
import authMiddleware from "./authMiddleware";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.get("/blogs", (req: Request, res: Response) => {
  const blogPosts = getBlogs();
  res.send(blogPosts);
});

app.post("/blogs", authMiddleware, (req, res) => {
  // @ts-ignore I promise user is there
  const blogPost = createBlogPost(req.body.title, req.user);
  res.send(blogPost);
});

app.post("/login", (req: Request, res: Response) => {
  const user = login(req.body.username, req.body.password);
  if (!user) {
    return res
      .status(422)
      .json({ error: "No user found with those credentials" });
  }
  res.send(user);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
