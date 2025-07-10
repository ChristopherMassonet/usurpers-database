import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { GoogleMap, useJsApiLoader, OverlayViewF } from '@react-google-maps/api';
import cityData from '../data/cityData.json';
import Pin from '../components/Pin';
import CityModal from '../components/CityModal';


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

// Custom overlay component for better performance, this will be put into its own component file
const CityOverlay = ({ city, onMouseEnter, onMouseLeave, onClick, isHovered }: {
  city: any;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showAbove, setShowAbove] = useState(false);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  
  const onLoad = useCallback((overlay: google.maps.OverlayView) => {
    // Store reference for potential position updates
    if (overlayRef.current) {
      (overlayRef.current as any).overlay = overlay;
    }
  }, []);

    // Check if popup should appear above the pin and handle horizontal positioning
    useEffect(() => {
      if (isHovered && overlayRef.current) {
        const rect = overlayRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const popupHeight = 320; // Approximate height of the popup
        const popupWidth = 220; // Approximate width of the popup
        
        // If pin is in bottom third of screen, show popup above
        setShowAbove(rect.bottom + popupHeight > viewportHeight - 50);
        
        // Handle horizontal positioning
        const popupLeft = rect.left + rect.width / 2 - popupWidth / 2;
        const popupRight = popupLeft + popupWidth;
        
        let offset = 0;
        
        // If popup would be cut off on the left
        if (popupLeft < 10) {
          offset = 10 - popupLeft;
        }
        // If popup would be cut off on the right
        else if (popupRight > viewportWidth - 10) {
          offset = viewportWidth - 10 - popupRight;
        }
        
        setHorizontalOffset(offset);
      }
    }, [isHovered]);

  return (
    <OverlayViewF
      position={city.location}
      mapPaneName="overlayMouseTarget"
      onLoad={onLoad}
    >
      <div 
        ref={overlayRef}
        style={{ 
          position: 'relative',
          zIndex: isHovered ? 1000 : 10 // Higher z-index when hovered
        }}
      >
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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <Pin color={heatColorMap[city.apokolipsHeat] || '#00e1ff'} size={isHovered ? 44 : 32} />
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
          {/* Hover info box */}
          <Box
            sx={{
              position: 'absolute',
              top: showAbove ? 'auto' : 48,
              bottom: showAbove ? 48 : 'auto',
              left: `calc(50% + ${horizontalOffset}px)`,
              transform: isHovered
                ? 'translateX(-50%) scale(1)'
                : 'translateX(-50%) scale(0.85)',
              minWidth: 220,
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
              transition: 'opacity 0.25s cubic-bezier(.4,2,.6,1), transform 0.25s cubic-bezier(.4,2,.6,1)',
              transformOrigin: showAbove ? 'bottom center' : 'top center',
              zIndex: 1001, // Even higher z-index for the popup
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
    </OverlayViewF>
  );
};

const Home: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC7QEC7jQLIQJZ_iE-wYp-mOZV3xUuPyaQ',
  });

  const [mapReady, setMapReady] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const cities = Object.values(cityData);

  const mapRef = useRef<google.maps.Map | null>(null);

  // Reset map state when component mounts
  useEffect(() => {
    setMapReady(false);
    setMap(null);
    mapRef.current = null;
  }, []);

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

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
    
    // Use a small delay to ensure the map is fully rendered
    setTimeout(() => {
      setMapReady(true);
    }, 100);
  };

  const handleMapUnmount = () => {
    setMapReady(false);
    setMap(null);
    mapRef.current = null;
  };

  const handleCityClick = (city: any) => {
    setSelectedCity(city);
    setCityModalOpen(true);
  };

  const handleCloseCityModal = () => {
    setCityModalOpen(false);
    setSelectedCity(null);
  };

  const handleCityMouseEnter = (cityName: string) => {
    setHoveredCity(cityName);
  };

  const handleCityMouseLeave = () => {
    setHoveredCity(null);
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {isLoaded ? (
        <GoogleMap
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
          onLoad={handleMapLoad}
          onUnmount={handleMapUnmount}
        >
                                {map && mapReady && cities.map((city: any) => (
             <CityOverlay
               key={city.name}
               city={city}
               onMouseEnter={() => handleCityMouseEnter(city.name)}
               onMouseLeave={handleCityMouseLeave}
               onClick={() => handleCityClick(city)}
               isHovered={hoveredCity === city.name}
             />
            ))}
        </GoogleMap>
      ) : (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>
          <Typography variant="body1" color="text.secondary">
            Loading map...
          </Typography>
        </Box>
      )}

      {/* City Modal */}
      <CityModal
        open={cityModalOpen}
        onClose={handleCloseCityModal}
        city={selectedCity}
      />

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
