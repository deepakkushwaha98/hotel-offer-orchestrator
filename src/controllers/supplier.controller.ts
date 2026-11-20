import { Request, Response } from "express";
import {
    getSupplierAHotels,
    getSupplierBHotels
} from "../services/supplier.service.js";

export const supplierAController = (req: Request, res: Response) => {
    const city = String(req.query.city || "delhi");

    res.status(200).json(getSupplierAHotels(city));
};

export const supplierBController = (req: Request, res: Response) => {
    const city = String(req.query.city || "delhi");

    res.status(200).json(getSupplierBHotels(city));
};