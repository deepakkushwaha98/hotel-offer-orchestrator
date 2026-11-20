import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "../activities/hotel.activities.js";

const { fetchSupplierA, fetchSupplierB } =
    proxyActivities<typeof activities>({
        startToCloseTimeout: "30 seconds"
    });

export async function hotelWorkflow(city: string) {

    // Call both suppliers in parallel
    const [supplierA, supplierB] = await Promise.all([
        fetchSupplierA(city),
        fetchSupplierB(city)
    ]);

    // Deduplicate hotels
    const hotelMap = new Map();

    for (const hotel of supplierA) {
        hotelMap.set(hotel.name.toLowerCase(), {
            name: hotel.name,
            price: hotel.price,
            supplier: "Supplier A",
            commissionPct: hotel.commissionPct
        });
    }

    for (const hotel of supplierB) {
        const key = hotel.name.toLowerCase();
        const existing = hotelMap.get(key);

        if (!existing || hotel.price < existing.price) {
            hotelMap.set(key, {
                name: hotel.name,
                price: hotel.price,
                supplier: "Supplier B",
                commissionPct: hotel.commissionPct
            });
        }
    }

    return Array.from(hotelMap.values());
}