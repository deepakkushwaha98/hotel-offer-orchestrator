import express from "express";
import hotelRoutes from "./routes/hotel.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import healthRoutes from "./routes/health.routes.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hotel Offer Orchestrator API is running"
    });
});

app.use("/api/hotels", hotelRoutes);
app.use("/", supplierRoutes);
app.use("/health", healthRoutes);

export default app;