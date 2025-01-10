"use client";
import { useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import MapComponent from "./components/GoogleMap";
import GasCalculatorForm from "./components/GasCalculatorForm";
import GoogleMapsLoader from "./components/GoogleMapsLoader";

export default function Home() {
	const [directions, setDirections] = useState(null);

	const handleRouteCalculated = (results) => {
		setDirections(results);
	};

	return (
		<Box
			component='main'
			sx={{
				minHeight: "100vh",
				backgroundColor: "background.default",
			}}>
			<Container
				maxWidth={false}
				sx={{
					maxWidth: "1800px",
					p: { xs: 2, md: 4 },
				}}>
				<Box mb={4} sx={{ textAlign: "center" }}>
					<Typography
						variant='h3'
						component='h1'
						gutterBottom
						sx={{
							color: "primary.dark",
							fontWeight: "bold",
						}}>
						Gas Cost Calculator
					</Typography>
				</Box>

				<GoogleMapsLoader>
					<Grid
						container
						spacing={{ xs: 2, md: 4 }}
						sx={{
							maxWidth: "100%",
							mx: "auto",
						}}>
						<Grid item xs={12} md={6}>
							<Paper
								elevation={3}
								sx={{
									p: 3,
									borderRadius: 2,
									border: "1px solid",
									borderColor: "primary.light",
									height: "100%",
								}}>
								<Typography
									variant='h5'
									component='h2'
									align='center'
									sx={{
										color: "secondary.dark",
										mb: 4,
										width: "100%",
										textAlign: "center",
									}}>
									Enter Trip Details
								</Typography>
								<GasCalculatorForm onRouteCalculated={handleRouteCalculated} />
							</Paper>
						</Grid>

						<Grid item xs={12} md={6}>
							<Paper
								elevation={3}
								sx={{
									p: 3,
									borderRadius: 2,
									border: "1px solid",
									borderColor: "primary.light",
									height: "100%",
								}}>
								<Typography
									variant='h5'
									component='h2'
									align='center'
									sx={{
										color: "secondary.dark",
										mb: 4,
										width: "100%",
										textAlign: "center",
									}}>
									Route Map
								</Typography>
								<MapComponent directions={directions} />
							</Paper>
						</Grid>
					</Grid>
				</GoogleMapsLoader>
			</Container>
		</Box>
	);
}
