import { NextResponse } from "next/server";
import { GOOGLE_MAPS_API_KEY } from "../../../config/maps";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const input = searchParams.get("input");

	if (!input) {
		return NextResponse.json(
			{ error: "Input parameter is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
				input
			)}&key=${GOOGLE_MAPS_API_KEY}`
		);

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching places:", error);
		return NextResponse.json(
			{ error: "Failed to fetch places" },
			{ status: 500 }
		);
	}
}
