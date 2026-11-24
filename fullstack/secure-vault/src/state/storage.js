// Saves the recent files in the browser (localStorage), so they survive a page reload.
// try/catch: storage can be blocked (private mode, strict settings). The app still works without it.
const KEY = 'securevault:recent';

export const MAX_RECENT = 5;

export function loadRecent(index) {
  try {
    const ids = JSON.parse(localStorage.getItem(KEY)) ?? [];
    // Drop ids of files that no longer exist
    return ids.filter((id) => index.has(id)).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function saveRecent(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // ignore: recent files just won't be remembered
  }
}
