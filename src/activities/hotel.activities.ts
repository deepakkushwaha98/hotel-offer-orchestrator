import {
    getSupplierAHotels,
    getSupplierBHotels
} from "../services/supplier.service.js";

export async function fetchSupplierA(city: string) {
    console.log("Fetching hotels from Supplier A");
    return getSupplierAHotels(city);
}

export async function fetchSupplierB(city: string) {
    console.log("Fetching hotels from Supplier B");
    return getSupplierBHotels(city);
}