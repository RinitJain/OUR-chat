import React, { useState } from "react";

const modes = [
    { name: "Love Mode ❤️", className: "bg-pink-200" },
    { name: "Fight Mode ⚡", className: "bg-red-600" },
    { name: "Sorry Mode 😢", className: "bg-blue-300" },
];

const ModeSwitcher: React.FC<{ onModeChange: (mode: string) => void }> = ({ onModeChange }) => {
    const [currentMode, setCurrentMode] = useState(modes[0].name);

    const handleModeChange = (mode: string) => {
        setCurrentMode(mode);
        onModeChange(mode);
    };

    return (
        <div className="flex space-x-4 p-4">
            {modes.map((mode) => (
                <button
                    key={mode.name}
                    className={`py-2 px-4 rounded ${mode.className} ${currentMode === mode.name ? "font-bold" : ""}`}
                    onClick={() => handleModeChange(mode.className)}
                >
                    {mode.name}
                </button>
            ))}
        </div>
    );
};

export default ModeSwitcher;
