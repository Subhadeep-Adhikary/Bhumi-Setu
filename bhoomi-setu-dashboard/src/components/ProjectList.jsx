const getProjectKey = (project) => project.id || project.name;

export default function ProjectList({ projects = [], selectedProject, onSelect }) {
  const isSelected = (project) => (
    selectedProject === project
    || (selectedProject?.id && selectedProject.id === project.id)
  );

  return (
    <div className="w-full rounded-[26px] border border-[#dfead8] bg-[#eef6e6] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <h2 className="px-3 pb-3 text-lg font-black text-[#1d4a3d]">Projects</h2>
      <div className="space-y-2" role="list">
        {projects.map((project) => {
          const selected = isSelected(project);

          return (
            <button
              key={getProjectKey(project)}
              type="button"
              onClick={() => onSelect(project)}
              aria-pressed={selected}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a8a64] focus:ring-offset-2 focus:ring-offset-[#eef6e6] ${selected
                ? 'border-[#16633d] bg-[#16633d] text-white shadow-sm'
                : 'border-transparent bg-white text-[#1d4a3d] hover:border-[#c5dfb8] hover:bg-[#f9fcf8]'
              }`}
            >
              <span className="font-bold">{project.name}</span>
              {project.status && (
                <span className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${selected
                  ? 'bg-white/15 text-white'
                  : project.status === 'completed'
                    ? 'bg-[#d8eee7] text-[#1f8e67]'
                    : 'bg-[#ffedd5] text-[#9a4d00]'
                }`}>
                  {project.status}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
