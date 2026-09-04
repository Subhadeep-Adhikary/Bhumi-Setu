import { Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectList from './ProjectList';

export const projects = [
  { name: 'Polavaram Irrigation Canal Network', status: 'completed' },
  { name: 'Pune-Mumbai Hyperloop Corridor', status: 'pending' },
];

export function getProjectStats(projectList) {
  return {
    total: projectList.length,
    completed: projectList.filter((project) => project.status === 'completed').length,
    pending: projectList.filter((project) => project.status === 'pending').length,
  };
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

export default function Dashboard({ selectedProject, onSelectProject }) {
  const { total, completed, pending } = getProjectStats(projects);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#ecebe6', p: 0 }}>
      <Box sx={{ width: '100%', p: 3, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#1d4a3d]">Dashboard</h1>
          <Link
            to="/projects"
            className="rounded-lg px-3 py-2 text-sm font-bold text-[#16633d] transition-colors hover:bg-[#dfead8] hover:text-[#0f4b2f] focus:outline-none focus:ring-2 focus:ring-[#1a8a64] focus:ring-offset-2"
          >
            View All
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[26px] border border-[#e9ece7] border-t-4 border-t-[#1a8a64] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
            <p className="text-sm font-bold uppercase tracking-wide text-[#6a8a7c]">Total Projects</p>
            <p className="mt-3 text-4xl font-black leading-none text-[#1d4a3d]">{total}</p>
          </div>
          <div className="rounded-[26px] border border-[#e9ece7] border-t-4 border-t-[#14b47e] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
            <p className="text-sm font-bold uppercase tracking-wide text-[#6a8a7c]">Completed Projects</p>
            <p className="mt-3 text-4xl font-black leading-none text-[#1f8e67]">{completed}</p>
          </div>
          <div className="rounded-[26px] border border-[#e9ece7] border-t-4 border-t-[#e7a84d] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
            <p className="text-sm font-bold uppercase tracking-wide text-[#6a8a7c]">Pending Projects</p>
            <p className="mt-3 text-4xl font-black leading-none text-[#b47a1f]">{pending}</p>
          </div>
        </div>

        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          onSelect={onSelectProject}
        />

        {/* UPPER 3 CARDS - INCREASED SIZE */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ width: '100%', alignItems: 'stretch' }}>
          
          <Box sx={{ flex: 1, minHeight: 280, bgcolor: 'white', borderRadius: '26px', p: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 22, color: '#11261c', lineHeight: 1.25 }}>Polavaram Irrigation Canal Network</Typography>
              <Typography sx={{ fontSize: 15.5, color: '#1a8a64', fontWeight: 700, mt: 0.8 }}>Andhra Pradesh • ₹6,750 Cr</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: 16.5, fontWeight: 800, color: '#1a3a2e', mb: 1.4 }}>Sec. 77 Compensation</Typography>
              <ProgressBar value={49} gradient="linear-gradient(90deg, #129b71, #88d9a8)" />
              <Typography sx={{ fontSize: 14, color: '#c43a3a', fontWeight: 800, mt: 1.5 }}>⚠ +634 overdue</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, minHeight: 280, bgcolor: 'white', borderRadius: '26px', p: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 22, color: '#11261c', lineHeight: 1.25 }}>Pune-Mumbai Hyperloop Corridor</Typography>
              <Typography sx={{ fontSize: 15.5, color: '#1a5a8a', fontWeight: 700, mt: 0.8 }}>Maharashtra • ₹12,400 Cr</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: 16.5, fontWeight: 800, color: '#1a3a2e', mb: 1.4 }}>SIA</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ flex: 1 }}><ProgressBar value={23} gradient="linear-gradient(90deg, #2d9bdf, #6ec6f0)" /></Box>
                <Box sx={{ bgcolor: '#ffedd5', color: '#9a4d00', fontSize: 13, fontWeight: 800, px: 1.8, py: 0.6, borderRadius: 99, border: '1px solid #fed7aa' }}>🔥 Medium</Box>
              </Box>
              <Typography sx={{ fontSize: 14, color: '#b47a1f', fontWeight: 800, mt: 1.5 }}>● +56 overdue</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, minHeight: 280, bgcolor: 'white', borderRadius: '26px', p: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.07)', border: '1px solid #e9ece7' }}>
            <Typography sx={{ fontWeight: 900, fontSize: 21, color: '#11261c', mb: 3.5 }}>Acquisition Status</Typography>
            {[
              { l: 'Acquired', v: 58.4, c: '#14b47e' },
              { l: 'Under Acquisition', v: 21.2, c: '#3a9bd4' },
              { l: 'Proposed', v: 13.8, c: '#6aa8d8' },
              { l: 'Poss. Pending', v: 6.6, c: '#e7a84d' },
            ].map((i) => (
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
        </Stack>

        {/* SPACING BEFORE STATE-WISE - 32px gap */}
        <Box sx={{ height: 36 }} />

        {/* BOTTOM SNAPSHOT */}
        <Box sx={{ width: '100%', bgcolor: '#eef6e6', borderRadius: '26px', p: 4, border: '1px solid #dfead8', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <Typography sx={{ fontWeight: 900, fontSize: 23, color: '#11261c', mb: 4 }}>State-wise Acquisition Snapshot</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 3, width: '100%' }}>
            {[
              { v: 64, n: 'Maharashtra', p: '23 projects', c1: '#7ed1a3', c2: '#11946b' },
              { v: 31, n: 'Rajasthan', p: '18 projects', c1: '#f0c48c', c2: '#b87a2d' },
              { v: 72, n: 'Madhya Pradesh', p: '18 projects', c1: '#a3c9dc', c2: '#4a7ca0' },
              { v: 89, n: 'Karnataka', p: '', c1: '#7ed1a3', c2: '#11946b' },
              { v: 49, n: 'Andhra Pradesh', p: '', c1: '#7ab8e8', c2: '#2e5fc2' },
              { v: 38, n: 'Uttar Pradesh', p: '', c1: '#f0c48c', c2: '#b87a2d' },
            ].map((s) => (
              <Box key={s.n} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Donut3D value={s.v} c1={s.c1} c2={s.c2} />
                <Typography sx={{ mt: 2, fontWeight: 800, fontSize: 15, color: '#11261c' }}>{s.n}</Typography>
                <Typography sx={{ fontSize: 13, color: '#6a8a7c', fontWeight: 600, mt: 0.2 }}>{s.p}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}