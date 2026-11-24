import { el } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { FileBadge } from './FileBadge.js';

/** Recently opened files, newest first. */
export function RecentFiles({ ids, index, onOpen, onClear }) {
  if (ids.length === 0) return null;

  return el(
    'section',
    { className: 'recent', 'aria-label': 'Recent files' },
    el(
      'div',
      { className: 'section-label' },
      icon('clock', { size: 14 }),
      'Recent',
      el('button', { type: 'button', className: 'text-button', onClick: onClear }, 'Clear'),
    ),
    el(
      'ul',
      { className: 'recent__list' },
      ids.map((id) => {
        const { node } = index.get(id);
        return el(
          'li',
          {},
          el(
            'button',
            { type: 'button', className: 'chip', title: node.name, onClick: () => onOpen(id) },
            el('span', { className: 'chip__badge' }, FileBadge(node.name)),
            el('span', { className: 'chip__name' }, node.name),
          ),
        );
      }),
    ),
  );
}
