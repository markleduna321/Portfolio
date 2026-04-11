import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, input, textarea, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        
        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    // Don't render on mobile or touch devices ideally, but checking window width is a proxy
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "2px solid rgba(139, 92, 246, 0.5)", // purple-500 tint
            opacity: isVisible ? 1 : 0
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "2px solid rgba(139, 92, 246, 1)",
            opacity: isVisible ? 1 : 0
        }
    };

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            {/* The main outer cursor */}
            <motion.div
                className="absolute top-0 left-0 rounded-full"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            {/* The small inner dot */}
            <motion.div
                className="absolute top-0 left-0 w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
            />
        </div>
    );
}
