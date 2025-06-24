import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="glow">
          Resistance Database
        </Typography>
        <Box>
          <Button
            color={location.pathname === '/' ? 'secondary' : 'inherit'}
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            Map
          </Button>
          <Button
            color={location.pathname === '/agents' ? 'secondary' : 'inherit'}
            component={Link}
            to="/agents"
          >
            Agents
          </Button>
          <Button
            color={location.pathname === '/inbox' ? 'secondary' : 'inherit'}
            component={Link}
            to="/inbox"
            sx={{ ml: 2 }}
          >
            Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 