"use client";
import { useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import GoogleMap from "./components/GoogleMap";
import GasCalculatorForm from "./components/GasCalculatorForm";

export default function Home() {
	const [route, setRoute] = useState(null);

	const handleRouteCalculated = (routeData) => {
		setRoute(routeData);
	};

	return (
		<Box
			component='main'
			sx={{
				minHeight: "100vh",
				backgroundColor: "background.default",
			}}>
			<Container
				maxWidth='lg'
				sx={{
					p: { xs: 2, md: 4 },
				}}>
				<Box mb={4} sx={{ textAlign: "center" }}>
					<Typography
						variant='h3'
						component='h1'
						gutterBottom
						sx={{
							color: "primary.dark",
							fontWeight: "medium",
						}}>
						Gas Cost Calculator
					</Typography>
				</Box>

				<Grid
					container
					direction='column'
					sx={{ maxWidth: "900px", mx: "auto" }}>
					<Grid item xs={12} sx={{ mb: 4 }}>
						<Paper
							elevation={3}
							sx={{
								p: { xs: 2, sm: 3, md: 4 },
								borderRadius: 2,
								border: "1px solid",
								borderColor: "primary.light",
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

					<Grid item xs={12}>
						<Paper
							elevation={3}
							sx={{
								p: { xs: 2, sm: 3, md: 4 },
								borderRadius: 2,
								border: "1px solid",
								borderColor: "primary.light",
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
							<GoogleMap route={route} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
