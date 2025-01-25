"use client";
import { useState, useEffect, useRef } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

const PlacesAutocomplete = ({
	label,
	value,
	onChange,
	onCoordinatesChange,
	name,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const debounceTimer = useRef(null);

	useEffect(() => {
		setInputValue(value || "");
	}, [value]);

	const handleInputChange = async (event, newInputValue) => {
		setInputValue(newInputValue);

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		if (!newInputValue || newInputValue.length < 3) {
			setOptions([]);
			return;
		}

		debounceTimer.current = setTimeout(async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/places/autocomplete?input=${encodeURIComponent(newInputValue)}`
				);
				const data = await response.json();
				if (data.predictions) {
					setOptions(data.predictions);
				}
			} catch (error) {
				console.error("Error searching addresses:", error);
				setOptions([]);
			} finally {
				setLoading(false);
			}
		}, 300);
	};

	const handleChange = async (event, newValue) => {
		if (!newValue) {
			onChange("");
			onCoordinatesChange(null);
			return;
		}

		// If newValue is a string, it's a free-form input
		if (typeof newValue === "string") {
			setInputValue(newValue);
			onChange(newValue);
			return;
		}

		// If it's an object from the predictions, it has a place_id
		if (newValue.place_id) {
			const description = newValue.description;
			setInputValue(description);
			onChange(description);

			try {
				const response = await fetch(
					`/api/places/details?placeId=${newValue.place_id}`
				);
				const data = await response.json();

				if (data.result && data.result.geometry) {
					const location = data.result.geometry.location;
					onCoordinatesChange({ lat: location.lat, lon: location.lng });
				}
			} catch (error) {
				console.error("Error fetching place details:", error);
			}
		}
	};

	return (
		<Autocomplete
			id={`places-autocomplete-${name}`}
			freeSolo
			autoComplete
			includeInputInList
			filterSelectedOptions
			options={options}
			getOptionLabel={(option) => {
				if (typeof option === "string") {
					return option;
				}
				return option.description || "";
			}}
			value={value}
			onChange={handleChange}
			inputValue={inputValue}
			onInputChange={handleInputChange}
			loading={loading}
			loadingText='Searching for addresses...'
			noOptionsText={
				inputValue.length < 3
					? "Type at least 3 characters"
					: "No addresses found"
			}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					required
					fullWidth
					name={name}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color='inherit' size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default PlacesAutocomplete;
