// src/components/FavoriteButton.jsx
import { Heart } from 'lucide-react';

export default function FavoriteButton({ isFavorited, onToggle, ariaLabel }) {
    return (
        <button
            className="btn btn-ghost btn-xs absolute top-2 right-2 z-20"
            aria-label={ariaLabel}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            tabIndex={0}
        >
            {/* Filled heart */}
            {isFavorited ? <Heart size={16} fill="#f87171" stroke="#f87171" /> : <Heart size={16} />}
        </button>
    );
}