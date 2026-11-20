
import { redisClient } from "../config/redis.js";
import { HotelOffer } from "../types/hotel.js";

export async function saveHotels(city: string, hotels: HotelOffer[]) {

    const priceKey = `hotels:${city}:prices`;
    const dataKey = `hotels:${city}:data`;

    const pipeline = redisClient.multi();

    pipeline.del(priceKey);
    pipeline.del(dataKey);

    for (const hotel of hotels) {
        const key = hotel.name.toLowerCase();

        pipeline.zAdd(priceKey, {
            score: hotel.price,
            value: key
        });

        pipeline.hSet(dataKey, key, JSON.stringify(hotel));
    }

    await pipeline.exec();
}

export async function filterHotels(
    city: string,
    minPrice: number,
    maxPrice: number
): Promise<HotelOffer[]> {

    const priceKey = `hotels:${city}:prices`;
    const dataKey = `hotels:${city}:data`;

    // Filter prices directly inside Redis
    const hotelNames = await redisClient.zRangeByScore(
        priceKey,
        minPrice,
        maxPrice
    );

    if (hotelNames.length === 0) {
        return [];
    }

    const results = await redisClient.hmGet(dataKey, hotelNames);

    return results
        .filter((hotel): hotel is string => hotel !== null)
        .map(hotel => JSON.parse(hotel) as HotelOffer);
}
