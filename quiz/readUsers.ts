import { promises as fsPromises } from "fs";
import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { User, UserRequest } from "./types";

const router = express.Router();

// a route that sends the usernames of the users to the client
router.get("/usernames", (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

router.get("/username/:name", (req: UserRequest, res: Response) => {
  // edited here
  const username = req.params.username;
  const user = req.users?.filter((user) => user.username === username);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

export default router;
