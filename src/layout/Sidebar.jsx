import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Users,
  Building2,
  Briefcase,
  MapPin,
  FileText,
  Building,
  HelpCircle,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { user } = useAuth();

  const [selected, setSelected] = useState("Guidelines");
  const [openMenu, setOpenMenu] = useState(null);
  const menuConfig = [
    {
      title: "ACCOUNTS",
      items: [{ name: "Users", icon: Users }],
    },
    {
      title: "AUXILIARY",
      items: [
        { name: "Departments", icon: Building2 },
        { name: "Designations", icon: Briefcase },
        { name: "Districts", icon: MapPin },
      ],
    },
    {
      title: "FORM CONTENT",
      items: [
        {
          name: "Guidelines",
          icon: FileText,
          children: [
            { name: "District Guidelines" },
            { name: "Department Guidelines" },
          ],
        },
        { name: "MPAs", icon: Building },
        {
          name: "Questions",
          icon: HelpCircle,
          children: [{ name: "Create" }, { name: "View" }],
        },
      ],
    },
    {
      title: "SCORE CARD",
      items: [
        { name: "Answers", icon: ClipboardList },
        { name: "Score Cards", icon: BarChart3 },
      ],
    },
  ];

  const districtMenuConfig = [
    {
      title: "FORM CONTENT",
      items: [
        {
          name: "Questions",
          icon: HelpCircle,
          children: [ { name: "View" }],
        },
      ],
    },
    {
      title: "SCORE CARD",
      items: [{ name: "Answers", icon: ClipboardList }],
    },
  ];

  const activeMenu =
  user.role === "ROLE_DISTRICT" ? districtMenuConfig : menuConfig;

  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          color: "#e2e8f0",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={24} color="white" />
          </Box>
          <Typography variant="h6" fontWeight={700} color="white">
            SCORE CARD
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, mt: 2 }}>
       
        {activeMenu.map((section) => (
          <Box key={section.title} mb={3}>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                fontWeight: 600,
                letterSpacing: "0.5px",
                px: 2,
                display: "block",
                mb: 1,
              }}
            >
              {section.title}
            </Typography>

            <List sx={{ p: 0 }}>
              <List sx={{ p: 0 }}>
                {section.items.map((item) => {
                  const Icon = item.icon;

                  if (item.children) {
                    return (
                      <Box key={item.name}>
                        <ListItemButton
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.name ? null : item.name,
                            )
                          }
                          sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            color: "#cbd5e1",
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.05)",
                              color: "white",
                            },
                          }}
                        >
                          <Icon size={20} style={{ marginRight: 12 }} />
                          <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItemButton>

                        {openMenu === item.name && (
                          <Box sx={{ ml: 4 }}>
                            {item.children.map((child) => {
                              const isChildSelected = selected === child.name;

                              return (
                                <ListItemButton
                                  key={child.name}
                                  onClick={() => {
                                    setSelected(child.name);

                                    if (child.name === "District Guidelines") {
                                      navigate("/admin/guidelines/district");
                                    }

                                    if (
                                      child.name === "Department Guidelines"
                                    ) {
                                      navigate("/admin/guidelines/department");
                                    }

                                    if (child.name === "Create") {
                                      navigate("/admin/questions/create");
                                    }

                                    if (child.name === "View" && user.role=="ROLE_ADMIN") {
                                      navigate("/admin/questions/view");
                                    }else if(child.name === "View" && user.role=="ROLE_DISTRICT"){
                                      navigate("/district/questions/view");
                                    }
                                  }}
                                  sx={{
                                    borderRadius: 2,
                                    mb: 0.5,
                                    bgcolor: isChildSelected
                                      ? "rgba(99, 102, 241, 0.15)"
                                      : "transparent",
                                    color: isChildSelected
                                      ? "#818cf8"
                                      : "#94a3b8",
                                    "&:hover": {
                                      bgcolor: "rgba(99, 102, 241, 0.2)",
                                      color: "#a5b4fc",
                                      transform: "translateX(4px)",
                                    },
                                  }}
                                >
                                  <ListItemText
                                    primary={child.name}
                                    primaryTypographyProps={{
                                      fontSize: "0.85rem",
                                      fontWeight: isChildSelected ? 600 : 500,
                                    }}
                                  />
                                </ListItemButton>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
                    );
                  }

                  // ===== NORMAL MENU ITEMS =====
                  const isSelected = selected === item.name;

                  return (
                    <ListItemButton
                      key={item.name}
                      onClick={() => {
                        setSelected(item.name);
                        if (item.name == "MPAs") {
                          navigate("/admin/mpas");
                        }
                      }}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        transition: "all 0.2s",
                        bgcolor: isSelected
                          ? "rgba(99, 102, 241, 0.15)"
                          : "transparent",
                        color: isSelected ? "#818cf8" : "#cbd5e1",
                        "&:hover": {
                          bgcolor: isSelected
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                          color: isSelected ? "#a5b4fc" : "white",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <Icon size={20} style={{ marginRight: 12 }} />
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: "0.9rem",
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </List>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};
