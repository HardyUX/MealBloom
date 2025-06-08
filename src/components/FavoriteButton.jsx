// src/components/FavoriteButton.jsx
import { Heart, Heart as HeartFilled } from 'lucide-react';

export default function FavoriteButton({ isFavorited, onToggle, ariaLabel }) {
    return (
        <button
            className="btn btn-ghost btn-xs absolute top-2 right-2 z-20"
            aria-label={ariaLabel}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            tabIndex={0}
            style={{ color: isFavorited ? '#f87171' : undefined }}
        >
            {/* Filled heart */}
            {isFavorited ? <HeartFilled fill="#f87171" size={16} /> : <Heart size={16} />}
        </button>
    );
}