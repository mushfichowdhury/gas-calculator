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
	Grid,
} from "@mui/material";
import { vehicleDatabase } from "../services/vehicleDatabase";
import PlacesAutocomplete from "./PlacesAutocomplete";
import {
	getRouteWithGoogle,
	searchAddressWithGoogle,
} from "../services/geocodingService";
import DrivingCarLoader from "./DrivingCarLoader";

const GasCalculatorForm = ({ onRouteCalculated }) => {
	const [formData, setFormData] = useState({
		carMake: "",
		carModel: "",
		startLocation: "",
		endLocation: "",
	});
	const [coordinates, setCoordinates] = useState({
		start: null,
		end: null,
	});
	const [distance, setDistance] = useState(null);
	const [duration, setDuration] = useState(null);
	const [gasPrice, setGasPrice] = useState("2.99");
	const [estimatedCost, setEstimatedCost] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [isCalculated, setIsCalculated] = useState(false);
	const [startCoordinates, setStartCoordinates] = useState(null);
	const [endCoordinates, setEndCoordinates] = useState(null);
	const [route, setRoute] = useState(null);

	useEffect(() => {
		if (formData.carMake) {
			const models = vehicleDatabase.models[formData.carMake] || [];
			setAvailableModels(models.map((m) => m.name));
		} else {
			setAvailableModels([]);
		}
	}, [formData.carMake]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			if (!coordinates.start || !coordinates.end) {
				throw new Error(
					"Please select valid locations from the dropdown suggestions"
				);
			}

			const routeResult = await getRouteWithGoogle(
				coordinates.start,
				coordinates.end
			);

			setDistance(routeResult.distance.toFixed(1));
			setDuration(routeResult.duration.toFixed(0));

			const mpg = vehicleDatabase.getMPG(formData.carMake, formData.carModel);
			const gallonsNeeded = routeResult.distance / mpg;
			const totalCost = gallonsNeeded * parseFloat(gasPrice);

			setEstimatedCost(totalCost.toFixed(2));
			onRouteCalculated(routeResult);
			setIsCalculated(true);
			setRoute(routeResult);
		} catch (error) {
			setError(
				error.message ||
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
		setCoordinates({
			start: null,
			end: null,
		});
		setDistance(null);
		setDuration(null);
		setEstimatedCost(null);
		setError(null);
		setIsCalculated(false);
		onRouteCalculated(null);
		setRoute(null);
	};

	const handleCalculateRoute = async () => {
		if (startCoordinates && endCoordinates) {
			try {
				const routeData = await getRouteWithGoogle(
					startCoordinates,
					endCoordinates
				);
				setRoute(routeData);
			} catch (error) {
				console.error("Error calculating route:", error);
			}
		} else {
			alert("Please select valid coordinates for both locations.");
		}
	};

	const handleStartLocationChange = (value, coordinates) => {
		setFormData((prev) => ({
			...prev,
			startLocation: value || prev.startLocation,
		}));
		if (coordinates) {
			setCoordinates((prev) => ({
				...prev,
				start: { lat: coordinates.lat, lng: coordinates.lng },
			}));
		}
	};

	const handleEndLocationChange = (value, coordinates) => {
		setFormData((prev) => ({
			...prev,
			endLocation: value || prev.endLocation,
		}));
		if (coordinates) {
			setCoordinates((prev) => ({
				...prev,
				end: { lat: coordinates.lat, lng: coordinates.lng },
			}));
		}
	};

	if (isCalculated) {
		return (
			<Stack spacing={3}>
				<Paper elevation={0} sx={{ p: 3, backgroundColor: "primary.light" }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
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
							</Stack>
						</Grid>
						<Grid item xs={12} md={6}>
							<Stack spacing={2}>
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
									{vehicleDatabase.getMPG(formData.carMake, formData.carModel)}{" "}
									MPG
								</Typography>
							</Stack>
						</Grid>
					</Grid>
					<Typography
						variant='h6'
						sx={{
							color: "primary.dark",
							fontWeight: "bold",
							mt: 3,
							textAlign: "center",
						}}>
						Estimated Gas Cost: ${estimatedCost}
					</Typography>
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
		<Box component='form' onSubmit={handleSubmit} noValidate>
			<Grid container spacing={3}>
				{/* Desktop View */}
				<Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
					<Stack spacing={3}>
						<Autocomplete
							options={vehicleDatabase.makes}
							value={formData.carMake}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Car Make'
									required
									name='carMake'
									value={formData.carMake || ""}
								/>
							)}
							onChange={(_, newValue) => {
								setFormData((prev) => ({
									...prev,
									carMake: newValue,
									carModel: "",
								}));
							}}
						/>
						<PlacesAutocomplete
							label='Starting Location'
							value={formData.startLocation}
							onChange={(value) => handleStartLocationChange(value, null)}
							onCoordinatesChange={(coords) =>
								handleStartLocationChange(formData.startLocation, coords)
							}
							name='startLocation'
						/>
						<TextField
							label='Gas Price per Gallon'
							type='number'
							value={gasPrice}
							name='gasPrice'
							required
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
							onBlur={() => {
								const value = parseFloat(gasPrice);
								if (!isNaN(value)) {
									setGasPrice(
										Math.max(0.01, Math.min(9.99, Number(value.toFixed(2))))
									);
								} else {
									setGasPrice("2.99");
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
					</Stack>
				</Grid>
				<Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
					<Stack spacing={3}>
						<Autocomplete
							options={availableModels}
							value={formData.carModel}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Car Model'
									required
									name='carModel'
									value={formData.carModel || ""}
								/>
							)}
							onChange={(_, newValue) =>
								setFormData((prev) => ({ ...prev, carModel: newValue }))
							}
							disabled={!formData.carMake}
						/>
						<PlacesAutocomplete
							label='Destination'
							value={formData.endLocation}
							onChange={(value) => handleEndLocationChange(value, null)}
							onCoordinatesChange={(coords) =>
								handleEndLocationChange(formData.endLocation, coords)
							}
							name='endLocation'
						/>
						<Button
							variant='contained'
							type='submit'
							size='large'
							disabled={loading}
							sx={{
								height: "56px",
								"& .MuiButton-startIcon": {
									marginRight: 0,
								},
								position: "relative",
								textTransform: "uppercase",
								fontSize: "1rem",
								boxShadow: "none",
								"&:hover": {
									boxShadow: "none",
								},
							}}>
							{loading ? <DrivingCarLoader /> : "Calculate Route"}
						</Button>
					</Stack>
				</Grid>

				{/* Mobile View */}
				<Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
					<Stack spacing={3}>
						<Autocomplete
							options={vehicleDatabase.makes}
							value={formData.carMake}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Car Make'
									required
									name='carMake'
									value={formData.carMake || ""}
								/>
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
							value={formData.carModel}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Car Model'
									required
									name='carModel'
									value={formData.carModel || ""}
								/>
							)}
							onChange={(_, newValue) =>
								setFormData((prev) => ({ ...prev, carModel: newValue }))
							}
							disabled={!formData.carMake}
						/>
						<PlacesAutocomplete
							label='Starting Location'
							value={formData.startLocation}
							onChange={(value) => handleStartLocationChange(value, null)}
							onCoordinatesChange={(coords) =>
								handleStartLocationChange(formData.startLocation, coords)
							}
							name='startLocation'
						/>
						<PlacesAutocomplete
							label='Destination'
							value={formData.endLocation}
							onChange={(value) => handleEndLocationChange(value, null)}
							onCoordinatesChange={(coords) =>
								handleEndLocationChange(formData.endLocation, coords)
							}
							name='endLocation'
						/>
						<TextField
							label='Gas Price per Gallon'
							type='number'
							value={gasPrice}
							name='gasPrice'
							required
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
							onBlur={() => {
								const value = parseFloat(gasPrice);
								if (!isNaN(value)) {
									setGasPrice(
										Math.max(0.01, Math.min(9.99, Number(value.toFixed(2))))
									);
								} else {
									setGasPrice("2.99");
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
								height: "56px",
								"& .MuiButton-startIcon": {
									marginRight: 0,
								},
								position: "relative",
								textTransform: "uppercase",
								fontSize: "1rem",
								boxShadow: "none",
								"&:hover": {
									boxShadow: "none",
								},
							}}>
							{loading ? <DrivingCarLoader /> : "Calculate Route"}
						</Button>
					</Stack>
				</Grid>

				{error && (
					<Grid item xs={12}>
						<Alert severity='error'>{error}</Alert>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default GasCalculatorForm;
