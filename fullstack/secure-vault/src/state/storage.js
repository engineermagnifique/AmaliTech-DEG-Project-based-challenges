// Persists recent files in localStorage.
// Storage can be blocked (e.g. private mode), so errors are ignored.
const KEY = 'securevault:recent';

export const MAX_RECENT = 5;

export function loadRecent(index) {
  try {
    const ids = JSON.parse(localStorage.getItem(KEY)) ?? [];
    // Skip files that no longer exist
    return ids.filter((id) => index.has(id)).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function saveRecent(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable: continue without saving
  }
}
