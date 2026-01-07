import { useEffect, useMemo, useState } from "react";
import type { AppState, Project, TemplateId } from "../domain/types";
import { templates } from "../domain/templates/templateRegistry";
import { loadState, saveState } from "../services/storage/storage";
import { uid } from "../utils/ids";
import { nowISO, todayISO } from "../utils/dates";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import ProjectDetailPage from "./ProjectDetailPage";

export default function ProjectListPage() {
  const [state, setState] = useState<AppState>({ projects: [] });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // create form
  const [name, setName] = useState<string>("New Project");
  const [dateISO, setDateISO] = useState<string>(todayISO());
  const [templateId, setTemplateId] = useState<TemplateId>("videoShoots");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

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
          setState(prev => ({
            projects: prev.projects.map(p => (p.id === updated.id ? updated : p)),
          }));
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 18, background: "#0b0b0b", color: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>ShowTrac</div>
            <div style={{ opacity: 0.8 }}>Projects you can use for video shoots, performance fees, or whatever.</div>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Create Project</div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10 }}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
            <Input value={dateISO} onChange={(e) => setDateISO(e.target.value)} type="date" />
            <Select value={templateId} onChange={(e) => setTemplateId(e.target.value as TemplateId)}>
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </Select>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (optional)" />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button onClick={createProject}>Create & Open</Button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>Your Projects</div>

          {state.projects.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No projects yet. Create one above.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {state.projects.map(p => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 14,
                    padding: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>
                    <div style={{ opacity: 0.75, fontSize: 13 }}>
                      {p.templateId} • {p.dateISO}{p.location ? ` • ${p.location}` : ""} • {p.lineItems.length} line items
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="ghost" onClick={() => setActiveProjectId(p.id)}>Open</Button>
                    <Button variant="danger" onClick={() => deleteProject(p.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
          Data is stored locally in your browser (localStorage). Exports create files you can save/share.
        </div>
      </div>
    </div>
  );
}
