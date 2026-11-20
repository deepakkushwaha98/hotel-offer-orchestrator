
import { Request, Response } from "express";

export const healthCheck = async (req: Request, res: Response) => {
    const checkSupplier = async (url: string) => {
        try {
            const response = await fetch(url);

            return response.ok ? "UP" : "DOWN";
        } catch {
            return "DOWN";
        }
    };

    const baseUrl =
    process.env.SUPPLIER_BASE_URL || "http://localhost:3000";

const [supplierA, supplierB] = await Promise.all([
    checkSupplier(`${baseUrl}/supplierA/hotels?city=delhi`),
    checkSupplier(`${baseUrl}/supplierB/hotels?city=delhi`)
]);

    const healthy = supplierA === "UP" && supplierB === "UP";

    res.status(healthy ? 200 : 503).json({
        status: healthy ? "UP" : "DEGRADED",
        suppliers: {
            supplierA,
            supplierB
        }
    });
};
