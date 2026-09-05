import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const getProjectKey = (project) => project.id || project.name;
const getProjectProgress = (project) => project.progress ?? (project.status === 'completed' ? 100 : 23);
const getProjectButtonId = (project) => `project-${String(getProjectKey(project)).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

export default function ProjectList({ projects = [], selectedProject, onSelect }) {
  const navigate = useNavigate();

  const isSelected = (project) => (
    selectedProject === project
    || (selectedProject?.id && selectedProject.id === project.id)
  );

  return (
    <Box sx={{ width: '100%', borderRadius: '26px', border: '1px solid #dfead8', bgcolor: '#eef6e6', p: 2.5, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, px: 1 }}>
        <Box>
          <h2 className="text-2xl font-black tracking-tight text-[#1d4a3d]">Projects</h2>
          <p className="mt-1 text-sm font-medium text-[#6a8a7c]">Track acquisition progress across active projects</p>
        </Box>
        <Box sx={{ borderRadius: 999, bgcolor: '#ffffff', px: 1.5, py: 0.5, color: '#1f8e67', fontSize: 12, fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          {projects.length} total
        </Box>
      </Box>
      <Box sx={{ borderRadius: '22px', border: '1px solid #dfead8', bgcolor: '#f8fcf5', p: 2, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 20px rgba(22,99,61,0.06)' }}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr' }} role="list">
          {projects.map((project) => {
            const selected = isSelected(project);
            const progress = Math.min(100, Math.max(0, getProjectProgress(project)));
            const buttonId = getProjectButtonId(project);

            return (
              <Box key={getProjectKey(project)} sx={{ width: '80%', mx: 'auto', minWidth: 0 }}>
              <input type="hidden" id={`${buttonId}-input`} name="selectedProject" value={buttonId} readOnly />
              <button
                id={buttonId}
                type="button"
                onClick={() => {
                  onSelect(project);
                  navigate('/statutory-workflow');
                }}
                aria-pressed={selected}
                className={`group flex min-h-[230px] w-full flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a8a64] focus:ring-offset-2 focus:ring-offset-[#f8fcf5] ${selected
                  ? 'border-[#16633d] bg-[#16633d] text-white shadow-[0_12px_26px_rgba(22,99,61,0.2)]'
                  : 'border-white bg-white text-[#1d4a3d] shadow-[0_8px_22px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#c5dfb8] hover:shadow-[0_14px_28px_rgba(22,99,61,0.14)]'
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-lg font-black leading-tight">{project.name}</span>
                  {project.status && (
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-extrabold capitalize ${selected
                      ? 'bg-white/15 text-white'
                      : project.status === 'completed'
                        ? 'bg-[#d8eee7] text-[#1f8e67]'
                        : 'bg-[#ffedd5] text-[#9a4d00]'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </span>
                <span className="mt-8 block">
                  <span className={`mb-2 flex items-center justify-between text-xs font-bold ${selected ? 'text-white/75' : 'text-[#6a8a7c]'}`}>
                    <span>Acquisition progress</span>
                    <span className={selected ? 'text-white' : 'text-[#1f8e67]'}>{progress}%</span>
                  </span>
                  <span className={`block h-2.5 overflow-hidden rounded-full ${selected ? 'bg-white/20' : 'bg-[#e8efe6]'}`}>
                    <span
                      className={`block h-full rounded-full transition-all ${selected ? 'bg-[#9ee5b9]' : 'bg-gradient-to-r from-[#129b71] to-[#88d9a8]'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </span>
                </span>
              </button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
