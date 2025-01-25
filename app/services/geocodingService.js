import { GOOGLE_MAPS_API_KEY } from "../config/maps";

export const searchAddressWithGoogle = async (searchText) => {
	try {
		// First get place predictions
		const response = await fetch(
			`/api/places/autocomplete?input=${encodeURIComponent(searchText)}`
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();

		if (!data.predictions || !data.predictions.length) {
			return [];
		}

		// Get details for the first prediction to get coordinates
		const placeDetails = await fetch(
			`/api/places/details?placeId=${data.predictions[0].place_id}`
		);

		const detailsData = await placeDetails.json();

		if (detailsData.result && detailsData.result.geometry) {
			const location = detailsData.result.geometry.location;
			return [
				{
					description: data.predictions[0].description,
					coordinates: {
						lat: location.lat,
						lng: location.lng,
					},
				},
			];
		}

		return data.predictions;
	} catch (error) {
		console.error("Error searching for address with Google:", error);
		throw error;
	}
};

export const getRouteWithGoogle = async (start, end) => {
	try {
		if (!start?.lat || !start?.lng || !end?.lat || !end?.lng) {
			console.error("Invalid coordinates:", { start, end });
			throw new Error("Invalid coordinates provided");
		}

		const startCoords = `${start.lat},${start.lng}`;
		const endCoords = `${end.lat},${end.lng}`;

		console.log("Requesting route with coordinates:", {
			startCoords,
			endCoords,
		});

		const response = await fetch(
			`/api/directions?start=${encodeURIComponent(
				startCoords
			)}&end=${encodeURIComponent(endCoords)}`
		);

		const data = await response.json();
		console.log("Route API response:", data);

		if (!response.ok) {
			throw new Error(
				`Network error: ${response.status} - ${data.error || "Unknown error"}`
			);
		}

		if (data.status !== "OK" || !data.routes || !data.routes[0]) {
			throw new Error(data.error || "Invalid route data received");
		}

		const route = data.routes[0];
		if (!route.legs || !route.legs[0] || !route.overview_polyline) {
			throw new Error("Missing route data");
		}

		return {
			distance: route.legs[0].distance.value / 1609.34,
			duration: route.legs[0].duration.value / 60,
			geometry: route.overview_polyline.points,
		};
	} catch (error) {
		console.error("Error calculating route:", error);
		throw error;
	}
};
