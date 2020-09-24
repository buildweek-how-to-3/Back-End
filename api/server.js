const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter");
const postsRouter = require("../posts/postsRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api", usersRouter);

server.use("/api/auth", authRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ API: "Running....." });
});
module.exports = server;
