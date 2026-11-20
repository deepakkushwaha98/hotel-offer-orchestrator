
import { getSupplierAHotels, getSupplierBHotels} from "./supplier.service.js";

import { HotelOffer } from "../types/hotel.js";

export const getHotels = async (city: string): Promise<HotelOffer[]> => {

    // Get hotels from both suppliers
    const supplierA = getSupplierAHotels(city);
    const supplierB = getSupplierBHotels(city);

    // Store unique hotels
    const hotelMap = new Map<string, HotelOffer>();

    // Process Supplier A
    for (const hotel of supplierA) {
        hotelMap.set(hotel.name.toLowerCase(), {
            name: hotel.name,
            price: hotel.price,
            supplier: "Supplier A",
            commissionPct: hotel.commissionPct
        });
    }

    // Process Supplier B
    for (const hotel of supplierB) {

        const key = hotel.name.toLowerCase();
        const existingHotel = hotelMap.get(key);

        // Insert if new or replace if cheaper
        if (!existingHotel || hotel.price < existingHotel.price) {
            hotelMap.set(key, {
                name: hotel.name,
                price: hotel.price,
                supplier: "Supplier B",
                commissionPct: hotel.commissionPct
            });
        }
    }

    // Return unique hotels
    return Array.from(hotelMap.values());
};
