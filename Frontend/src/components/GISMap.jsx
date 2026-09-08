import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import "leaflet/dist/leaflet.css";

/* ============================================================
   INDIA MAP SETTINGS
============================================================ */

const INDIA_CENTER = [22.5937, 78.9629];

const INDIA_BOUNDS = [
  [6.5, 68.0],
  [35.8, 97.5],
];

/* ============================================================
   CUSTOM MARKER
============================================================ */

const createMarkerIcon = (color = "#17643f") => {
  return L.divIcon({
    className: "custom-map-marker",

    html: `
      <div
        style="
          width: 34px;
          height: 34px;
          border-radius: 50% 50% 50% 0;
          background: ${color};
          border: 3px solid white;
          box-shadow: 0 5px 14px rgba(0,0,0,0.25);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
          "
        ></div>
      </div>
    `,

    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
};

const greenMarker = createMarkerIcon("#17643f");
const orangeMarker = createMarkerIcon("#d88932");
const redMarker = createMarkerIcon("#c94b4b");

/* ============================================================
   MAP CONTROLS
============================================================ */

function MapControls() {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const resetIndia = () => {
    map.flyTo(INDIA_CENTER, 5, {
      duration: 0.8,
    });
  };

  const fullscreen = () => {
    const mapElement = map.getContainer();

    if (!document.fullscreenElement) {
      mapElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1000,

        top: 18,
        right: 18,

        display: "flex",
        flexDirection: "column",

        bgcolor: "rgba(255,255,255,0.96)",

        borderRadius: "12px",

        border: "1px solid #dce7dc",

        boxShadow:
          "0 6px 20px rgba(31,74,61,0.12)",

        overflow: "hidden",
      }}
    >
      <Tooltip title="Zoom in" placement="left">
        <IconButton
          onClick={zoomIn}
          sx={{
            width: 42,
            height: 42,

            borderRadius: 0,

            color: "#245b45",

            "&:hover": {
              bgcolor: "#edf7ee",
            },
          }}
        >
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          height: "1px",
          bgcolor: "#e5ebe5",
        }}
      />

      <Tooltip title="Zoom out" placement="left">
        <IconButton
          onClick={zoomOut}
          sx={{
            width: 42,
            height: 42,

            borderRadius: 0,

            color: "#245b45",

            "&:hover": {
              bgcolor: "#edf7ee",
            },
          }}
        >
          <RemoveRoundedIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          height: "1px",
          bgcolor: "#e5ebe5",
        }}
      />

      <Tooltip title="Show India" placement="left">
        <IconButton
          onClick={resetIndia}
          sx={{
            width: 42,
            height: 42,

            borderRadius: 0,

            color: "#245b45",

            "&:hover": {
              bgcolor: "#edf7ee",
            },
          }}
        >
          <MyLocationRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          height: "1px",
          bgcolor: "#e5ebe5",
        }}
      />

      <Tooltip title="Fullscreen" placement="left">
        <IconButton
          onClick={fullscreen}
          sx={{
            width: 42,
            height: 42,

            borderRadius: 0,

            color: "#245b45",

            "&:hover": {
              bgcolor: "#edf7ee",
            },
          }}
        >
          <FullscreenRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

