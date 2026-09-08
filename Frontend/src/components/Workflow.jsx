import { Box, Stack, Typography } from "@mui/material";
import { useProjectDetail } from "../hooks/projectdetail";

function Workflow({ projectId, projects }) {
  const project = useProjectDetail(projectId, projects);

  if (!project) {
    return (
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "#f4f8f3",
          border: "1px solid #dfead8",
        }}
      >
        <Typography sx={{ color: "#4d7866", fontWeight: 700 }}>
          No project selected
        </Typography>
      </Box>
    );
  }

  const documentsVerified =
    project.documents?.length > 0 &&
    project.documents.every(
      (document) => document.status === "Verified"
    );

  const hasPaidCompensation =
    (project.compensation?.payments || []).length > 0 &&
    project.compensation.payments.every(
      (payment) => payment.status === "Paid"
    );

  const stages = project.stages.map((stage, index) => {
    if (index === 1 && project.parcelId) {
      return {
        ...stage,
        status: "completed",
        activeLabel: undefined,
      };
    }

    if (index === 2 && documentsVerified) {
      return {
        ...stage,
        status: "completed",
        activeLabel: undefined,
      };
    }

    if (index === 3) {
      if (hasPaidCompensation) {
        return {
          ...stage,
          status: "completed",
          activeLabel: undefined,
        };
      }

      if (project.parcelId && documentsVerified) {
        return {
          ...stage,
          status: "pending",
          activeLabel: undefined,
        };
      }
    }

    return stage;
  });

  const activeStage =
    stages.find((stage) => stage.status === "active") ||
    stages[stages.length - 1];

  const completedCount = stages.filter(
    (stage) => stage.status === "completed"
  ).length;

  const workflowProgress =
    stages.length > 0
      ? Math.round((completedCount / stages.length) * 100)
      : 0;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        bgcolor: "#f1f6f0",
        borderRadius: { xs: 3, sm: 4 },
        p: { xs: 1.5, sm: 2.5, md: 3 },
        border: "1px solid #dce9d8",
        boxShadow: "0 18px 50px rgba(31, 74, 61, 0.08)",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: { xs: 2.5, md: 3 } }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 24, md: 27 },
              fontWeight: 900,
              color: "#163f34",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            RFCTLARR Statutory Milestones
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: { xs: 12, sm: 13 },
              color: "#6a887b",
              fontWeight: 600,
            }}
          >
            Track statutory compliance and land acquisition progress
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          {/* Overall progress */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              bgcolor: "#ffffff",
              border: "1px solid #dce9d8",
              borderRadius: 999,
              px: 1.5,
              py: 0.8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#2da874",
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                color: "#2b6653",
              }}
            >
              {workflowProgress}% complete
            </Typography>
          </Box>

          {/* Risk */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              bgcolor: "#fff8e9",
              color: "#986000",
              border: "1px solid #f1dfb9",
              borderRadius: 999,
              px: 1.5,
              py: 0.8,
              fontSize: 12,
              fontWeight: 800,
              textTransform: "capitalize",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#e3a229",
              }}
            />

            {project.risk || "Low risk"}
          </Box>
        </Stack>
      </Stack>

      {/* =====================================================
          MOBILE PROGRESS
      ====================================================== */}
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          mb: 2.5,
          p: 1.5,
          borderRadius: 3,
          bgcolor: "#ffffff",
          border: "1px solid #dfead8",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 0.8 }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              color: "#628073",
              textTransform: "uppercase",
              letterSpacing: 0.7,
            }}
          >
            Workflow progress
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 900,
              color: "#1b7b59",
            }}
          >
            {workflowProgress}%
          </Typography>
        </Stack>

        <Box
          sx={{
            height: 6,
            bgcolor: "#e6eee7",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${workflowProgress}%`,
              height: "100%",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #15805a, #59c990)",
              transition: "width 0.5s ease",
            }}
          />
        </Box>
      </Box>

      {/* =====================================================
          TIMELINE
      ====================================================== */}
      <Box
        sx={{
          bgcolor: "#f9fcf8",
          border: "1px solid #dfead8",
          borderRadius: { xs: 3, md: 4 },
          p: { xs: 1.5, sm: 2.5, md: 3 },
          mb: 2.5,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            mb: 2.5,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#608074",
          }}
        >
          Statutory workflow
        </Typography>

        {/* 
          On mobile/tablet the timeline can scroll horizontally.
          This prevents the milestone cards from becoming too narrow.
        */}
        <Box
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            pb: { xs: 1, md: 0 },
            mx: { xs: -0.5, md: 0 },

            "&::-webkit-scrollbar": {
              height: 5,
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#c8dbce",
              borderRadius: 999,
            },
          }}
        >
          <Box
            sx={{
              minWidth: { xs: 720, sm: 760, md: "100%" },
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {stages.map((stage, index) => {
              const isActive = stage.status === "active";
              const isCompleted = stage.status === "completed";
              const isLast = index === stages.length - 1;

              return (
                <Box
                  key={stage.title}
                  sx={{
                    flex: 1,
                    minWidth: 130,
                    position: "relative",
                    textAlign: "center",
                    px: 0.5,
                  }}
                >
                  {/* Connector */}
                  {!isLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 27,
                        left: "calc(50% + 28px)",
                        right: "calc(-50% + 28px)",
                        height: 3,
                        borderRadius: 999,
                        bgcolor: isCompleted
                          ? "#3aaa78"
                          : "#d5e2d8",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Stage circle */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      width: { xs: 48, sm: 54 },
                      height: { xs: 48, sm: 54 },
                      mx: "auto",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      bgcolor: "#ffffff",

                      color: isCompleted
                        ? "#16835c"
                        : isActive
                        ? "#167152"
                        : "#779187",

                      border: isActive
                        ? "3px solid #16835c"
                        : isCompleted
                        ? "3px solid #16835c"
                        : "2px solid #c9dbcf",

                      fontSize: isCompleted ? 19 : 14,
                      fontWeight: 900,

                      boxShadow: isActive
                        ? "0 0 0 6px rgba(22,131,92,0.10), 0 8px 20px rgba(22,131,92,0.18)"
                        : isCompleted
                        ? "0 0 0 6px rgba(22,131,92,0.10), 0 8px 20px rgba(22,131,92,0.18)"
                        : "none",

                      transition: "all 0.25s ease",
                    }}
                  >
                    {stage.short || index + 1}
                  </Box>

                  {/* Stage title */}
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: { xs: 11, sm: 12.5 },
                      fontWeight: isActive ? 900 : 750,
                      color: isActive
                        ? "#146e51"
                        : isCompleted
                        ? "#2d6654"
                        : "#668176",
                      lineHeight: 1.35,
                      minHeight: 34,
                    }}
                  >
                    {stage.title}
                  </Typography>

                  {/* Date */}
                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 11,
                      color: "#91a49a",
                      fontWeight: 600,
                    }}
                  >
                    {stage.date}
                  </Typography>

                  {/* Active badge */}
                  {isActive && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.6,
                        mt: 1,
                        px: 1.1,
                        py: 0.45,
                        borderRadius: 999,
                        bgcolor: "#e0f3e8",
                        color: "#167152",
                        fontSize: 10,
                        fontWeight: 900,
                      }}
                    >
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          bgcolor: "#27a873",
                        }}
                      />

                      In Progress
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          INFORMATION CARDS
      ====================================================== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(0, 1fr)",
          },
          gap: 2,
        }}
      >
        {/* ACTIVE STAGE */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: "#ffffff",
            borderRadius: 3.5,
            p: { xs: 2.2, sm: 2.8 },
            border: "1px solid #dbe9dd",
            boxShadow: "0 8px 24px rgba(22,99,61,0.055)",

            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background:
                "linear-gradient(to bottom, #15805a, #65cb96)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#318063",
              fontWeight: 900,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Current milestone
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: 22, sm: 26 },
                  fontWeight: 900,
                  color: "#173f33",
                  lineHeight: 1.15,
                }}
              >
                {activeStage.title}
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: 14,
                  color: "#6c887d",
                  fontWeight: 600,
                }}
              >
                {activeStage.date}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.7,
                bgcolor:
                  activeStage.status === "active"
                    ? "#e1f4e9"
                    : "#eef3ef",
                color:
                  activeStage.status === "active"
                    ? "#167152"
                    : "#60786d",
                borderRadius: 999,
                px: 1.4,
                py: 0.7,
                fontSize: 11,
                fontWeight: 900,
                whiteSpace: "nowrap",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "currentColor",
                }}
              />

              {activeStage.activeLabel ||
                (activeStage.status === "completed"
                  ? "Completed"
                  : "Pending")}
            </Box>
          </Stack>

          {/* Mini progress */}
          <Box sx={{ mt: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.8 }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#80968c",
                }}
              >
                Overall workflow
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#247d5d",
                }}
              >
                {workflowProgress}%
              </Typography>
            </Stack>

            <Box
              sx={{
                height: 7,
                borderRadius: 999,
                bgcolor: "#e7efe9",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${workflowProgress}%`,
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, #14825b, #63cd97)",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* DELAY / AI INSIGHTS */}
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 3.5,
            p: { xs: 2.2, sm: 2.8 },
            border: "1px solid #dbe9dd",
            boxShadow: "0 8px 24px rgba(22,99,61,0.055)",
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            spacing={1.2}
            sx={{ mb: 2.2 }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                bgcolor: "#e5f3e9",
                color: "#197253",
                fontSize: 17,
                fontWeight: 900,
              }}
            >
              AI
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: "#1b473d",
                }}
              >
                Why is this project delayed?
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 12,
                  color: "#789188",
                  fontWeight: 600,
                }}
              >
                AI-identified bottlenecks & recommended actions
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1.2}>
            {/* Issue 1 */}
            <Box
              sx={{
                display: "flex",
                gap: 1.2,
                p: 1.3,
                borderRadius: 2.5,
                bgcolor: "#f7faf7",
                border: "1px solid #edf2ed",
              }}
            >
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  bgcolor: "#2aa370",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                1
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#244c40",
                    lineHeight: 1.45,
                    fontWeight: 700,
                  }}
                >
                  3 unresolved objections pending hearing (Sec. 15)
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,
                    fontSize: 11.5,
                    color: "#5f8174",
                    fontWeight: 600,
                  }}
                >
                  Recommended action: Schedule hearing by 10 Sep
                </Typography>
              </Box>
            </Box>

            {/* Issue 2 */}
            <Box
              sx={{
                display: "flex",
                gap: 1.2,
                p: 1.3,
                borderRadius: 2.5,
                bgcolor: "#f7faf7",
                border: "1px solid #edf2ed",
              }}
            >
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  bgcolor: "#2aa370",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                2
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#244c40",
                    lineHeight: 1.45,
                    fontWeight: 700,
                  }}
                >
                  Compensation fund release awaiting PFMS approval
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,
                    fontSize: 11.5,
                    color: "#5f8174",
                    fontWeight: 600,
                  }}
                >
                  Recommended action: Escalate to DM office
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Workflow;
