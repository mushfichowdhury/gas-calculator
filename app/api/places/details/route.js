import { NextResponse } from "next/server";
import { GOOGLE_MAPS_API_KEY } from "../../../config/maps";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get("placeId");

	if (!placeId) {
		return NextResponse.json(
			{ error: "Place ID is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
		);

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching place details:", error);
		return NextResponse.json(
			{ error: "Failed to fetch place details" },
			{ status: 500 }
		);
	}
}
