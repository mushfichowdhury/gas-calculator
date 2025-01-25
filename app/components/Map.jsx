"use client";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import {
	Map as GoogleMap,
	AdvancedMarker,
	Pin,
	useMap,
} from "@vis.gl/react-google-maps";
import { mapOptions } from "../config/maps";

const MapPolyline = ({ path }) => {
	const map = useMap();

	useEffect(() => {
		if (!map || !path) return;

		const polyline = new window.google.maps.Polyline({
			path,
			strokeColor: "#3b82f6",
			strokeOpacity: 1.0,
			strokeWeight: 3,
		});

		polyline.setMap(map);
		return () => polyline.setMap(null);
	}, [map, path]);

	return null;
};

const Map = ({ route }) => {
	const mapRef = useRef(null);
	const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 }); // Default to NYC initially
	const [mapBounds, setMapBounds] = useState(null);
	const [routePath, setRoutePath] = useState(null);

	useEffect(() => {
		if (route && route.geometry && window.google) {
			try {
				// Create bounds
				const bounds = new window.google.maps.LatLngBounds();
				const decodedPath = window.google.maps.geometry.encoding.decodePath(
					route.geometry
				);

				decodedPath.forEach((point) => {
					bounds.extend(point);
				});

				setMapBounds(bounds);
				setCenter(bounds.getCenter().toJSON());
				setRoutePath(decodedPath);
			} catch (error) {
				console.error("Error processing route:", error);
			}
		} else if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error getting location:", error);
				}
			);
		}
	}, [route]);

	if (typeof window === "undefined") {
		return (
			<Box
				sx={{
					width: "100%",
					height: "400px",
					backgroundColor: "#f5f5f5",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#666666",
				}}>
				Loading map...
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				height: "400px",
			}}>
			<GoogleMap
				zoom={12}
				center={center}
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
				{...mapOptions}
				onLoad={(map) => {
					mapRef.current = map;
					if (mapBounds) {
						map.fitBounds(mapBounds);
					}
				}}>
				{routePath && (
					<>
						{/* Start marker */}
						<AdvancedMarker position={routePath[0]}>
							<Pin
								background={"#22c55e"}
								borderColor={"#166534"}
								glyphColor={"#166534"}
							/>
						</AdvancedMarker>

						{/* End marker */}
						<AdvancedMarker position={routePath[routePath.length - 1]}>
							<Pin
								background={"#ef4444"}
								borderColor={"#991b1b"}
								glyphColor={"#991b1b"}
							/>
						</AdvancedMarker>

						<MapPolyline path={routePath} />
					</>
				)}
			</GoogleMap>
		</Box>
	);
};

export default Map;
