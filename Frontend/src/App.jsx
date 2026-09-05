import { useState } from 'react';
import { Box } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import GISMap from './components/GISMap';
import Workflow from './components/Workflow';
import CompensationCalc from './components/CompensationCalc';
import Documents from './components/Documents';
import Alerts from './components/Alerts';
import DecisionSupport from './components/DecisionSupport';
import Auth from './components/Auth';
import NewProjectDialog from './components/NewProjectDialog';
import { hasSession } from './api';
import useProjects from './hooks/useProjects';

function normalizeProject(project) {
  return {
    ...project,
    id: project.id || project.parcelId,
    name: project.name || project.title,
  };
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const { projects: projectList, addProject, updateProject } = useProjects();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Routes>
    );
  }

  if (!hasSession()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#eef2ee', // light bg like in image
        p: 0,
      }}
    >
      <Sidebar selectedProject={selectedProject} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar onNewProject={() => setIsNewProjectOpen(true)} />

        <NewProjectDialog
          open={isNewProjectOpen}
          onClose={() => setIsNewProjectOpen(false)}
          onCreated={addProject}
        />

        <Box sx={{ flex: 1, p: 2.5, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<Dashboard projects={projectList.map(normalizeProject)} selectedProject={selectedProject} onSelectProject={setSelectedProject} />}
            />
            <Route
              path="/projects"
              element={(
                <ProjectList
                  projects={projectList.map(normalizeProject)}
                  selectedProject={selectedProject}
                  onSelect={setSelectedProject}
                />
              )}
            />
            <Route path="/gis-map" element={<GISMap />} />
            <Route path="/statutory-workflow" element={<Workflow projectId={selectedProject?.id} projects={projectList} />} />
            <Route path="/compensation-calc" element={<CompensationCalc projectId={selectedProject?.id} projects={projectList} onUpdated={updateProject} />} />
            <Route path="/documents" element={<Documents projectId={selectedProject?.id} projects={projectList} />} />
            <Route path="/smart-alerts" element={<Alerts />} />
            <Route path="/ai-decision-support" element={<DecisionSupport />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;