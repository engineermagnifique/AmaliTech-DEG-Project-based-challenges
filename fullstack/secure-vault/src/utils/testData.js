// Test data for ?stress, using the same structure as data.json

/** Folder chain `depth` levels deep with a file at the bottom. */
function deepFolder(depth) {
  let node = { id: 'deep_file', name: `Level_${depth}_Final_Report.pdf`, type: 'file', size: '2.4MB' };

  for (let level = depth; level >= 1; level -= 1) {
    node = { id: `deep_${level}`, name: `Level_${level}`, type: 'folder', children: [node] };
  }
  return node;
}

/** One folder with `count` files. */
function bigFolder(count) {
  const children = [];
  for (let i = 1; i <= count; i += 1) {
    children.push({ id: `bulk_${i}`, name: `Contract_${String(i).padStart(4, '0')}.pdf`, type: 'file', size: `${(i % 900) + 10}KB` });
  }
  return { id: 'bulk_root', name: 'Bulk_Contracts', type: 'folder', children };
}

export function createTestData() {
  return [
    { id: 'stress_root', name: '99_Stress_Test', type: 'folder', children: [deepFolder(20), bigFolder(1000)] },
  ];
}
