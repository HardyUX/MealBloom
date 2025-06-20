// src/components/KebabMenu.jsx
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

export default function KebabMenu({ onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const kebabButtonRef = useRef();
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                kebabButtonRef.current &&
                !kebabButtonRef.current.contains(event.target)
            ) {
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

    useEffect(() => {
        if (menuOpen && kebabButtonRef.current) {
            const rect = kebabButtonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
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
            className="absolute top-9 right-2 z-20"
        >
            <button
                className="btn btn-ghost btn-xs"
                aria-label="Show actions"
                onClick={toggleMenu}
                tabIndex={0}
                ref={kebabButtonRef}
            >
                <MoreVertical size={16} />
            </button>
            {menuOpen && createPortal (
                <ul
                    className="menu menu-sm dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box z-[9999]"
                    style={{ 
                        position: 'absolute',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`
                     }}
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
                </ul>,
                document.body
            )}
        </div>
    );
}