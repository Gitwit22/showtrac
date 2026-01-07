import type { AppState } from "../domain/types";

export type Snapshot = AppState;

export const STORAGE_KEY_CURRENT = "showtrac:current:v1";
export const STORAGE_KEY_BACKUP = "showtrac:backup:v1";

export function validateSnapshot(x: unknown): x is Snapshot {
  if (!x || typeof x !== "object") return false;
  const obj = x as Partial<AppState>;
  if (!Array.isArray(obj.projects)) return false;
  // Optionally check a few fields on project items
  // Keep lightweight to avoid strict migrations blocking loads
  return true;
}

export function loadSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (validateSnapshot(parsed)) return parsed as Snapshot;
    }
  } catch {
    // ignore
  }
  // Fallback to backup
  try {
    const rawBackup = localStorage.getItem(STORAGE_KEY_BACKUP);
    if (rawBackup) {
      const parsedBackup = JSON.parse(rawBackup);
      if (validateSnapshot(parsedBackup)) return parsedBackup as Snapshot;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveSnapshot(snapshot: Snapshot): void {
  try {
    const json = JSON.stringify(snapshot);
    localStorage.setItem(STORAGE_KEY_CURRENT, json);
    // Also write a backup copy
    localStorage.setItem(STORAGE_KEY_BACKUP, json);
  } catch {
    // Swallow errors to avoid breaking the UI
  }
}
