"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
});

const theme = createTheme({
	typography: {
		fontFamily: spaceGrotesk.style.fontFamily,
		allVariants: {
			textTransform: "uppercase",
			letterSpacing: "0.05em",
		},
		h1: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		h2: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		h3: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		h4: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		h5: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		h6: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		body1: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		body2: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
		button: {
			fontFamily: spaceGrotesk.style.fontFamily,
		},
	},
	palette: {
		primary: {
			main: "#488286",
			light: "#D8E8E8",
			dark: "#305252",
		},
		secondary: {
			main: "#77878B",
			dark: "#373E40",
		},
		background: {
			default: "#FFFFFF",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#373E40",
			secondary: "#77878B",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					backgroundColor: "#488286",
					"&:hover": {
						backgroundColor: "#305252",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: "#FFFFFF",
					boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#305252",
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					textTransform: "uppercase",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					textTransform: "uppercase",
				},
			},
		},
	},
});

export function Providers({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
