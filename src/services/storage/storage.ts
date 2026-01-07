import type { AppState } from "../../domain/types";

const KEY = "showtrac:v1";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { projects: [] };
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed?.projects) return { projects: [] };
    return parsed;
  } catch {
    return { projects: [] };
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
