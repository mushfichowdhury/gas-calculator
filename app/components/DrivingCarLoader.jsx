"use client";
import { Box } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const DrivingCarLoader = () => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "24px",
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				"& .car-icon": {
					animation: "drive 1.5s linear infinite",
				},
				"@keyframes drive": {
					"0%": {
						transform: "translateX(-50px)",
					},
					"100%": {
						transform: "translateX(50px)",
					},
				},
			}}>
			<DirectionsCarIcon className='car-icon' sx={{ color: "primary.light" }} />
		</Box>
	);
};

export default DrivingCarLoader;
