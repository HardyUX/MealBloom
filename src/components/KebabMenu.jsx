// src/components/KebabMenu.jsx
import { useEffect, useState, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

export default function KebabMenu({ onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

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
            ref={menuRef}
            className={`absolute top-9 right-2 z-20 ${
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