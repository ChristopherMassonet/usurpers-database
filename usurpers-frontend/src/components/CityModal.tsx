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
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { Close, LocationOn, Person, Shield, Factory, Warning } from '@mui/icons-material';

interface City {
  name: string;
  overseer: string;
  resistanceLeader: string;
  apokolipsHeat: string;
  mainExport: string;
  description: string;
  notableLocations?: string[];
  alliesPresent?: string[];
  location: {
    lat: number;
    lng: number;
  };
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
  'Unknown': '#666666',
};

const getHeatIcon = (heat: string) => {
  switch (heat) {
    case 'Low':
      return '🔵';
    case 'Medium Low':
      return '🟢';
    case 'Medium':
      return '🟡';
    case 'Medium High':
      return '🟠';
    case 'High':
      return '🔴';
    case 'Extreme':
      return '⚫';
    default:
      return '⚪';
  }
};

const CityModal: React.FC<CityModalProps> = ({ open, onClose, city }) => {
  if (!city) return null;

  const heatColor = heatColorMap[city.apokolipsHeat] || '#666666';

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
          background: 'rgba(24,26,32,0.95)',
          border: `2px solid ${heatColor}`,
          boxShadow: `0 0 24px 4px ${heatColor}55`,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: `1px solid ${heatColor}`,
          pb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocationOn sx={{ color: heatColor }} />
          <Typography variant="h4" component="div" sx={{ color: heatColor, fontWeight: 700 }}>
            {city.name}
          </Typography>
        </Box>
        <Button 
          onClick={onClose} 
          startIcon={<Close />}
          sx={{ color: '#fff' }}
        >
          Close
        </Button>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* City Overview */}
          <Grid item xs={12}>
            <Card sx={{ 
              background: 'rgba(35, 38, 58, 0.7)', 
              border: `1px solid ${heatColor}40`,
              mb: 2
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                  City Overview
                </Typography>
                <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                  {city.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Key Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ color: heatColor }} />
                Leadership
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Overseer
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                    {city.overseer}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Resistance Leader
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                    {city.resistanceLeader}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Status Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning sx={{ color: heatColor }} />
                Status
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Apokolips Heat Level
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={`${getHeatIcon(city.apokolipsHeat)} ${city.apokolipsHeat}`}
                      sx={{ 
                        backgroundColor: `${heatColor}20`,
                        color: heatColor,
                        border: `1px solid ${heatColor}`,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Main Export
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Factory sx={{ color: '#aaa', fontSize: 16 }} />
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                      {city.mainExport}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Notable Locations */}
          {city.notableLocations && city.notableLocations.length > 0 && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: `${heatColor}40` }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                  Notable Locations
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {city.notableLocations.map((location, index) => (
                    <Chip 
                      key={index} 
                      label={location} 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        color: '#fff',
                        borderColor: '#555',
                        '&:hover': {
                          borderColor: heatColor,
                          backgroundColor: `${heatColor}10`
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Allies Present */}
          {city.alliesPresent && city.alliesPresent.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield sx={{ color: '#00ff6a' }} />
                  Allied Forces
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {city.alliesPresent.map((ally, index) => (
                    <Chip 
                      key={index} 
                      label={ally} 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        color: '#00ff6a',
                        borderColor: '#00ff6a',
                        backgroundColor: '#00ff6a10'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Coordinates */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2, borderColor: `${heatColor}40` }} />
            <Typography variant="caption" sx={{ color: '#666' }}>
              Coordinates: {city.location.lat.toFixed(4)}, {city.location.lng.toFixed(4)}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: `1px solid ${heatColor}40` }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{
            backgroundColor: heatColor,
            '&:hover': {
              backgroundColor: `${heatColor}dd`
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CityModal;