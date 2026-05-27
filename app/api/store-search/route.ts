import { NextResponse } from "next/server";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";

function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");

    if (!location) {
        return NextResponse.json({ stores: [] }, { status: 400 });
    }

    // Get coordinates from Google Geocoding API
    const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ stores: [] }, { status: 404 });
    }

    const userLat = geoData.results[0].geometry.location.lat;
    const userLng = geoData.results[0].geometry.location.lng;

    // Fetch active stores from database
    const dbStores = await db
        .select()
        .from(stores)
        .where(eq(stores.isActive, true));

    // Calculate distances
    const nearestStores = dbStores
        .map((store) => ({
            store_name: store.storeName,
            city: store.city,
            latitude: Number(store.latitude),
            longitude: Number(store.longitude),
            distance: calculateDistance(
                userLat,
                userLng,
                Number(store.latitude),
                Number(store.longitude)
            ).toFixed(2),
        }))
        .sort((a, b) => Number(a.distance) - Number(b.distance));

    return NextResponse.json({
        stores: nearestStores.slice(0, 5),
    });
}