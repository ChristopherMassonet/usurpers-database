// usurpers-frontend/src/components/CityModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface City {
  name: string;
  overseer: string;
  resistanceLeader: string;
  apokolipsHeat: string;
  mainExport: string;
  description: string;
  notableLocations?: string[];
  alliesPresent?: string[];
  location: { lat: number; lng: number };
}

interface CityModalProps {
  open: boolean;
  onClose: () => void;
  city: City | null;
}

const heatColorMap: Record<string, string> = {
  'Low': '#00e1ff',
  'Medium Low': '#00ff6a',
  'Medium': '#ffe600',
  'Medium High': '#ff9100',
  'High': '#ff0033',
  'Extreme': '#ff0000',
  'Unknown': '#000000',
};

const CityModal: React.FC<CityModalProps> = ({ open, onClose, city }) => {
  if (!city) return null;

  const heatColor = heatColorMap[city.apokolipsHeat] || '#00e1ff';

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          border: `2px solid ${heatColor}`,
          boxShadow: `0 0 24px 4px ${heatColor}55`,
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(24,26,32,0.95)' }}>
        <Typography variant="h5" component="div" sx={{ color: heatColor }}>
          {city.name}
        </Typography>
        <Button onClick={onClose} startIcon={<Close />}>
          Close
        </Button>
      </DialogTitle>
      
      <DialogContent dividers sx={{ background: 'rgba(24,26,32,0.95)' }}>
        <Grid container spacing={3}>
          {/* City Visual */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${heatColor} 0%, transparent 70%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  border: `3px solid ${heatColor}`,
                  boxShadow: `0 0 24px 4px ${heatColor}55`,
                }}
              >
                <Typography variant="h3" sx={{ color: '#fff', opacity: 0.7 }}>
                  {city.name.charAt(0)}
                </Typography>
              </Box>
              <Chip 
                label={`Glare: ${city.apokolipsHeat}`} 
                sx={{ 
                  backgroundColor: heatColor,
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Grid>

          {/* City Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: heatColor }}>
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Overseer
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {city.overseer}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Resistance Leader
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {city.resistanceLeader}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Main Export
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {city.mainExport}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {city.location.lat.toFixed(3)}°, {city.location.lng.toFixed(3)}°
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 2, borderColor: heatColor + '55' }} />

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: heatColor }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.6 }}>
                {city.description}
              </Typography>
            </Box>

            {/* Notable Locations */}
            {city.notableLocations && city.notableLocations.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: heatColor }}>
                  Notable Locations
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {city.notableLocations.map((location, index) => (
                    <Chip 
                      key={index} 
                      label={location} 
                      variant="outlined" 
                      size="small"
                      sx={{ color: '#fff', borderColor: heatColor + '55' }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Allies Present */}
            {city.alliesPresent && city.alliesPresent.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: heatColor }}>
                  Allies Present
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {city.alliesPresent.map((ally, index) => (
                    <Chip 
                      key={index} 
                      label={ally} 
                      variant="outlined" 
                      size="small"
                      color="secondary"
                      sx={{ color: '#fff', borderColor: heatColor + '55' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, background: 'rgba(24,26,32,0.95)' }}>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: heatColor }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CityModal;