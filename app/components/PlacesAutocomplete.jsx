"use client";
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

const PlacesAutocomplete = ({ label, value, onChange }) => {
	const inputRef = useRef(null);
	const autoCompleteRef = useRef(null);

	useEffect(() => {
		const initializeAutocomplete = () => {
			if (
				!autoCompleteRef.current &&
				inputRef.current &&
				window.google &&
				window.google.maps &&
				window.google.maps.places
			) {
				try {
					autoCompleteRef.current = new window.google.maps.places.Autocomplete(
						inputRef.current,
						{
							componentRestrictions: { country: "us" },
							fields: ["formatted_address", "geometry", "name"],
							types: ["address"],
						}
					);

					autoCompleteRef.current.addListener("place_changed", () => {
						try {
							const place = autoCompleteRef.current.getPlace();
							if (place && place.formatted_address) {
								onChange(place.formatted_address);
								inputRef.current.blur();
							} else if (inputRef.current.value) {
								onChange(inputRef.current.value);
								inputRef.current.blur();
							}
						} catch (error) {
							console.error("Error handling place selection:", error);
						}
					});

					const handleKeyDown = (e) => {
						if (e.key === "Enter" || e.key === "Tab") {
							e.preventDefault();
							if (inputRef.current.value) {
								onChange(inputRef.current.value);
								inputRef.current.blur();
								const form = inputRef.current.closest("form");
								if (form) {
									const focusableElements = form.querySelectorAll(
										"button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
									);
									const currentIndex = Array.from(focusableElements).indexOf(
										inputRef.current
									);
									if (
										currentIndex > -1 &&
										currentIndex < focusableElements.length - 1
									) {
										focusableElements[currentIndex + 1].focus();
									}
								}
							}
						}
					};

					inputRef.current.addEventListener("keydown", handleKeyDown);

					const handleClickOutside = (event) => {
						if (inputRef.current && !inputRef.current.contains(event.target)) {
							inputRef.current.blur();
						}
					};

					document.addEventListener("mousedown", handleClickOutside);

					return () => {
						document.removeEventListener("mousedown", handleClickOutside);
						if (inputRef.current) {
							inputRef.current.removeEventListener("keydown", handleKeyDown);
						}
					};
				} catch (error) {
					console.error("Error initializing autocomplete:", error);
				}
			}
		};

		const checkGoogleMapsInterval = setInterval(() => {
			if (window.google && window.google.maps && window.google.maps.places) {
				initializeAutocomplete();
				clearInterval(checkGoogleMapsInterval);
			}
		}, 100);

		return () => {
			clearInterval(checkGoogleMapsInterval);
		};
	}, [onChange]);

	return (
		<TextField
			inputRef={inputRef}
			label={label}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onBlur={() => {
				setTimeout(() => {
					if (inputRef.current) {
						onChange(inputRef.current.value);
					}
				}, 100);
			}}
			fullWidth
			required
		/>
	);
};

export default PlacesAutocomplete;
