
import { Request, Response } from "express";

export const supplierAHotels = [
    {
        hotelId: "a1",
        name: "Holtin",
        price: 6000,
        city: "delhi",
        commissionPct: 10
    },
    {
        hotelId: "a2",
        name: "Radison",
        price: 5900,
        city: "delhi",
        commissionPct: 13
    },
    {
        hotelId: "a3",
        name: "Taj",
        price: 8000,
        city: "delhi",
        commissionPct: 15
    }
];

export const supplierBHotels = [
    {
        hotelId: "b1",
        name: "Holtin",
        price: 5340,
        city: "delhi",
        commissionPct: 20
    },
    {
        hotelId: "b2",
        name: "Taj",
        price: 7500,
        city: "delhi",
        commissionPct: 15
    },
    {
        hotelId: "b3",
        name: "Leela",
        price: 9000,
        city: "delhi",
        commissionPct: 12
    }
];

export const getSupplierAHotels = (city: string) =>
    supplierAHotels.filter(
        hotel => hotel.city.toLowerCase() === city.toLowerCase()
    );

export const getSupplierBHotels = (city: string) =>
    supplierBHotels.filter(
        hotel => hotel.city.toLowerCase() === city.toLowerCase()
    );
