import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Get user posts while on homepage
router.get("/", verifyToken, getFeedPosts);

//Get posts from 1 user only
router.get("/:userId/posts",verifyToken,getUserPosts);

//
router.patch("/:id/like",verifyToken,likePost);

export default router;