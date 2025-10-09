
"use client";

import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function Map() {
  const position = { lat: 37.7946, lng: -122.3999 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
        <p>Google Maps API key is missing. Please add it to your .env file.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        style={{ width: "100%", height: "100%" }}
        defaultCenter={position}
        defaultZoom={15}
        mapId="shopstack-map"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={position}>
            <Pin 
                background={'hsl(var(--primary))'}
                borderColor={'hsl(var(--primary))'}
                glyphColor={'hsl(var(--primary-foreground))'}
            />
        </AdvancedMarker>
      </GoogleMap>
    </APIProvider>
  );
}
