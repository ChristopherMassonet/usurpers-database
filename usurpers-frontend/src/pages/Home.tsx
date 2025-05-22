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

  useEffect(() => {
    if (isLoaded && mapRef.current && window.google?.maps?.marker?.AdvancedMarkerElement) {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat: 40, lng: -100 },
        title: 'Debug Marker',
      });
      return () => { marker.map = null; };
    }
    console.log(cities)
  }, [isLoaded]);

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
            Promise.resolve().then(() => setMapReady(true));
          }}
        >
          {map && mapReady && cities.map((city: any) => (
            <OverlayView
              key={city.name}
              position={city.location}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div style={{ position: 'relative' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    minWidth: 40,
                    position: 'relative',
                  }}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <Pin color={heatColorMap[city.apokolipsHeat] || '#00e1ff'} size={hoveredCity === city.name ? 44 : 32} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#fff',
                      textShadow: '0 0 8px #000, 0 0 12px #00e1ff',
                      mt: 0.5,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    {city.name}
                  </Typography>

                  <Box
                    sx={{
                      position: 'absolute',
                      top: 48,
                      left: '50%',
                      transform: hoveredCity === city.name
                        ? 'translateX(-50%) scale(1)'
                        : 'translateX(-50%) scale(0.85)',
                      minWidth: 220,
                      opacity: hoveredCity === city.name ? 1 : 0,
                      pointerEvents: hoveredCity === city.name ? 'auto' : 'none',
                      transition: 'opacity 0.25s cubic-bezier(.4,2,.6,1), transform 0.25s cubic-bezier(.4,2,.6,1)',
                      transformOrigin: 'top center',
                      zIndex: 20,
                      background: 'rgba(24,26,32,0.95)',
                      border: `2px solid ${heatColorMap[city.apokolipsHeat] || '#00e1ff'}`,
                      borderRadius: 3,
                      boxShadow: `0 0 24px 4px ${heatColorMap[city.apokolipsHeat] || '#00e1ff'}55`,
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: heatColorMap[city.apokolipsHeat] || '#00e1ff', fontWeight: 700 }}>
                      {city.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff', mb: 1 }}>
                      {city.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                      Overseer: {city.overseer}<br />
                      Resistance Leader: {city.resistanceLeader}<br />
                      Glare: <span style={{ color: heatColorMap[city.apokolipsHeat] || '#00e1ff' }}>{city.apokolipsHeat}</span><br />
                      Main Export: {city.mainExport}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 1 }}>
                      Notable: {city.notableLocations?.join(', ')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 0.5 }}>
                      Allies: {city.alliesPresent?.join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </div>
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