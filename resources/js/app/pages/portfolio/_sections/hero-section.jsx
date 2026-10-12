import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDownIcon, ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Button from '../../components/button';
import DraggableBadge from '../../components/draggable-badge';
import { scrollToSummary } from './summary-transition';

const SystemsScene = lazy(() => import('./systems-scene'));

function SceneFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[42%] w-[42%] animate-pulse rounded-full border border-sky-300/40 bg-gradient-to-br from-sky-300/30 to-indigo-400/10 shadow-[0_0_100px_rgba(56,189,248,0.18)] dark:border-sky-400/20" />
        </div>
    );
}

/**
 * Tracks an element's box in document coordinates so an overlay can be mounted on <body>.
 * The scene canvas is portalled to <body> at z-40, so anything that has to sit above it
 * cannot live inside the hero section's own stacking context.
 */
function useDocumentRect(ref) {
    const [rect, setRect] = useState(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const update = () => {
            const box = node.getBoundingClientRect();
            setRect((previous) => {
                const next = {
                    left: box.left + window.scrollX,
                    top: box.top + window.scrollY,
                    width: box.width,
                    height: box.height,
                };
                if (
                    previous &&
                    previous.left === next.left &&
                    previous.top === next.top &&
                    previous.width === next.width &&
                    previous.height === next.height
                ) {
                    return previous;
                }
                return next;
            });
        };

        update();

        const observer = new ResizeObserver(update);
        observer.observe(node);
        observer.observe(document.body);
        window.addEventListener('resize', update);
        document.fonts?.ready.then(update).catch(() => {});

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', update);
        };
    }, [ref]);

    return rect;
}

export default function HeroSection() {
    const sceneRef = useRef(null);
    const badgeLayerRef = useRef(null);
    const sceneRect = useDocumentRect(sceneRef);
    const [hasDraggedBadge, setHasDraggedBadge] = useState(false);

    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50/70 transition-colors duration-500 dark:from-[#060a13] dark:via-[#060a13] dark:to-[#0a1224]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,_var(--tw-gradient-stops))] from-sky-100/70 via-transparent to-transparent dark:from-indigo-950/40" />
            <div className="pointer-events-none absolute -left-48 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-900/10" />

            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-4 pb-24 pt-28 sm:px-6 md:gap-8 lg:grid-cols-2 lg:gap-2 lg:px-8 lg:pb-20 lg:pt-24">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
                    }}
                    className="relative z-10 max-w-2xl py-8 text-left lg:py-12"
                >
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 18 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                        }}
                        className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400"
                    >
                        <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-indigo-400" />
                        Mark Harvey Leduna
                    </motion.p>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 22 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
                        }}
                        className="mb-6 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 dark:text-white sm:text-6xl lg:text-6xl xl:text-7xl"
                    >
                        Solutions Architect
                        <span className="mt-2 block bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text pb-1 text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-indigo-300">
                            & Full-Stack Developer
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 18 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                        }}
                        className="mb-9 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl"
                    >
                        Bridging complex engineering with strategic IT leadership to design
                        scalable systems and build thoughtful digital experiences.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 18 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                        }}
                        className="mb-10 flex flex-col items-start gap-3 sm:flex-row"
                    >
                        <Button onClick={scrollToProjects} className="group">
                            View Technical Projects
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Button>
                        <a
                            href="/resume.pdf"
                            download="Mark-Harvey-Leduna-Resume.pdf"
                            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-slate-800 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-white/30 dark:hover:bg-white/[0.08]"
                        >
                            Download Resume
                            <ArrowDownTrayIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                        </a>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 0.7 } },
                        }}
                        className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-500"
                    >
                        {['Laravel', 'React', 'Python', 'AI Integration'].map((technology, index) => (
                            <span key={technology} className="flex items-center gap-3">
                                {index > 0 && <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />}
                                {technology}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.94, x: 24 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-[620px] lg:translate-x-6"
                >
                    <div id="hero-scene-anchor" ref={sceneRef} className="hero-scene relative mx-auto aspect-square w-full">
                        <div className="hero-scene-glow absolute inset-[12%] rounded-full bg-sky-300/30 blur-[90px] dark:bg-indigo-500/20" />
                        <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/30 motion-safe:animate-[spin_42s_linear_infinite] dark:border-sky-400/20" />
                        <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/40 motion-safe:animate-[spin_58s_linear_infinite_reverse] dark:border-slate-700/50" />

                        <Suspense fallback={<SceneFallback />}>
                            <SystemsScene />
                        </Suspense>

                        <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold tracking-[0.28em] text-slate-400 dark:text-slate-500">
                            SYSTEMS IN MOTION
                            <motion.span
                                animate={{ opacity: hasDraggedBadge ? 0 : 1 }}
                                transition={{ duration: 0.45 }}
                                className="text-[9px] font-medium tracking-[0.2em] text-slate-400/80 dark:text-slate-500/80"
                            >
                                DRAG THE TAGS
                            </motion.span>
                        </div>
                    </div>

                    {sceneRect &&
                        createPortal(
                            <motion.div
                                ref={badgeLayerRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="pointer-events-none absolute z-[45]"
                                style={{
                                    left: sceneRect.left,
                                    top: sceneRect.top,
                                    width: sceneRect.width,
                                    height: sceneRect.height,
                                }}
                            >
                                <DraggableBadge
                                    label="AUTOMATION"
                                    dotClassName="bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                                    constraintsRef={badgeLayerRef}
                                    onMove={() => setHasDraggedBadge(true)}
                                    className="pointer-events-auto left-[4%] top-[21%] sm:left-0"
                                />
                                <DraggableBadge
                                    label="SYSTEMS ARCHITECTURE"
                                    dotClassName="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                    constraintsRef={badgeLayerRef}
                                    onMove={() => setHasDraggedBadge(true)}
                                    className="pointer-events-auto bottom-[19%] right-[3%] sm:right-0"
                                />
                            </motion.div>,
                            document.body
                        )}
                </motion.div>
            </div>

            <motion.button
                type="button"
                onClick={scrollToSummary}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                aria-label="Scroll to executive summary"
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-300/70 bg-white/50 p-2 text-slate-500 backdrop-blur transition hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:text-white"
            >
                <ArrowDownIcon className="h-5 w-5 animate-bounce" />
            </motion.button>
        </section>
    );
}
