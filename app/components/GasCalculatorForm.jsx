"use client";
import { useState, useEffect } from "react";
import {
	TextField,
	Button,
	Stack,
	Autocomplete,
	Box,
	Typography,
	Alert,
	Paper,
} from "@mui/material";
import { vehicleDatabase } from "../services/vehicleDatabase";
import PlacesAutocomplete from "./PlacesAutocomplete";
import DrivingCarLoader from "./DrivingCarLoader";

const GasCalculatorForm = ({ onRouteCalculated }) => {
	const [formData, setFormData] = useState({
		carMake: "",
		carModel: "",
		startLocation: "",
		endLocation: "",
	});
	const [distance, setDistance] = useState(null);
	const [duration, setDuration] = useState(null);
	const [gasPrice, setGasPrice] = useState(2.99);
	const [estimatedCost, setEstimatedCost] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [isCalculated, setIsCalculated] = useState(false);

	useEffect(() => {
		if (formData.carMake) {
			const models = vehicleDatabase.models[formData.carMake] || [];
			setAvailableModels(models.map((m) => m.name));
		} else {
			setAvailableModels([]);
		}
	}, [formData.carMake]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const directionsService = new window.google.maps.DirectionsService();
			const results = await directionsService.route({
				origin: formData.startLocation,
				destination: formData.endLocation,
				travelMode: window.google.maps.TravelMode.DRIVING,
			});

			const route = results.routes[0];
			const distanceInMiles = route.legs[0].distance.value / 1609.34;
			const durationInMinutes = route.legs[0].duration.value / 60;

			setDistance(distanceInMiles.toFixed(1));
			setDuration(durationInMinutes.toFixed(0));

			const mpg = vehicleDatabase.getMPG(formData.carMake, formData.carModel);
			const gallonsNeeded = distanceInMiles / mpg;
			const totalCost = gallonsNeeded * gasPrice;

			setEstimatedCost(totalCost.toFixed(2));
			onRouteCalculated(results);
			setIsCalculated(true);
		} catch (error) {
			setError(
				"Error calculating route. Please check your locations and try again."
			);
			console.error("Error calculating route:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleReset = () => {
		setFormData({
			carMake: "",
			carModel: "",
			startLocation: "",
			endLocation: "",
		});
		setDistance(null);
		setDuration(null);
		setEstimatedCost(null);
		setIsCalculated(false);
		setGasPrice(3.5);
		onRouteCalculated(null);
	};

	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = Math.round(minutes % 60);

		if (hours === 0) {
			return `${remainingMinutes} minutes`;
		} else if (hours === 1) {
			return remainingMinutes === 0
				? "1 hour"
				: `1 hour ${remainingMinutes} minutes`;
		} else {
			return remainingMinutes === 0
				? `${hours} hours`
				: `${hours} hours ${remainingMinutes} minutes`;
		}
	};

	if (isCalculated) {
		return (
			<Stack spacing={3}>
				<Paper elevation={0} sx={{ p: 3, backgroundColor: "primary.light" }}>
					<Stack spacing={2}>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								VEHICLE:
							</Box>{" "}
							{formData.carMake} {formData.carModel}
						</Typography>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								FROM:
							</Box>{" "}
							{formData.startLocation}
						</Typography>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								TO:
							</Box>{" "}
							{formData.endLocation}
						</Typography>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								DISTANCE:
							</Box>{" "}
							{distance} miles
						</Typography>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								DURATION:
							</Box>{" "}
							{formatDuration(duration)}
						</Typography>
						<Typography variant='body1' sx={{ color: "secondary.dark" }}>
							<Box component='span' sx={{ fontWeight: "bold" }}>
								VEHICLE EFFICIENCY:
							</Box>{" "}
							{vehicleDatabase.getMPG(formData.carMake, formData.carModel)} MPG
						</Typography>
						<Typography
							variant='h6'
							sx={{ color: "primary.dark", fontWeight: "bold" }}>
							Estimated Gas Cost: ${estimatedCost}
						</Typography>
					</Stack>
				</Paper>

				<Button
					variant='contained'
					size='large'
					onClick={handleReset}
					sx={{ mt: 2 }}>
					Try Another Route
				</Button>
			</Stack>
		);
	}

	return (
		<Box component='form' onSubmit={handleSubmit}>
			<Stack spacing={3}>
				{error && <Alert severity='error'>{error}</Alert>}

				<Autocomplete
					options={vehicleDatabase.makes}
					renderInput={(params) => (
						<TextField {...params} label='Car Make' required />
					)}
					onChange={(_, newValue) => {
						setFormData((prev) => ({
							...prev,
							carMake: newValue,
							carModel: "",
						}));
					}}
				/>

				<Autocomplete
					options={availableModels}
					renderInput={(params) => (
						<TextField {...params} label='Car Model' required />
					)}
					onChange={(_, newValue) =>
						setFormData((prev) => ({ ...prev, carModel: newValue }))
					}
					disabled={!formData.carMake}
				/>

				<PlacesAutocomplete
					label='Starting Location'
					value={formData.startLocation}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, startLocation: value }))
					}
				/>

				<PlacesAutocomplete
					label='Destination'
					value={formData.endLocation}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, endLocation: value }))
					}
				/>

				<TextField
					label='Gas Price per Gallon'
					type='number'
					value={gasPrice}
					onChange={(e) => {
						const value = e.target.value;
						if (value === "") {
							setGasPrice("");
						} else {
							const numValue = parseFloat(value);
							if (!isNaN(numValue)) {
								setGasPrice(value);
							}
						}
					}}
					onBlur={(e) => {
						const value = parseFloat(gasPrice);
						if (!isNaN(value)) {
							setGasPrice(
								Math.max(0.01, Math.min(9.99, Number(value.toFixed(2))))
							);
						} else {
							setGasPrice(2.99);
						}
					}}
					inputProps={{
						step: "0.01",
						min: "0.01",
						max: "9.99",
					}}
					InputProps={{
						startAdornment: <span>$</span>,
					}}
				/>

				<Button
					variant='contained'
					type='submit'
					size='large'
					disabled={loading}
					sx={{
						minHeight: "48px",
						position: "relative",
					}}>
					{loading ? <DrivingCarLoader /> : "Calculate Route"}
				</Button>
			</Stack>
		</Box>
	);
};

export default GasCalculatorForm;
