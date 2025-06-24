import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import agentData from '../data/agentData.json';
import AgentModal from '../components/AgentModal';

const getUniqueValues = (data: any[], field: string) => {
  const values = data.map((row) => row[field]);
  if (Array.isArray(values[0])) {
    return Array.from(new Set(values.flat()));
  }
  return Array.from(new Set(values));
};

const Agents: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [affiliationFilter, setAffiliationFilter] = useState('');
  const [metahumanFilter, setMetahumanFilter] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', flex: 1, sortable: true },
    { field: 'Identity', headerName: 'Identity', flex: 1, sortable: true },
    { field: 'Age', headerName: 'Age', flex: 0.5, sortable: true, type: 'number' },
    { field: 'Abilities', headerName: 'Abilities', flex: 1, sortable: false, renderCell: (params: GridRenderCellParams) => (params.value ? (params.value as string[]).join(', ') : '') },
    { field: 'Location', headerName: 'Location', flex: 1, sortable: true },
    { field: 'Known Associates', headerName: 'Known Associates', flex: 1, sortable: false, renderCell: (params: GridRenderCellParams) => (params.value ? (params.value as string[]).join(', ') : '') },
    { field: 'Affiliation', headerName: 'Affiliation', flex: 1, sortable: true },
    { field: 'Metahuman Status', headerName: 'Metahuman Status', flex: 1, sortable: true },
  ];

  let rows = agentData.map((row, idx) => ({ id: idx, ...row }));
  if (locationFilter) rows = rows.filter(r => r.Location === locationFilter);
  if (affiliationFilter) rows = rows.filter(r => r.Affiliation === affiliationFilter);
  if (metahumanFilter) rows = rows.filter(r => r['Metahuman Status'] === metahumanFilter);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedAgent(params.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agents
      </Typography>
      <Button variant="outlined" onClick={() => setFilterOpen(true)} sx={{ mb: 2 }}>
        Filter
      </Button>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick 
          autoHeight 
          onRowClick={handleRowClick}
          sx={{ cursor: 'pointer' }}
        />
      </Box>
      
      {/* Filter Dialog */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filter Agents</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Location</InputLabel>
            <Select value={locationFilter} label="Location" onChange={e => setLocationFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {getUniqueValues(agentData, 'Location').map(loc => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Affiliation</InputLabel>
            <Select value={affiliationFilter} label="Affiliation" onChange={e => setAffiliationFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {getUniqueValues(agentData, 'Affiliation').map(aff => (
                <MenuItem key={aff} value={aff}>{aff}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Metahuman Status</InputLabel>
            <Select value={metahumanFilter} label="Metahuman Status" onChange={e => setMetahumanFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {getUniqueValues(agentData, 'Metahuman Status').map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => setFilterOpen(false)} sx={{ mt: 3 }} variant="contained">Close</Button>
        </DialogContent>
      </Dialog>

      {/* Agent Modal */}
      <AgentModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        agent={selectedAgent} 
      />
    </Container>
  );
};

export default Agents; 