import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.45 });
    const ringY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.45 });

    useEffect(() => {
        const query = window.matchMedia('(pointer: fine) and (min-width: 768px)');
        const sync = () => setEnabled(query.matches);
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;

        const handleMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setIsVisible(true);
        };
        const handleOver = (e) => setIsHovering(Boolean(e.target.closest?.(INTERACTIVE)));
        const handleLeave = () => setIsVisible(false);

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('pointerover', handleOver, { passive: true });
        document.documentElement.addEventListener('pointerleave', handleLeave);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerover', handleOver);
            document.documentElement.removeEventListener('pointerleave', handleLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
            <motion.div
                className="absolute left-0 top-0 rounded-full border border-cyan-500/60 dark:border-cyan-300/50"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    width: isHovering ? 44 : 30,
                    height: isHovering ? 44 : 30,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.08)' : 'rgba(34, 211, 238, 0)',
                }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.85)] dark:bg-cyan-300"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 0 : 1 }}
                transition={{ duration: 0.18 }}
            />
        </div>
    );
}
