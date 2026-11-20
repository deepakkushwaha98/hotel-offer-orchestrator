import { Router } from "express";
import { fetchHotels } from "../controllers/hotel.controller.js";

const router = Router();

router.get("/", fetchHotels);

export default router;