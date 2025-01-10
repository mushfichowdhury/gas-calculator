import { Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";

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
	authors: [{ name: "Your Name" }],
	viewport: "width=device-width, initial-scale=1",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={spaceGrotesk.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
