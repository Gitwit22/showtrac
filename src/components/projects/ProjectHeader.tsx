import type { Project } from "../../domain/types";
import { getTemplate } from "../../domain/templates/templateRegistry";

export default function ProjectHeader({ project }: { project: Project }) {
  const t = getTemplate(project.templateId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Project / Event name */}
      <div style={{ fontSize: 20, fontWeight: 800 }}>
        {project.name}
      </div>

      {/* Meta line */}
      <div style={{ opacity: 0.8, fontSize: 13 }}>
        {t.name}
        {project.dateISO ? ` • ${project.dateISO}` : ""}
        {project.location ? ` • ${project.location}` : ""}
        {project.venueName ? ` • ${project.venueName}` : ""}
      </div>
    </div>
  );
}
