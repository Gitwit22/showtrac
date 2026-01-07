import { useEffect, useMemo, useState } from "react";
import type { AppState, Project, TemplateId } from "../domain/types";
import { templates } from "../domain/templates/templateRegistry";
import { loadSnapshot, saveSnapshot } from "../services/persist";
import { uid } from "../utils/ids";
import { nowISO, todayISO } from "../utils/dates";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import ProjectDetailPage from "./ProjectDetailPage";
import { colors, spacing, layout, card, header, text, misc } from "../styles";

export default function ProjectListPage() {
  // Initialize synchronously from snapshot to avoid empty overwrites
  const [state, setState] = useState<AppState>(() => loadSnapshot() ?? { projects: [] });
  const [hydrated, setHydrated] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // create form
  const [name, setName] = useState<string>("New Project");
  const [dateISO, setDateISO] = useState<string>(todayISO());
  const [templateId, setTemplateId] = useState<TemplateId>("videoShoots");
  const [location, setLocation] = useState<string>("");

  // Mark hydration complete after first mount
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Persist with debounce once hydrated
  useEffect(() => {
    if (!hydrated) return;
    const handle = setTimeout(() => {
      saveSnapshot(state);
    }, 300);
    return () => clearTimeout(handle);
  }, [hydrated, state]);

  // Final flush on pagehide
  useEffect(() => {
    if (!hydrated) return;
    const onPageHide = () => {
      try { saveSnapshot(state); } catch {}
    };
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [hydrated, state]);

  const activeProject = useMemo(
    () => state.projects.find(p => p.id === activeProjectId) ?? null,
    [state.projects, activeProjectId]
  );

  function createProject() {
    const now = nowISO();
    const project: Project = {
      id: uid("proj"),
      templateId,
      name: name.trim() || "Untitled",
      dateISO,
      location: location.trim() || undefined,
      split: {
        yourName: "You",
        yourPercent: 50,
        ownerName: "Owner",
        ownerPercent: 50,
      },
      counterparties: [
        { id: "venue", name: "Venue" },
      ],
      lineItems: [],
      createdAtISO: now,
      updatedAtISO: now,
    };

    setState(prev => ({ projects: [project, ...prev.projects] }));
    setActiveProjectId(project.id);
  }

  function deleteProject(id: string) {
    setState(prev => ({ projects: prev.projects.filter(p => p.id !== id) }));
    if (activeProjectId === id) setActiveProjectId(null);
  }

  if (activeProject) {
    return (
      <ProjectDetailPage
        project={activeProject}
        onBack={() => setActiveProjectId(null)}
        onUpdate={(updated) => {
          setState((prev) => ({
            projects: prev.projects.map((p) => (p.id === updated.id ? updated : p)),
          }));
        }}
      />
    );
  }

  return (
    <div style={layout.page}>
      {/* Grid texture background */}
      <div style={layout.gridTexture} />

      <div style={layout.container}>
        {/* Header */}
        <header style={{ marginBottom: spacing.xxl }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.xs }}>
            <div style={header.accentBar} />
            <h1 style={header.title}>ShowTrac</h1>
          </div>
          <p style={header.subtitle}>
            Track payments for video shoots, performances, and sessions
          </p>
        </header>

        {/* Create Project Card */}
        <div style={{ ...card.base, marginBottom: spacing.xl }}>
          <div style={text.sectionLabel}>+ New Project</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
            />
            <Input
              value={dateISO}
              onChange={(e) => setDateISO(e.target.value)}
              type="date"
            />
            <Select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value as TemplateId)}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (optional)"
            />
          </div>

          <Button onClick={createProject}>Create & Open</Button>
        </div>

        {/* Projects List */}
        <div style={{ marginBottom: spacing.lg }}>
          <div style={text.sectionLabelMuted}>Your Projects</div>

          {state.projects.length === 0 ? (
            <div style={text.muted}>No projects yet. Create one above.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
              {state.projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onOpen={() => setActiveProjectId(p.id)}
                  onDelete={() => deleteProject(p.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={misc.footerNote}>
          Data stored locally in your browser • Export to MD or CSV anytime
        </div>
      </div>
    </div>
  );
}

// ============================================
// PROJECT CARD SUB-COMPONENT
// ============================================

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
  onDelete: () => void;
};

function ProjectCard({ project, onOpen, onDelete }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const unpaidCount = project.lineItems.filter((li) => li.status !== "paid").length;

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...card.accent,
        ...(hovered ? card.accentHover : {}),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: spacing.lg,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              color: colors.textMuted,
              fontSize: 13,
              display: "flex",
              gap: spacing.md,
            }}
          >
            <span>{project.dateISO}</span>
            <span style={misc.dot}>•</span>
            <span>{project.templateId}</span>
            {project.location && (
              <>
                <span style={misc.dot}>•</span>
                <span>{project.location}</span>
              </>
            )}
            <span style={misc.dot}>•</span>
            <span>{project.lineItems.length} items</span>
            {unpaidCount > 0 && (
              <>
                <span style={misc.dot}>•</span>
                <span style={text.yellow}>{unpaidCount} unpaid</span>
              </>
            )}
          </div>
        </div>

        <div
          style={{ display: "flex", gap: spacing.sm }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" small onClick={onOpen}>
            Open
          </Button>
          <Button variant="danger" small onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
