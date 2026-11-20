import { Router } from "express";
import { supplierAController,supplierBController } from "../controllers/supplier.controller.js";

const router = Router();

router.get("/supplierA/hotels", supplierAController);
router.get("/supplierB/hotels", supplierBController);

export default router;