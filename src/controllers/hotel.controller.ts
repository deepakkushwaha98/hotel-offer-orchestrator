
import { Request, Response } from "express";
import { getTemporalClient } from "../config/temporal.js";
import { saveHotels, filterHotels } from "../services/redis.service.js";

export const fetchHotels = async (req: Request, res: Response) => {
    try {
        const city = req.query.city;

        if (typeof city !== "string" || !city.trim()) {
            res.status(400).json({ message: "City is required" });
            return;
        }

        const client = await getTemporalClient();

        const handle = await client.workflow.start("hotelWorkflow", {
            taskQueue: "hotel-task-queue",
            workflowId: `hotel-${city}-${Date.now()}`,
            args: [city]
        });

        const hotels = await handle.result();

        // Save deduplicated results in Redis
        await saveHotels(city, hotels);

        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        // Filter inside Redis
        if (minPrice !== undefined || maxPrice !== undefined) {

            const min = minPrice === undefined ? 0 : Number(minPrice);
            const max = maxPrice === undefined ? Number.MAX_SAFE_INTEGER : Number(maxPrice);

            if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min < 0 ||
                max < min
            ) {
                res.status(400).json({ message: "Invalid price range" });
                return;
            }

            const filteredHotels = await filterHotels(city, min, max);

            res.status(200).json(filteredHotels);
            return;
        }

        res.status(200).json(hotels);

    } catch (error) {
        console.error("Hotel fetching error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
