import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getProjectProgress } from '../hooks/projectdetail';

export function getProjectStats(projectList) {
  return {
    total: projectList.length,
    completed: projectList.filter((project) => project.status === 'completed').length,
    pending: projectList.filter((project) => project.status === 'pending').length,
  };
}

function getProjectAcquisitionStatus(project) {
  const stages = project.stages || [];
  const documents = project.documents || [];
  const documentsVerified = documents.length > 0 && documents.every((document) => document.status === 'Verified');
  const allStagesCompleted = stages.length > 0 && stages.every((stage) => stage.status === 'completed');

  if (project.status === 'completed' || project.status === 'compensated' || allStagesCompleted) return 'Acquired';
  if (!documentsVerified) return 'Poss. Pending';
  if (stages.some((stage) => stage.status === 'active' || stage.status === 'in-progress')) return 'Under Acquisition';
  return 'Proposed';
}

function getAcquisitionStatuses(projectList) {
  const categories = [
    { label: 'Acquired', color: '#14b47e' },
    { label: 'Under Acquisition', color: '#3a9bd4' },
    { label: 'Proposed', color: '#6aa8d8' },
    { label: 'Poss. Pending', color: '#e7a84d' },
  ];

  return categories.map((category) => ({
    ...category,
    value: projectList.length
      ? Math.round((projectList.filter((project) => getProjectAcquisitionStatus(project) === category.label).length / projectList.length) * 1000) / 10
      : 0,
  }));
}

function getStateSnapshot(projectList) {
  const byState = projectList.reduce((states, project) => {
    const state = project.state || 'Unknown';
    if (!states[state]) states[state] = { name: state, count: 0, progress: 0 };
    states[state].count += 1;
    states[state].progress += Number(project.progress) || getProjectProgress(project);
    return states;
  }, {});

  const colors = [
    ['#7ed1a3', '#11946b'],
    ['#f0c48c', '#b87a2d'],
    ['#a3c9dc', '#4a7ca0'],
    ['#7ab8e8', '#2e5fc2'],
  ];

  return Object.values(byState).map((state, index) => ({
    ...state,
    value: Math.round(state.progress / state.count),
    projects: `${state.count} project${state.count === 1 ? '' : 's'}`,
    c1: colors[index % colors.length][0],
    c2: colors[index % colors.length][1],
  }));
}

const Donut3D = ({ value, c1, c2 }) => {
  const size = 140;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const offset = C - (value / 100) * C;
  const id = `grad-${c1.replace('#','')}-${value}`;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#dce8d8" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={offset} transform={`rotate(-90 ${size/2} ${size/2})`} style={{ filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.18))' }} />
      </svg>
      <Box sx={{ position: 'absolute', inset: `${stroke + 6}px`, bgcolor: '#f9fcf8', borderRadius: '50%', boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.16)', display: 'grid', placeItems: 'center' }}>
        <Typography sx={{ fontWeight: 900, fontSize: 24, color: '#1d4a3d' }}>{value}%</Typography>
      </Box>
    </Box>
  );
};

const ProgressBar = ({ value, gradient }) => (
  <Box sx={{ position: 'relative', height: 30, bgcolor: '#e8efe6', borderRadius: 99, overflow: 'hidden' }}>
    <Box sx={{ width: `${value}%`, height: '100%', background: gradient, borderRadius: 99 }} />
    <Typography sx={{ position: 'absolute', right: 12, top: 0, fontSize: 15, fontWeight: 900, lineHeight: '30px', color: '#0f2a1e' }}>{value}%</Typography>
  </Box>
);

