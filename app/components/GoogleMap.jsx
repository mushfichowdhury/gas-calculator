"use client";
import { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { Box } from "@mui/material";

const MapComponent = ({ directions }) => {
	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);

	const containerStyle = {
		width: "100%",
		height: "400px",
		minHeight: "400px",
		maxHeight: "400px",
	};

	const center = {
		lat: 37.7749,
		lng: -122.4194,
	};

	const mapOptions = {
		mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
		disableDefaultUI: false,
		clickableIcons: true,
	};

	useEffect(() => {
		if (directions) {
			setDirectionsResponse(directions);
		}
	}, [directions]);

	const onLoad = (map) => {
		setMap(map);
	};

	const onUnmount = () => {
		setMap(null);
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "400px",
				minHeight: "400px",
				maxHeight: "400px",
				overflow: "hidden",
			}}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={12}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={mapOptions}>
				{directionsResponse && (
					<DirectionsRenderer
						directions={directionsResponse}
						options={{
							suppressMarkers: false,
							polylineOptions: {
								strokeColor: "#2196F3",
								strokeWeight: 6,
							},
						}}
					/>
				)}
			</GoogleMap>
		</Box>
	);
};

export default MapComponent;
