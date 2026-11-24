# SecureVault Explorer

A file explorer for SecureVault Inc. that lets users navigate deeply nested folders, inspect file details and move through the vault using only the keyboard. It is built with vanilla JavaScript and plain CSS, without any component library.

**Live Demo:** _[paste live link here]_

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/engineermagnifique/AmaliTech-DEG-Project-based-challenges.git
```

2. Navigate to the SecureVault project:

```bash
cd AmaliTech-DEG-Project-based-challenges/fullstack/secure-vault
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL provided by Vite in your browser.

## Design File

_[paste Figma link here]_

## Recursive Strategy

The vault is represented as a tree data structure.

Each node contains an `id`, `name` and `type`. File nodes also have a `size`, and folder nodes contain a `children` array with their nested files and folders.

For example:

```
Folder
├── File
├── Folder
│   ├── File
│   └── Folder
│       └── File
└── File
```

The `TreeNode` component uses recursion to render this structure. It renders one row, and when the node is an open folder, it renders another `TreeNode` for each child with the depth increased by one. The recursion stops at files and closed folders.

Because no depth is fixed in the code, the same component handles 2 levels or 20 levels. The depth is only used for indentation, which becomes smaller after the sixth level so that deep folders still fit in the sidebar.

The same recursive approach is used by the utility functions that traverse the tree:

- `buildIndex` walks the tree once and stores every node by its id with its parent id. This makes it fast to find any node and the path from the root to it, which is used for breadcrumbs and the file location.
- `getVisibleIds` lists the items currently shown on screen, which is used for keyboard navigation with the arrow keys.
- `filterTree` returns a filtered copy of the tree for search, and finds the folders that must open to show the matches.

To test deep nesting, open the app with `?stress` at the end of the URL. This adds a folder 20 levels deep and a folder with 1,000 files, without changing `data.json`.

## Wildcard Feature

As an additional feature beyond the core requirements, I identified a missing part of the user experience: a quick way to return to the files a user works with most.

The sidebar contains a **Recent** section that shows the last five files the user opened, with the newest first. Clicking a recent file opens all of its parent folders in the tree, selects it and shows its details in the properties panel. The list is saved in the browser, so it is still available after the page is reloaded, and it can be cleared at any time.

I considered this an important addition because users rarely browse a vault at random. A lawyer working on a case goes back to the same few documents many times a day, and without this feature, each visit means clicking through several levels of folders again. Recent Files reduces this to a single click, which saves time on every visit and makes the explorer faster to use.

The list is stored only in the user's own browser and is never sent to a server, which suits a security product. If browser storage is not available, the application continues to work normally without remembering the list.
