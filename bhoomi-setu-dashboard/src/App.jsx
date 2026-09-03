import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import GISMap from './components/GISMap';
import Workflow from './components/Workflow';
import CompensationCalc from './components/CompensationCalc';
import Documents from './components/Documents';
import Alerts from './components/Alerts';
import DecisionSupport from './components/DecisionSupport';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#eef2ee', // light bg like in image
        p: 0,
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />

        <Box sx={{ flex: 1, p: 2.5, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gis-map" element={<GISMap />} />
            <Route path="/statutory-workflow" element={<Workflow />} />
            <Route path="/compensation-calc" element={<CompensationCalc />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/smart-alerts" element={<Alerts />} />
            <Route path="/ai-decision-support" element={<DecisionSupport />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;