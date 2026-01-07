import type { TemplateConfig } from "./templateTypes";
import { videoShootsTemplate } from "./videoShoots.template";
import { performanceFeesTemplate } from "./performanceFees.template";

export const templates: TemplateConfig[] = [videoShootsTemplate, performanceFeesTemplate];

export function getTemplate(templateId: TemplateConfig["id"]): TemplateConfig {
  const t = templates.find(x => x.id === templateId);
  if (!t) throw new Error(`Unknown templateId: ${templateId}`);
  return t;
}
