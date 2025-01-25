export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const mapOptions = {
	mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID, // Optional: Custom map style ID
	disableDefaultUI: false,
	clickableIcons: false,
	scrollwheel: true,
};

export const defaultCenter = {
	lat: 40.7128,
	lng: -74.006, // NYC coordinates as default
};
