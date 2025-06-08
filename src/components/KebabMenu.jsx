// src/components/KebabMenu.jsx
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function KebabMenu({ onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    function toggleMenu(e) {
        e.stopPropagation();
        setMenuOpen((open) => !open);
    }

    function handleAction(action) {
        setMenuOpen(false);
        if (action === 'edit') onEdit();
        if (action === 'delete') onDelete();
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') setMenuOpen(false);
    }

    return (
        <div
            className={`absolute top-2 left-2 z-20 ${
                menuOpen ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'
            }`}
        >
            <button
                className="btn btn-ghost btn-xs"
                aria-label="Show actions"
                onClick={toggleMenu}
                tabIndex={0}
            >
                <MoreVertical size={16} />
            </button>
            {menuOpen && (
                <ul
                    className="menu menu-sm dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box z-30"
                    style={{ position: 'absolute', left: 0, top: '100%' }}
                    onKeyDown={handleKeyDown}
                >
                    <li>
                        <button onClick={() => handleAction('edit')} aria-label="Edit meal">
                            Edit
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-error"
                            onClick={() => handleAction('delete')}
                            aria-label="Delete meal">
                            Delete
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}