const StatCard = ({
  icon,
  value,
  label,
  color,
}) => {
  return (
    <Box
      sx={{
        position: "relative",

        overflow: "hidden",

        bgcolor: "#ffffff",

        borderRadius: 3,

        p: {
          xs: 1.8,
          sm: 2,
          md: 2.2,
        },

        display: "flex",

        alignItems: "center",

        gap: 1.5,

        border: "1px solid #e0eadc",

        boxShadow:
          "0 8px 24px rgba(31,74,61,0.06)",

        transition:
          "transform 180ms ease, box-shadow 180ms ease",

        "&:hover": {
          transform: "translateY(-2px)",

          boxShadow:
            "0 12px 28px rgba(31,74,61,0.10)",
        },

        "&::after": {
          content: '""',

          position: "absolute",

          right: -25,
          top: -25,

          width: 80,
          height: 80,

          borderRadius: "50%",

          bgcolor:
            "rgba(35,143,99,0.035)",
        },
      }}
    >
      <Box
        sx={{
          width: 45,
          height: 45,

          flexShrink: 0,

          display: "grid",

          placeItems: "center",

          borderRadius: 2.5,

          bgcolor: "#eef7ed",

          fontSize: 21,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: {
              xs: 20,
              sm: 22,
              md: 24,
            },

            fontWeight: 900,

            color:
              color || "#1a3a2e",

            lineHeight: 1.1,

            letterSpacing: "-0.5px",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 0.4,

            fontSize: {
              xs: 11,
              sm: 12,
            },

            fontWeight: 650,

            color: "#668276",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

/* ============================================================
   GIS MAP
============================================================ */

function GISMap({ projects: projectRecords = [], selectedProject = null }) {
  const [mapType, setMapType] = useState("street");
  const [locations, setLocations] = useState({});

  const projects = useMemo(() => projectRecords.map((project) => ({
    ...project,
    address: [project.district, project.state].filter(Boolean).join(", "),
    position: locations[project.id]?.position || INDIA_CENTER,
    status: project.status === "completed" ? "Acquired" : "Under Acquisition",
  })), [locations, projectRecords]);

  useEffect(() => {
    let cancelled = false;

    async function geocodeProjects() {
      const missingProjects = projectRecords.filter((project) => !locations[project.id]);
      const nextLocations = {};

      for (const project of missingProjects) {
        const address = [project.district, project.state, "India"]
          .filter(Boolean)
          .join(", ");
        if (!address) continue;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`,
            { headers: { Accept: "application/json" } },
          );
          const results = await response.json();
          const result = results[0];
          if (result) {
            nextLocations[project.id] = {
              position: [Number(result.lat), Number(result.lon)],
            };
          }
        } catch (error) {
          // Keep the project visible at the India fallback when geocoding is unavailable.
        }
      }

      if (!cancelled && Object.keys(nextLocations).length > 0) {
        setLocations((current) => ({ ...current, ...nextLocations }));
      }
    }

    geocodeProjects();
    return () => { cancelled = true; };
  }, [projectRecords, locations]);

  const visibleProjects = selectedProject
    ? projects.filter((project) => project.id === selectedProject.id)
    : projects;

  const totalArea = projectRecords.reduce(
    (total, project) => total + Number(project.compensation?.landArea || 0),
    0,
  );

  const tileUrl =
    mapType === "satellite"
      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <Box
        sx={{
          width: "100%",

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",

            lg:
              "minmax(0, 1.7fr) minmax(300px, 0.55fr)",
          },

          gap: {
            xs: 2,
            md: 2.5,
          },

          alignItems: "start",
        }}
      >
        {/* =====================================================
            LEFT — INDIA MAP
        ====================================================== */}

        <Box
          sx={{
            minWidth: 0,

            bgcolor: "#f6f9f2",

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
            },

            border:
              "1px solid #e1eadf",

            boxShadow:
              "0 14px 38px rgba(31,74,61,0.075)",

            overflow: "hidden",
          }}
        >
          {/* MAP HEADER */}

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              md: "center",
            }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 23,
                    md: 26,
                  },

                  fontWeight: 900,

                  color: "#193c30",

                  letterSpacing:
                    "-0.025em",
                }}
              >
                India Acquisition Map
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,

                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },

                  color: "#789288",

                  fontWeight: 600,
                }}
              >
                Real-time land acquisition &
                corridor monitoring
              </Typography>
            </Box>

            {/* MAP MODE */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.8,

                alignSelf: {
                  xs: "flex-start",
                  md: "auto",
                },
              }}
            >
              <Box
                onClick={() =>
                  setMapType("street")
                }
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 0.6,

                  px: 1.2,
                  py: 0.8,

                  borderRadius: 2,

                  bgcolor:
                    mapType === "street"
                      ? "#e4f2e6"
                      : "#ffffff",

                  border:
                    "1px solid #dce8dc",

                  color: "#2b654c",

                  fontSize: 11,

                  fontWeight: 800,

                  cursor: "pointer",
                }}
              >
                <MapOutlinedIcon
                  sx={{ fontSize: 16 }}
                />

                Map
              </Box>

              <Box
                onClick={() =>
                  setMapType("satellite")
                }
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 0.6,

                  px: 1.2,
                  py: 0.8,

                  borderRadius: 2,

                  bgcolor:
                    mapType === "satellite"
                      ? "#e4f2e6"
                      : "#ffffff",

                  border:
                    "1px solid #dce8dc",

                  color: "#2b654c",

                  fontSize: 11,

                  fontWeight: 800,

                  cursor: "pointer",
                }}
              >
                <LayersOutlinedIcon
                  sx={{ fontSize: 16 }}
                />

                Satellite
              </Box>
            </Box>
          </Stack>

          {/* =================================================
              MAP
          ================================================== */}

          <Box
            sx={{
              position: "relative",

              width: "100%",

              height: {
                xs: 430,
                sm: 500,
                md: 560,
                lg: 600,
              },

              borderRadius: 3,

              overflow: "hidden",

              border:
                "1px solid #d5e2d4",

              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.5)",
            }}
          >
            <MapContainer
              center={INDIA_CENTER}
              zoom={5}
              minZoom={4}
              maxZoom={18}
              maxBounds={INDIA_BOUNDS}
              maxBoundsViscosity={0.7}
              scrollWheelZoom={true}
              doubleClickZoom={true}
              dragging={true}
              zoomControl={false}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url={tileUrl}
              />

              {/* Corridor buffer */}

              <Circle
                center={[22.95, 79.19]}
                radius={50000}
                pathOptions={{
                  color: "#4c9a6c",
                  weight: 2,
                  opacity: 0.5,
                  fillColor: "#77bd91",
                  fillOpacity: 0.08,
                  dashArray: "8 8",
                }}
              />

              {/* =================================================
                  PROJECT MARKERS
              ================================================== */}

              {visibleProjects.map((project) => (
                <Marker
                  key={project.id}
                  position={project.position}
                  icon={
                    project.status ===
                    "Acquired"
                      ? greenMarker
                      : project.status ===
                        "Proposed"
                      ? orangeMarker
                      : redMarker
                  }
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -18]}
                    opacity={1}
                    permanent={false}
                  >
                    <Box
                      sx={{
                        minWidth: 190,
                        p: 0.25,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: 13,
                          color: "#193c30",
                          lineHeight: 1.3,
                        }}
                      >
                        {project.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 11.5,
                          color: "#4d665d",
                          lineHeight: 1.4,
                        }}
                      >
                        Parcel No: {project.parcelId || "Not available"}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.2,
                          fontSize: 11,
                          color: "#71867c",
                          lineHeight: 1.4,
                        }}
                      >
                        {project.district || "District unavailable"}, {project.state || "State unavailable"}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.2,
                          fontSize: 10.5,
                          color: "#71867c",
                          lineHeight: 1.4,
                        }}
                      >
                        {project.description || project.address || "Address unavailable"}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Popup>
                    <Box
                      sx={{
                        minWidth: 190,
                        p: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: 15,
                          color: "#193c30",
                        }}
                      >
                        {project.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 12,
                          color: "#71867c",
                        }}
                      >
                        {project.address || "Address unavailable"}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 11,
                          color: "#71867c",
                        }}
                      >
                        Parcel No: {project.parcelId || "Not available"}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 11,
                          color: "#71867c",
                        }}
                      >
                        State: {project.state || "N/A"} • District: {project.district || "N/A"}
                      </Typography>

                      <Box
                        sx={{
                          display: "inline-block",

                          mt: 1,

                          px: 1,

                          py: 0.4,

                          borderRadius: 999,

                          bgcolor:
                            project.status ===
                            "Acquired"
                              ? "#e2f2e6"
                              : "#fff0d9",

                          color:
                            project.status ===
                            "Acquired"
                              ? "#1c7553"
                              : "#a86620",

                          fontSize: 10,

                          fontWeight: 800,
                        }}
                      >
                        {project.status}
                      </Box>
                    </Box>
                  </Popup>
                </Marker>
              ))}

              <MapControls />
            </MapContainer>
          </Box>

          {/* =================================================
              MAP INFO
          ================================================== */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              justifyContent:
                "space-between",

              flexWrap: "wrap",

              gap: 1,

              mt: 1.2,

              px: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 10.5,
                color: "#789288",
                fontWeight: 600,
              }}
            >
              {selectedProject
                ? "Showing the selected project's parcel"
                : "Showing all project parcels from your account"}
            </Typography>

            <Typography
              sx={{
                fontSize: 10.5,
                color: "#2c7657",
                fontWeight: 800,
              }}
            >
              ● Live GIS Data
            </Typography>
          </Box>

          {/* =================================================
              LEGEND
          ================================================== */}

          <Box
            sx={{
              mt: 2,

              bgcolor: "#ffffff",

              borderRadius: 3,

              p: {
                xs: 1.5,
                sm: 2,
              },

              border:
                "1px solid #dfe9dc",

              boxShadow:
                "0 8px 22px rgba(31,74,61,0.05)",
            }}
          >
            <Typography
              sx={{
                mb: 1.3,

                fontSize: 11,

                fontWeight: 900,

                color: "#547669",

                textTransform:
                  "uppercase",

                letterSpacing: 1,
              }}
            >
              Map Legend
            </Typography>

            <Box
              sx={{
                display: "flex",

                flexWrap: "wrap",

                gap: {
                  xs: 1.5,
                  sm: 2.5,
                },
              }}
            >
              {/* Acquired */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#17643f",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#385b4b",
                  }}
                >
                  Acquired
                </Typography>
              </Box>

              {/* Proposed */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#d88932",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#385b4b",
                  }}
                >
                  Proposed
                </Typography>
              </Box>

              {/* Acquisition */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#c94b4b",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#385b4b",
                  }}
                >
                  Under Acquisition
                </Typography>
              </Box>

              {/* Buffer */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 10,

                    borderRadius: 999,

                    border:
                      "2px dashed #4c9a6c",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#385b4b",
                  }}
                >
                  500m Buffer
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            RIGHT — STATISTICS
        ====================================================== */}

        <Box
          sx={{
            minWidth: 0,

            display: "flex",

            flexDirection: "column",

            gap: 1.5,

            width: "100%",
          }}
        >
          <StatCard
            icon="🗺️"
            value={projectRecords.length}
            label="Total Parcels"
          />

          <StatCard
            icon="✅"
            value={projectRecords.filter((project) => project.status === "completed").length}
            label="Acquired"
            color="#0d7a4a"
          />

          <StatCard
            icon="📌"
            value={projectRecords.filter((project) => project.status !== "completed").length}
            label="Proposed"
            color="#2b7656"
          />

          <StatCard
            icon="📐"
            value={`${totalArea.toFixed(1)} ha`}
            label="Affected Area"
          />

          {/* =================================================
              CORRIDOR DETECTION
          ================================================== */}

          <Box
            sx={{
              mt: 0.5,

              bgcolor: "#e7f0d9",

              borderRadius: 3,

              p: {
                xs: 2,
                sm: 2.5,
              },

              border:
                "1px solid #d6e5c4",

              boxShadow:
                "0 8px 24px rgba(58,91,43,0.07)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.2}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,

                  display: "grid",
                  placeItems: "center",

                  borderRadius: 2,

                  bgcolor: "#ffffff",

                  fontSize: 18,

                  boxShadow:
                    "0 4px 10px rgba(31,74,61,0.06)",
                }}
              >
                📡
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: "#1b3e31",
                  }}
                >
                  Corridor Detection
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,
                    fontSize: 10.5,
                    color: "#6e897c",
                    fontWeight: 600,
                  }}
                >
                  Spatial analysis summary
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={1}>
              {[
                ["Buffer Radius", "500 m"],
                ["Intersecting", "380 parcels"],
                ["Corridor Length", "142 km"],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    px: 1.2,
                    py: 1.1,

                    borderRadius: 2,

                    bgcolor:
                      "rgba(255,255,255,0.48)",

                    border:
                      "1px solid rgba(255,255,255,0.65)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#587465",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#183b2e",
                      fontWeight: 900,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                mt: 2,

                display: "flex",

                alignItems: "center",

                gap: 0.8,

                color: "#237454",

                fontSize: 10.5,

                fontWeight: 800,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,

                  borderRadius: "50%",

                  bgcolor: "#2fa875",

                  boxShadow:
                    "0 0 0 4px rgba(47,168,117,0.12)",
                }}
              />

              Spatial analysis complete
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GISMap;