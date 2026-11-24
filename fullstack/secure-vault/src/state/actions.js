import { getAncestors } from '../utils/tree.js';
import { MAX_RECENT } from './storage.js';

/** All state changes go through these actions. */
export function createActions(store, index) {
  // Returns a new Set with all parent folders of `id` opened
  function openParents(expanded, id) {
    const next = new Set(expanded);
    getAncestors(index, id).forEach((folder) => next.add(folder.id));
    return next;
  }

  // Moves `id` to the front of the list, without duplicates
  function addToRecent(recent, id) {
    return [id, ...recent.filter((recentId) => recentId !== id)].slice(0, MAX_RECENT);
  }

  function setExpanded(id, open) {
    store.set(({ expanded }) => {
      const next = new Set(expanded); // copy, never mutate state
      if (open) next.add(id);
      else next.delete(id);
      return { expanded: next, focusedId: id, currentFolderId: id };
    });
  }

  return {
    toggleFolder(id) {
      setExpanded(id, !store.get().expanded.has(id));
    },

    expandFolder(id) {
      setExpanded(id, true);
    },

    collapseFolder(id) {
      setExpanded(id, false);
    },

    // Shows a folder and opens its path. null = top level.
    openFolder(id) {
      if (!id) {
        store.set({ currentFolderId: null });
        return;
      }
      store.set(({ expanded }) => {
        const next = openParents(expanded, id);
        next.add(id);
        return { expanded: next, currentFolderId: id, focusedId: id };
      });
    },

    // Opens the path to a file and selects it
    revealFile(id) {
      store.set(({ expanded, recent }) => ({
        expanded: openParents(expanded, id),
        currentFolderId: index.get(id).parentId,
        selectedId: id,
        focusedId: id,
        recent: addToRecent(recent, id),
      }));
    },

    selectFile(id) {
      store.set(({ recent }) => ({
        selectedId: id,
        focusedId: id,
        currentFolderId: index.get(id).parentId,
        recent: addToRecent(recent, id),
      }));
    },

    expandAll() {
      const folderIds = [...index.values()].filter(({ node }) => node.type === 'folder').map(({ node }) => node.id);
      store.set({ expanded: new Set(folderIds) });
    },

    collapseAll() {
      store.set({ expanded: new Set() });
    },

    clearRecent() {
      store.set({ recent: [] });
    },

    focusItem(id) {
      store.set({ focusedId: id });
    },

    // Saves the query and opens folders that contain matches
    setQuery(query, openIds) {
      store.set(({ expanded }) => ({
        query,
        expanded: new Set([...expanded, ...openIds]),
      }));
    },

    setListFilter(filter) {
      store.set({ listFilter: filter });
    },
  };
}
