import { useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';

const NUDGE_STEP = 8;
const NUDGE_STEP_LARGE = 32;

function clamp(value, min, max) {
    if (min > max) return value;
    return Math.min(Math.max(value, min), max);
}

export default function DraggableBadge({ label, dotClassName = '', constraintsRef, className = '', onMove }) {
    const nodeRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Target offset, so rapid key presses accumulate instead of re-reading a mid-flight spring.
    const target = useRef({ x: 0, y: 0 });
    const resyncTarget = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const moveTo = (nextX, nextY) => {
        target.current = { x: nextX, y: nextY };
        resyncTarget.current = false;

        if (shouldReduceMotion) {
            x.set(nextX);
            y.set(nextY);
            return;
        }
        const spring = { type: 'spring', stiffness: 520, damping: 40 };
        animate(x, nextX, spring);
        animate(y, nextY, spring);
    };

    const nudge = (deltaX, deltaY) => {
        const node = nodeRef.current;
        const bounds = constraintsRef?.current;

        // A pointer drag (and its elastic settle) moves x/y outside of moveTo, so pick that position up.
        if (resyncTarget.current) {
            target.current = { x: x.get(), y: y.get() };
            resyncTarget.current = false;
        }

        let nextX = target.current.x + deltaX;
        let nextY = target.current.y + deltaY;

        // Keep keyboard moves inside the same box the pointer drag is constrained to.
        if (node && bounds) {
            const boundsRect = bounds.getBoundingClientRect();
            const nodeRect = node.getBoundingClientRect();
            nextX = clamp(nextX, x.get() + (boundsRect.left - nodeRect.left), x.get() + (boundsRect.right - nodeRect.right));
            nextY = clamp(nextY, y.get() + (boundsRect.top - nodeRect.top), y.get() + (boundsRect.bottom - nodeRect.bottom));
        }

        moveTo(nextX, nextY);
        onMove?.();
    };

    const handleKeyDown = (event) => {
        const step = event.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP;
        const offsets = {
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
        };

        if (offsets[event.key]) {
            event.preventDefault();
            nudge(...offsets[event.key]);
            return;
        }

        if (event.key === 'Escape' || event.key === 'Home') {
            event.preventDefault();
            moveTo(0, 0);
        }
    };

    return (
        <motion.div
            ref={nodeRef}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
                setIsDragging(false);
                resyncTarget.current = true;
                onMove?.();
            }}
            onDoubleClick={() => moveTo(0, 0)}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.04 }}
            whileFocus={{ scale: 1.04 }}
            whileDrag={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            style={{ x, y, zIndex: isDragging ? 20 : 10 }}
            tabIndex={0}
            data-draggable="true"
            aria-roledescription="Draggable tag"
            aria-label={`${label}. Drag it, or move it with the arrow keys. Press Escape to reset its position.`}
            className={`absolute cursor-grab touch-none select-none rounded-xl border border-white/70 bg-white/75 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 active:cursor-grabbing dark:border-white/10 dark:bg-[#0b1220]/75 ${
                isDragging ? 'shadow-2xl shadow-sky-500/25 dark:shadow-sky-400/20' : ''
            } ${className}`}
        >
            <span className="pointer-events-none flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200">
                <span className={`h-2 w-2 rounded-full ${dotClassName}`} />
                {label}
            </span>
        </motion.div>
    );
}
