"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export type NavItem = {
    name: string;
    href: string;
};

export interface NavProps {
    items: NavItem[];
    className?: string;
    activeTab?: string;
}

// ============================================================================
// 5. THE "SKETCHY" NAV (Hand-Drawn)
// Style: Organic, Wobbly, Pencil Texture.
// Used by: Excalidraw, Personal Blogs, Indie Projects.
// ============================================================================
export const SketchyNav = ({ items, className = "" }: NavProps) => {
    const [active, setActive] = useState(items[0]?.name);

    return (
        <nav className={`flex gap-6 p-2 ${className}`}>
            {items.map((item) => {
                const isActive = active === item.name;
                return (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                            e.preventDefault();
                            setActive(item.name);
                        }}
                        className={`relative px-3 py-1 font-serif text-lg text-zinc-800 transition-colors ${
                            isActive ? "font-bold" : "hover:text-zinc-600"
                        }`}
                    >
                        <span className="relative z-10">{item.name}</span>

                        {/* The Scribble */}
                        {isActive && (
                            <svg
                                className="absolute inset-0 -z-10 w-full h-full overflow-visible"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <motion.path
                                    d="M-5,50 Q25,40 50,50 T105,50"
                                    fill="none"
                                    stroke="#FCD34D" // Yellow marker
                                    strokeWidth="25"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ opacity: 0.6 }}
                                />
                                <motion.path
                                    d="M-5,85 Q25,95 50,85 T105,85"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                />
                            </svg>
                        )}
                    </a>
                );
            })}
        </nav>
    );
};

export const NAV_LINKS = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
];

export default function SketchyNavPreview() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            ></div>
            <div className="relative z-10">
                <SketchyNav items={NAV_LINKS} />
            </div>
        </div>
    );
}
