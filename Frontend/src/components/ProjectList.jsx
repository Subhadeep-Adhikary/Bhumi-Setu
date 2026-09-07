import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProjectProgress } from "../hooks/projectdetail";

const getProjectKey = (project) => project.id || project.name;

const getProjectButtonId = (project) =>
  `project-${String(getProjectKey(project))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

export default function ProjectList({
  projects = [],
  selectedProject,
  onSelect,
}) {
  const navigate = useNavigate();

  const isSelected = (project) =>
    selectedProject === project ||
    (selectedProject?.id && selectedProject.id === project.id);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "28px",
        border: "1px solid #dbe9d5",
        bgcolor: "#eef6e8",
        p: { xs: 2, md: 2.5 },
        boxShadow: "0 14px 40px rgba(31, 74, 61, 0.08)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
          px: 1,
        }}
      >
        <Box>
          <h2 className="text-2xl font-black tracking-tight text-[#1d4a3d]">
            Projects
          </h2>

          <p className="mt-1 text-sm font-medium text-[#6a8a7c]">
            Track acquisition progress across active projects
          </p>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            borderRadius: 999,
            bgcolor: "#ffffff",
            px: 1.5,
            py: 0.7,
            color: "#1f8e67",
            fontSize: 12,
            fontWeight: 800,
            boxShadow: "0 4px 12px rgba(31, 142, 103, 0.08)",
          }}
        >
          <span className="h-2 w-2 rounded-full bg-[#36b982]" />
          {projects.length} total
        </Box>
      </Box>

      {/* PROJECT CONTAINER */}
      <Box
        sx={{
          borderRadius: "24px",
          border: "1px solid #dcebd6",
          bgcolor: "#f8fcf5",
          p: { xs: 1.5, md: 2 },
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(22,99,61,0.05)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr",
          }}
          role="list"
        >
          {/* EMPTY STATE */}
          {!projects.length && (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
                color: "#6a8a7c",
                fontWeight: 700,
              }}
            >
              No projects added yet
            </Box>
          )}

          {projects.map((project) => {
            const selected = isSelected(project);
            const progress = Math.min(
              100,
              Math.max(0, getProjectProgress(project))
            );

            const buttonId = getProjectButtonId(project);

            return (
              <Box
                key={getProjectKey(project)}
                sx={{
                  width: "80%",
                  mx: "auto",
                  minWidth: 0,
                }}
              >
                <input
                  type="hidden"
                  id={`${buttonId}-input`}
                  name="selectedProject"
                  value={buttonId}
                  readOnly
                />

                <button
                  id={buttonId}
                  type="button"
                  onClick={() => {
                    onSelect(project);
                    navigate("/statutory-workflow");
                  }}
                  aria-pressed={selected}
                  className="group relative flex min-h-[230px] w-full flex-col justify-between overflow-hidden rounded-2xl p-5 text-left outline-none transition-all duration-300 focus:ring-2 focus:ring-[#1a8a64] focus:ring-offset-2"
                  style={{
                    border: selected
                      ? "1.5px solid #167a55"
                      : "1px solid #e4eee0",

                    background: selected
                      ? "linear-gradient(135deg, #ffffff 0%, #f2faf4 58%, #e5f6eb 100%)"
                      : "#ffffff",

                    color: "#1d4a3d",

                    boxShadow: selected
                      ? "0 16px 36px rgba(22, 99, 61, 0.16), 0 0 0 4px rgba(38, 157, 107, 0.08)"
                      : "0 8px 22px rgba(0,0,0,0.055)",

                    transform: selected
                      ? "translateY(-3px) scale(1.008)"
                      : undefined,
                  }}
                >
                  {/* SELECTED LEFT ACCENT */}
                  {selected && (
                    <span
                      className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl"
                      style={{
                        background:
                          "linear-gradient(to bottom, #0f7b55, #55c98d)",
                      }}
                    />
                  )}

                  {/* SUBTLE SELECTED GLOW */}
                  {selected && (
                    <span
                      className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-70 blur-2xl"
                      style={{
                        background: "rgba(74, 190, 130, 0.22)",
                      }}
                    />
                  )}

                  {/* TOP SECTION */}
                  <span className="relative z-10 flex items-start justify-between gap-3">
                    <span className="flex min-w-0 items-start gap-3">
                      {/* PROJECT ICON */}
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black transition-all duration-300 ${
                          selected
                            ? "bg-[#d9f2e2] text-[#13734e] shadow-[0_5px_14px_rgba(31,142,103,0.12)]"
                            : "bg-[#edf6e9] text-[#2c8c66]"
                        }`}
                      >
                        {selected ? "✓" : "⌂"}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block truncate text-lg font-black leading-tight ${
                            selected ? "text-[#135a40]" : "text-[#1d4a3d]"
                          }`}
                        >
                          {project.name}
                        </span>

                        <span
                          className={`mt-1 block text-xs font-semibold ${
                            selected
                              ? "text-[#5d8272]"
                              : "text-[#8aa096]"
                          }`}
                        >
                          Land acquisition project
                        </span>
                      </span>
                    </span>

                    {/* STATUS */}
                    {project.status && (
                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold capitalize transition-all ${
                          selected
                            ? "border border-[#b9e5ca] bg-[#e2f6e9] text-[#13734e]"
                            : project.status === "completed"
                            ? "bg-[#d8eee7] text-[#1f8e67]"
                            : "bg-[#fff0dc] text-[#9a4d00]"
                        }`}
                      >
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                        {project.status}
                      </span>
                    )}
                  </span>

                  {/* PROGRESS SECTION */}
                  <span className="relative z-10 mt-8 block">
                    <span
                      className={`mb-2.5 flex items-center justify-between text-xs font-bold ${
                        selected ? "text-[#658579]" : "text-[#6a8a7c]"
                      }`}
                    >
                      <span>Acquisition progress</span>

                      <span
                        className={`text-sm font-black ${
                          selected ? "text-[#13734e]" : "text-[#1f8e67]"
                        }`}
                      >
                        {progress}%
                      </span>
                    </span>

                    {/* PROGRESS BAR */}
                    <span
                      className={`block h-3 overflow-hidden rounded-full ${
                        selected ? "bg-[#dceee2]" : "bg-[#e8efe6]"
                      }`}
                    >
                      <span
                        className="block h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background: selected
                            ? "linear-gradient(90deg, #13734e, #50c98a)"
                            : "linear-gradient(90deg, #129b71, #88d9a8)",
                          boxShadow: selected
                            ? "0 2px 8px rgba(19,115,78,0.25)"
                            : "none",
                        }}
                      />
                    </span>

                    {/* PROGRESS FOOTER */}
                    <span className="mt-3 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold ${
                          selected
                            ? "text-[#789487]"
                            : "text-[#91a39a]"
                        }`}
                      >
                        Project completion
                      </span>

                      {selected && (
                        <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#13734e]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2fb878]" />
                          Selected
                        </span>
                      )}
                    </span>
                  </span>

                  {/* HOVER ARROW */}
                  <span
                    className={`absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                      selected
                        ? "bg-[#d9f2e2] text-[#13734e] opacity-100"
                        : "bg-[#edf6e9] text-[#2c8c66] opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                    }`}
                  >
                    →
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
