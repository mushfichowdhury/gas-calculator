import { Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Gas Cost Calculator",
	description:
		"Calculate the estimated gas cost for your trip based on your vehicle and route.",
	keywords: [
		"gas calculator",
		"trip planner",
		"fuel cost",
		"route planning",
		"travel expenses",
	],
	authors: [{ name: "Mushfi Chowdhury" }],
	viewport: "width=device-width, initial-scale=1",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={spaceGrotesk.className}>
			<head>
				<Script
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`}
					strategy='afterInteractive'
					as='script'
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
