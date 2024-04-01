import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import {
  createGig,
  getGig,
  deleteGig,
  getGigs,
} from "../controllers/gigController.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.get("/single/:id", verifyToken, getGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/", verifyToken, getGigs);

export default router;