export default function Dashboard({ selectedProject, onSelectProject, projects: projectList = [] }) {
  const displayProjects = projectList;
  const { total, completed, pending } = getProjectStats(projectList);
  const acquisitionStatuses = getAcquisitionStatuses(projectList);
  const stateSnapshot = getStateSnapshot(projectList);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#ecebe6', p: 0 }}>
      <Box sx={{ width: '100%', p: 3, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        <h1 className="mb-5 text-2xl font-black text-[#1d4a3d]">Dashboard</h1>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 4, mb: 10, width: '100%' }} name="boxes of statistics">
          <Box sx={{ minHeight: 112, bgcolor: 'white', borderRadius: '26px', p: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7', borderTop: '4px solid #1a8a64', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 34px rgba(22,99,61,0.14)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6a8a7c' }}>Total Projects</Typography>
              <Box aria-hidden="true" sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#d8eee7', display: 'grid', placeItems: 'center', color: '#16633d', fontSize: 18, fontWeight: 700 }}>#</Box>
            </Box>
            <Typography sx={{ mt: 1.5, fontSize: 36, fontWeight: 900, lineHeight: 1, color: '#1d4a3d' }}>{total}</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13, fontWeight: 600, color: '#6a8a7c' }}>Across all acquisition stages</Typography>
          </Box>

          <Box sx={{ minHeight: 112, bgcolor: 'white', borderRadius: '26px', p: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7', borderTop: '4px solid #14b47e', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 34px rgba(20,180,126,0.14)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6a8a7c' }}>Completed Projects</Typography>
              <Box aria-hidden="true" sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#d8eee7', display: 'grid', placeItems: 'center', color: '#1f8e67', fontSize: 18, fontWeight: 900 }}>✓</Box>
            </Box>
            <Typography sx={{ mt: 1.5, fontSize: 36, fontWeight: 900, lineHeight: 1, color: '#1f8e67' }}>{completed}</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13, fontWeight: 600, color: '#6a8a7c' }}>Successfully processed</Typography>
          </Box>

          <Box sx={{ minHeight: 112, bgcolor: 'white', borderRadius: '26px', p: 2, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7', borderTop: '4px solid #e7a84d', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 34px rgba(231,168,77,0.16)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6a8a7c' }}>Pending Projects</Typography>
              <Box aria-hidden="true" sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#ffedd5', display: 'grid', placeItems: 'center', color: '#b47a1f', fontSize: 18 }}>◷</Box>
            </Box>
            <Typography sx={{ mt: 1.5, fontSize: 36, fontWeight: 900, lineHeight: 1, color: '#b47a1f' }}>{pending}</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13, fontWeight: 600, color: '#6a8a7c' }}>Awaiting next action</Typography>
          </Box>
        </Box>

      

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 3, alignItems: 'stretch' }}>
          <Box sx={{ bgcolor: '#eef6e6', borderRadius: '26px', p: 3, border: '1px solid #dfead8', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <Typography sx={{ fontWeight: 900, fontSize: 23, color: '#11261c', mb: 2 }}>Projects</Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}>
            <Box sx={{ minHeight: 220, bgcolor: 'white', borderRadius: '26px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 22, color: '#11261c', lineHeight: 1.25 }}>{displayProjects[0]?.name || 'No projects added yet'}</Typography>
              {displayProjects[0] && <Typography sx={{ fontSize: 15.5, color: '#1a8a64', fontWeight: 700, mt: 0.8 }}>{displayProjects[0].state} • {displayProjects[0].district}</Typography>}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: 16.5, fontWeight: 800, color: '#1a3a2e', mb: 1.4 }}>Sec. 77 Compensation</Typography>
              <ProgressBar value={getProjectProgress(displayProjects[0])} gradient="linear-gradient(90deg, #129b71, #88d9a8)" />
            </Box>
            </Box>

            <Box sx={{ minHeight: 220, bgcolor: 'white', borderRadius: '26px', p: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 22, color: '#11261c', lineHeight: 1.25 }}>{displayProjects[1]?.name || 'No projects added yet'}</Typography>
              {displayProjects[1] && <Typography sx={{ fontSize: 15.5, color: '#1a5a8a', fontWeight: 700, mt: 0.8 }}>{displayProjects[1].state} • {displayProjects[1].district}</Typography>}
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: 16.5, fontWeight: 800, color: '#1a3a2e', mb: 1.4 }}>SIA</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ flex: 1 }}><ProgressBar value={getProjectProgress(displayProjects[1])} gradient="linear-gradient(90deg, #2d9bdf, #6ec6f0)" /></Box>
                <Box sx={{ bgcolor: '#ffedd5', color: '#9a4d00', fontSize: 13, fontWeight: 800, px: 1.8, py: 0.6, borderRadius: 99, border: '1px solid #fed7aa' }}>🔥 Medium</Box>
              </Box>
            </Box>
            </Box>
          <Box sx={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', justifySelf: 'center', alignSelf: 'end', width: '20%', mt: 2, paddingTop: 1, backgroundColor: '#2ecf39', borderRadius: '16px', border: '1px solid #112802', boxShadow: '0 6px 16px rgba(22,99,61,0.3)' }}>
            <Link
              to="/projects"
              aria-label="View all projects"
              className="flex items-center justify-center rounded-[16px] bg-[#16633d] px-8 py-3 text-lg font-extrabold text-white shadow-[0_6px_16px_rgba(22,99,61,0.3)] transition-colors hover:bg-[#134f31] focus:outline-none focus:ring-2 focus:ring-[#1a8a64] focus:ring-offset-2"
            >
              View All
            </Link>
            </Box>
          </Box>
          </Box>

          <Box sx={{ minHeight: 220, bgcolor: '#ffffff', borderRadius: '26px', p: 3, border: '1px solid #e9ece7', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <Typography sx={{ fontWeight: 900, fontSize: 21, color: '#11261c', mb: 3.5 }}>Land Acquisition Status</Typography>
            {acquisitionStatuses.map((i) => (
              <Box key={i.l} sx={{ mb: 2.8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#243a2e' }}>{i.l}</Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 900, color: i.c }}>{i.v}%</Typography>
                </Box>
                <Box sx={{ height: 14, bgcolor: '#edf2ea', borderRadius: 99, overflow: 'hidden' }}>
                  <Box sx={{ width: `${i.v}%`, height: '100%', bgcolor: i.c, borderRadius: 99 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* SPACING BEFORE STATE-WISE - 32px gap */}
        <Box sx={{ height: 36 }} />

        {/* BOTTOM SNAPSHOT */}
        <Box sx={{ width: '100%', bgcolor: '#eef6e6', borderRadius: '26px', p: 4, border: '1px solid #dfead8', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <Typography sx={{ fontWeight: 900, fontSize: 23, color: '#11261c', mb: 4 }}>State-wise Acquisition Snapshot</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 3, width: '100%' }}>
            {stateSnapshot.map((s) => (
              <Box key={s.n} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Donut3D value={s.v} c1={s.c1} c2={s.c2} />
                <Typography sx={{ mt: 2, fontWeight: 800, fontSize: 15, color: '#11261c' }}>{s.n}</Typography>
                <Typography sx={{ fontSize: 13, color: '#6a8a7c', fontWeight: 600, mt: 0.2 }}>{s.projects}</Typography>
              </Box>
            ))}
            {!stateSnapshot.length && <Typography sx={{ color: '#6a8a7c', fontWeight: 700 }}>No projects added yet</Typography>}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}