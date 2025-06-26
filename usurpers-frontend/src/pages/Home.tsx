import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import cityData from '../data/cityData.json';
import Pin from '../components/Pin';


const containerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  zIndex: 1,
};

const overlayStyle = {
  position: 'relative' as const,
  zIndex: 2,
  width: '100vw',
  pt: { xs: 7, sm: 8 }, // Padding top for navbar
  px: 4,
  color: '#fff',
  pointerEvents: 'none' as const,
};

const center = {
  lat: 39.8283, // Center of the US
  lng: -98.5795,
};

const customMapStyle = [
  // General dark background
  { stylers: [{ color: "#1d2c4d" }] },
  // State boundaries and labels
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#00e1ff" }, { weight: 2 }]
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text.fill",
    stylers: [{ color: "#00e1ff" }]
  },
  // Hide all city/locality labels
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  // Hide all POI labels and geometry
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }]
  },
  // Hide all water labels
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  // Remove special coloring for cities/POIs
  {
    featureType: "administrative.locality",
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }]
  },
  // Keep water and land dark
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }]
  },
  // Country borders
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#00e1ff" }, { weight: 2 }]
  },
];

const heatColorMap: Record<string, string> = {
  'Low': '#00e1ff',
  'Medium Low': '#00ff6a',
  'Medium': '#ffe600',
  'Medium High': '#ff9100',
  'High': '#ff0033',
  'Extreme': '#ff0000',
  'Unknown': '#000000',
};

const Home: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC7QEC7jQLIQJZ_iE-wYp-mOZV3xUuPyaQ',
  });

  const [mapReady, setMapReady] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [mapKey, setMapKey] = useState(() => Date.now());
  const cities = Object.values(cityData);

  const mapRef = useRef<google.maps.Map | null>(null);

  // Removed the unnecessary AdvancedMarkerElement useEffect - it was likely for debugging
  // and could cause issues if the "marker" library isn't loaded in useJsApiLoader

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {isLoaded ? (
        <GoogleMap
          key={mapKey}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={{
            styles: customMapStyle,
            disableDefaultUI: true,
            zoomControl: false,
            scrollwheel: true,
            gestureHandling: 'greedy',
          }}
          onLoad={(map) => {
            setMap(map);
            mapRef.current = map;
            // Set mapReady synchronously to avoid timing issues on remount/navigation
            setMapReady(true);
          }}
        >
          {map && mapReady && cities.map((city: any) => (
            <OverlayView
              key={city.name}
              position={city.location}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              // ... existing code ...
            </OverlayView>
          ))}
        </GoogleMap>
      ) : (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>
          <Typography variant="body1" color="text.secondary">
            Loading map...
          </Typography>
        </Box>
      )}

      {/* Overlay for title or other elements, if needed */}
      {/* <Box sx={overlayStyle}>
        <Typography variant="h4" gutterBottom className="glow">
          America Map Hub
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Home; 
