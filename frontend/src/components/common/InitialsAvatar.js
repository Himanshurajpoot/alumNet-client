import React from 'react';

function InitialsAvatar({ name, size = 'w-24 h-24', textSize = 'text-2xl', className = '' }) {
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        return fullName
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    };

    return (
        <div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-300 flex items-center justify-center text-white ${textSize} font-bold shadow-lg ${className}`}>
            {getInitials(name)}
        </div>
    );
}

export default InitialsAvatar;
