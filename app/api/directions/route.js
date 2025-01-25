import { NextResponse } from "next/server";
import { GOOGLE_MAPS_API_KEY } from "../../config/maps";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const start = searchParams.get("start");
	const end = searchParams.get("end");

	if (!start || !end) {
		return NextResponse.json(
			{ error: "Start and end coordinates are required" },
			{ status: 400 }
		);
	}

	try {
		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${GOOGLE_MAPS_API_KEY}`;
		console.log("Requesting directions:", url);

		const response = await fetch(url);
		const data = await response.json();

		console.log("Directions API response:", data);

		if (data.status !== "OK") {
			return NextResponse.json(
				{ error: `Directions API error: ${data.status}`, details: data },
				{ status: 400 }
			);
		}

		const route = data.routes[0];
		return NextResponse.json({
			status: "OK",
			routes: [
				{
					legs: route.legs,
					overview_polyline: route.overview_polyline,
					bounds: route.bounds,
				},
			],
		});
	} catch (error) {
		console.error("Error fetching directions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch directions", details: error.message },
			{ status: 500 }
		);
	}
}
