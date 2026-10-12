import { useRef, useState } from 'react';
import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import {
    ArrowPathRoundedSquareIcon,
    CodeBracketSquareIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { PORTRAIT_IMAGE, SUMMARY_TIMELINE } from './summary-transition';

const capabilities = [
    {
        icon: CodeBracketSquareIcon,
        title: 'Scalable ecosystems',
        description: 'Laravel, React, APIs, data platforms, and AI integrations.',
    },
    {
        icon: ArrowPathRoundedSquareIcon,
        title: 'Technical roadmaps',
        description: 'High-growth plans translated into practical delivery.',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Enterprise identity',
        description: 'Security by design across AD, Microsoft 365, and infrastructure.',
    },
];

const revealContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const revealItem = {
    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

function SummaryContent({ revealed, inView = false }) {
    const animationProps = inView
        ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 } }
        : { initial: 'hidden', animate: revealed ? 'visible' : 'hidden' };

    return (
        <motion.div variants={revealContainer} {...animationProps} className="relative">
            <motion.div variants={revealItem} className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-sky-500 to-indigo-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                    Executive Summary
                </span>
            </motion.div>

            <motion.h2
                variants={revealItem}
                className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-950 dark:text-white sm:text-4xl xl:text-[2.75rem] lg:[@media(max-height:820px)]:mt-3 lg:[@media(max-height:820px)]:text-[2rem]"
            >
                Architecting secure, AI-ready systems{' '}
                <span className="bg-gradient-to-r from-sky-600 via-indigo-500 to-slate-500 bg-clip-text text-transparent dark:from-sky-300 dark:via-indigo-300 dark:to-slate-300">
                    and building them end to end.
                </span>
            </motion.h2>

            <motion.p
                variants={revealItem}
                className="mt-6 border-l-2 border-sky-500/70 pl-5 text-lg leading-relaxed text-slate-700 dark:text-slate-200 xl:text-xl lg:[@media(max-height:820px)]:mt-4 lg:[@media(max-height:820px)]:text-base"
            >
                I align enterprise security with scalable, full-stack, AI-integrated
                development—so the systems a business grows on are as resilient as they
                are fast to evolve.
            </motion.p>

            <motion.div
                variants={revealItem}
                className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 lg:[@media(max-height:820px)]:mt-4 lg:[@media(max-height:820px)]:space-y-3 lg:[@media(max-height:820px)]:text-sm"
            >
                <p>
                    I design connected ecosystems with modern frameworks—Laravel and React
                    applications, APIs, data platforms, automation, and AI integrations—and
                    own them from architecture through implementation, including enterprise
                    platforms like HRIS and ERP.
                </p>
                <p>
                    Beyond the code, I shape high-growth technical roadmaps, advise on software,
                    servers, and networks, and manage enterprise identity across Active Directory
                    and Microsoft 365 with security-by-design principles.
                </p>
            </motion.div>

            <motion.div
                variants={revealItem}
                className="mt-8 lg:[@media(max-height:820px)]:mt-5 grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-3"
            >
                {capabilities.map((capability, index) => {
                    const Icon = capability.icon;

                    return (
                        <div
                            key={capability.title}
                            className={`group relative p-5 lg:[@media(max-height:820px)]:p-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.04] ${
                                index > 0
                                    ? 'border-t border-slate-200/80 dark:border-white/10 sm:border-l sm:border-t-0'
                                    : ''
                            }`}
                        >
                            <Icon
                                className="h-5 w-5 text-slate-400 transition-colors group-hover:text-sky-500 dark:text-slate-500 dark:group-hover:text-sky-300"
                                aria-hidden="true"
                            />
                            <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                                {capability.title}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 lg:[@media(max-height:700px)]:hidden">
                                {capability.description}
                            </p>
                        </div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}

export default function ExecutiveSummarySection() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const [revealed, setRevealed] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const { photoIn, revealText } = SUMMARY_TIMELINE;
    // Function transforms keep these on the JS path (not WAAPI scroll timelines), so
    // they stay frame-locked with the WebGL particles that read the same progress.
    const between = (start, end) => (value) => Math.min(1, Math.max(0, (value - start) / (end - start)));
    const photoOpacity = useTransform(scrollYProgress, between(...photoIn));
    const frameOpacity = useTransform(scrollYProgress, between(0.02, 0.3));
    const glowOpacity = useTransform(scrollYProgress, between(0.1, photoIn[1]));
    const captionOpacity = useTransform(scrollYProgress, between(photoIn[1], revealText));

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        setRevealed((current) => (current ? value > revealText - 0.06 : value >= revealText));
    });

    const pinned = !reduceMotion;

    return (
        <section id="summary" className={`relative bg-white dark:bg-[#060a13] ${pinned ? '' : 'py-24'}`}>
            <div id="summary-track" ref={sectionRef} className={pinned ? 'relative h-[300vh]' : 'relative'}>
                <div
                    className={`${pinned ? 'sticky top-0 h-screen' : ''} relative flex items-center overflow-hidden`}
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_55%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

                    <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
                        <div className="flex justify-center lg:col-span-5">
                            <div className="relative">
                                <motion.div
                                    aria-hidden="true"
                                    style={{ opacity: reduceMotion ? 1 : glowOpacity }}
                                    className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),rgba(99,102,241,0.14)_45%,transparent_70%)] blur-2xl"
                                />
                                <motion.div
                                    aria-hidden="true"
                                    style={{ opacity: reduceMotion ? 1 : frameOpacity }}
                                    className="pointer-events-none absolute -inset-4"
                                >
                                    <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-slate-400/70 dark:border-slate-500" />
                                    <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-slate-400/70 dark:border-slate-500" />
                                    <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-slate-400/70 dark:border-slate-500" />
                                    <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-slate-400/70 dark:border-slate-500" />
                                </motion.div>

                                <div
                                    id="summary-portrait-anchor"
                                    className="relative aspect-[4/5]"
                                    style={{ height: 'min(62vh, 540px, 105vw)' }}
                                >
                                    <motion.div
                                        aria-hidden="true"
                                        style={{ opacity: reduceMotion ? 1 : frameOpacity }}
                                        className="pointer-events-none absolute inset-x-[8%] bottom-[10%] top-[6%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.22),rgba(99,102,241,0.12)_50%,transparent_72%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.28),rgba(99,102,241,0.18)_50%,transparent_72%)]"
                                    />
                                    <motion.div
                                        aria-hidden="true"
                                        style={{ opacity: reduceMotion ? 1 : frameOpacity }}
                                        className="pointer-events-none absolute left-1/2 top-[8%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-slate-300/50 dark:border-white/10"
                                    />
                                    <motion.img
                                        src={PORTRAIT_IMAGE}
                                        alt="Portrait of Mark Harvey Leduna"
                                        style={{
                                            opacity: reduceMotion ? 1 : photoOpacity,
                                        }}
                                        className="relative h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.25)]"
                                    />
                                </div>

                                <motion.div
                                    style={{ opacity: reduceMotion ? 1 : captionOpacity }}
                                    className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 shadow-xl shadow-slate-900/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0b1220]/85"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.9)]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                                        Mark Harvey Leduna
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="hidden lg:col-span-7 lg:block">
                            <SummaryContent revealed={reduceMotion || revealed} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 px-4 pb-20 sm:px-6 lg:hidden">
                <SummaryContent inView />
            </div>
        </section>
    );
}
