import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface Agent {
  id: number;
  Name: string;
  Age: number;
  Abilities: string[];
  Location: string;
  'Known Associates': string[];
  Affiliation: string;
  'Metahuman Status': string;
  Image?: string;
  Biography?: string;
}

interface AgentModalProps {
  open: boolean;
  onClose: () => void;
  agent: Agent | null;
}

const AgentModal: React.FC<AgentModalProps> = ({ open, onClose, agent }) => {
  if (!agent) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          {agent.Name}
        </Typography>
        <Button onClick={onClose} startIcon={<Close />}>
          Close
        </Button>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Agent Image */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={agent.Image ? `${process.env.PUBLIC_URL}${agent.Image}` : undefined}
                alt={agent.Name}
                sx={{ 
                  width: 200, 
                  height: 200, 
                  mb: 2,
                  border: '3px solid #e0e0e0'
                }}
              >
                {!agent.Image && agent.Name.charAt(0)}
              </Avatar>
              <Chip 
                label={agent['Metahuman Status']} 
                color={agent['Metahuman Status'] === 'Metahuman' ? 'primary' : 'default'}
                variant="outlined"
              />
            </Box>
          </Grid>

          {/* Agent Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1">
                    {agent.Age}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {agent.Location}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Affiliation
                  </Typography>
                  <Typography variant="body1">
                    {agent.Affiliation}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Abilities */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Abilities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {agent.Abilities.map((ability, index) => (
                  <Chip 
                    key={index} 
                    label={ability} 
                    variant="outlined" 
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            {/* Known Associates */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Known Associates
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {agent['Known Associates'].map((associate, index) => (
                  <Chip 
                    key={index} 
                    label={associate} 
                    variant="outlined" 
                    size="small"
                    color="secondary"
                  />
                ))}
              </Box>
            </Box>

            {/* Biography */}
            {agent.Biography && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Biography
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {agent.Biography}
                  </Typography>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentModal; 