"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";

// Dynamically import MapContainer to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("./Map"), {
	ssr: false,
	loading: () => (
		<Box
			sx={{
				width: "100%",
				height: "400px",
				minHeight: "400px",
				maxHeight: "400px",
				backgroundColor: "#f5f5f5",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			Loading map...
		</Box>
	),
});

const OpenStreetMap = ({ route }) => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "400px",
				minHeight: "400px",
				maxHeight: "400px",
				overflow: "hidden",
			}}>
			<MapWithNoSSR route={route} />
		</Box>
	);
};

export default OpenStreetMap;
