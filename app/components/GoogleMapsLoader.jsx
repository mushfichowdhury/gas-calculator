"use client";
import { useLoadScript } from "@react-google-maps/api";
import { CircularProgress, Box, Alert } from "@mui/material";

const libraries = ["places"];

export default function GoogleMapsLoader({ children }) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (loadError) {
		return (
			<Alert severity='error'>
				Error loading Google Maps. Please try again later.
			</Alert>
		);
	}

	if (!isLoaded) {
		return (
			<Box display='flex' justifyContent='center' p={4}>
				<CircularProgress />
			</Box>
		);
	}

	return children;
}
