import { useEffect, useMemo, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from 'framer-motion';
import {
    ArrowRightIcon,
    ClipboardDocumentListIcon,
    EyeIcon,
    Squares2X2Icon,
    UserGroupIcon,
    WifiIcon,
} from '@heroicons/react/24/outline';
import '@fontsource/great-vibes/400.css';

const CASE_FIELDS = [
    ['Problem', 'problem'],
    ['Architecture / Stack', 'architecture'],
    ['Result', 'result'],
];

const ACCENTS = [
    { glow: 'rgba(56,189,248,0.22)', label: 'text-sky-600 dark:text-sky-300', dot: 'bg-sky-500' },
    { glow: 'rgba(129,140,248,0.22)', label: 'text-indigo-600 dark:text-indigo-300', dot: 'bg-indigo-500' },
    { glow: 'rgba(45,212,191,0.2)', label: 'text-teal-600 dark:text-teal-300', dot: 'bg-teal-500' },
    { glow: 'rgba(167,139,250,0.22)', label: 'text-violet-600 dark:text-violet-300', dot: 'bg-violet-500' },
];

const smoothstep = (edge0, edge1, value) => {
    const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
};

const pad = (value) => String(value).padStart(2, '0');

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches,
    );

    useEffect(() => {
        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [query]);

    return matches;
}

function ProjectContent({ project, index, count, onOpen, focusable = true }) {
    const accent = ACCENTS[index % ACCENTS.length];

    return (
        <div>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]">
                <span className={accent.label}>Case Study {pad(index + 1)}</span>
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
                <span className="text-slate-400 dark:text-slate-500">{pad(count)}</span>
            </div>

            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white xl:text-4xl [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-[1.7rem]">
                {project.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400 [@media(max-height:760px)]:text-sm">
                {project.description}
            </p>

            <dl className="mt-6 space-y-4 border-l border-slate-200 pl-5 dark:border-white/10 [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:space-y-3">
                {CASE_FIELDS.map(([label, key]) => (
                    <div key={key}>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            {label}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {project.caseStudy[key]}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2 [@media(max-height:760px)]:mt-4">
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <button
                type="button"
                onClick={() => onOpen(project)}
                tabIndex={focusable ? 0 : -1}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300 [@media(max-height:760px)]:mt-5"
            >
                View case study
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </div>
    );
}

function ProjectVisual({ project, index }) {
    const accent = ACCENTS[index % ACCENTS.length];

    return (
        <div className="relative">
            <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent.glow}, transparent 70%)` }}
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
                <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="ml-3 truncate text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {project.title}
                    </span>
                </div>
                <div className="aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-slate-100 dark:bg-[#0b1220]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="absolute -bottom-5 left-8 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-white/10 dark:bg-[#0b1220]/90">
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                    {project.techStack[0]}
                </span>
            </div>
        </div>
    );
}

const NAV_HEIGHT = 64;
const HUD_HEIGHT = 64;
const IMAGE_RATIO = 1.6;
const SCREENS_PER_PROJECT = 1.5;
const END_HOLD = 0.3;
const NODE_ICONS = [ClipboardDocumentListIcon, UserGroupIcon, EyeIcon, WifiIcon];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const nodeAngles = (count) =>
    Array.from({ length: count }, (_, index) => (count === 1 ? 0 : -60 + (120 * index) / (count - 1)));

const splitTitle = (title) => {
    const [name, client] = title.split(' — ');
    return { name, client };
};

function getViewport() {
    return {
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
    };
}

function useViewport() {
    const [viewport, setViewport] = useState(getViewport);

    useEffect(() => {
        const update = () => setViewport(getViewport());
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return viewport;
}

// All showcase geometry is derived from the viewport so the image can travel with transforms only.
function getLayout({ width, height }) {
    const stageHeight = height - NAV_HEIGHT;
    const contentTop = NAV_HEIGHT + HUD_HEIGHT;
    const contentHeight = stageHeight - HUD_HEIGHT;
    const margin = Math.max(40, (width - 1560) / 2);
    const gap = Math.max(48, width * 0.045);
    const imageWidth = Math.min(width * 0.53, (contentHeight - 56) * IMAGE_RATIO);
    const imageHeight = imageWidth / IMAGE_RATIO;
    const imageY = contentTop + (contentHeight - imageHeight) / 2;
    const textWidth = width - margin * 2 - imageWidth - gap;

    const radius = Math.min(stageHeight * 0.38, width * 0.2);
    const cardHeight = Math.min(stageHeight * 0.5, (width * 0.4) / IMAGE_RATIO);
    const cardWidth = cardHeight * IMAGE_RATIO;
    const groupWidth = cardWidth + radius * 1.15 + 120;
    const cardX = (width - groupWidth) / 2;
    const centerY = NAV_HEIGHT + stageHeight * 0.55;

    return {
        contentTop,
        contentHeight,
        textWidth,
        image: { width: imageWidth, height: imageHeight },
        slides: {
            right: { x: width - margin - imageWidth, y: imageY, textX: margin },
            left: { x: margin, y: imageY, textX: margin + imageWidth + gap },
        },
        card: { x: cardX, y: centerY - cardHeight / 2, width: cardWidth, height: cardHeight },
        dial: { cx: cardX + cardWidth + radius * 0.15, cy: centerY, r: radius },
    };
}

// 0 while a project is settled, 1 while the selector is fully zoomed out between two projects.
const zoomAt = (u, count) => {
    if (count < 2) return 0;
    const boundary = clamp(Math.round(u - 0.5) + 0.5, 0.5, count - 1.5);
    return 1 - smoothstep(0.16, 0.3, Math.abs(u - boundary));
};

const selectionAt = (u, count) => {
    let value = 0;
    for (let index = 1; index < count; index += 1) {
        value += smoothstep(index - 0.64, index - 0.36, u);
    }
    return value;
};

const slideFor = (layout, index) => (index % 2 === 0 ? layout.slides.right : layout.slides.left);

function ShowcaseText({ project, index, count, progress, layout, active, onOpen }) {
    const { name, client } = splitTitle(project.title);
    const slide = slideFor(layout, index);
    const opacity = useTransform(progress, (u) => 1 - smoothstep(0.15, 0.25, Math.abs(u - index)));
    const y = useTransform(progress, (u) => (index - u) * 90);

    return (
        <motion.div
            aria-hidden={!active}
            style={{
                opacity,
                y,
                left: slide.textX,
                top: layout.contentTop,
                width: layout.textWidth,
                height: layout.contentHeight,
            }}
            className={`absolute z-20 flex items-center will-change-transform ${active ? '' : 'pointer-events-none'}`}
        >
            <div className="w-full max-w-xl">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                    <span className="text-cyan-200">Case Study {pad(index + 1)}</span>
                    <span className="text-slate-600">/ {pad(count)}</span>
                </div>

                <h3 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white xl:text-5xl [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-3xl">
                    {name}
                    {client && <span className="mt-1 block text-slate-500">{client}</span>}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-400 [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-sm">
                    {project.description}
                </p>

                <dl className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07] [@media(max-height:760px)]:mt-4">
                    {CASE_FIELDS.map(([label, key]) => (
                        <div
                            key={key}
                            className="grid grid-cols-[6.5rem_1fr] gap-5 py-3.5 [@media(max-height:760px)]:py-2.5"
                        >
                            <dt className="pt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {label}
                            </dt>
                            <dd className="text-sm leading-relaxed text-slate-300 [@media(max-height:760px)]:text-[13px]">
                                {project.caseStudy[key]}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-2 [@media(max-height:760px)]:mt-4">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => onOpen(project)}
                    tabIndex={active ? 0 : -1}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 [@media(max-height:760px)]:mt-5"
                >
                    View case study
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </motion.div>
    );
}

function StackedImage({ project, index, selection }) {
    const clipPath = useTransform(selection, (s) => {
        if (index === 0) return 'none';
        const reveal = clamp(s - (index - 1), 0, 1);
        if (reveal >= 1) return 'none';
        return `circle(${reveal * 72}% at 50% 50%)`;
    });
    const scale = useTransform(selection, (s) => 1.12 - 0.12 * clamp(s - (index - 1), 0, 1));

    return (
        <motion.img
            src={project.image}
            alt=""
            draggable="false"
            style={{ clipPath, scale }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
    );
}

function SelectorNode({ project, index, x, y, selection }) {
    const Icon = NODE_ICONS[index % NODE_ICONS.length];
    const intensity = useTransform(selection, (s) => clamp(1 - Math.abs(s - index) * 1.4, 0, 1));
    const scale = useTransform(intensity, (v) => 1 + v * 0.2);
    const idle = useTransform(intensity, (v) => 1 - v);

    return (
        <div className="absolute" style={{ left: x, top: y }}>
            <motion.div
                style={{ scale }}
                className="relative -ml-9 -mt-9 grid h-[72px] will-change-transform w-[72px] place-items-center rounded-full bg-gradient-to-b from-[#232c3e] to-[#0c111c] shadow-[0_0_0_7px_#0a0f1a,0_0_0_8px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-10px_18px_rgba(0,0,0,0.5),0_24px_40px_-12px_rgba(0,0,0,0.95)]"
            >
                <motion.span
                    style={{ opacity: intensity }}
                    className="absolute -inset-[7px] rounded-full border-2 will-change-[opacity] border-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.7),inset_0_0_18px_rgba(34,211,238,0.4)]"
                />
                <motion.span style={{ opacity: idle }} className="absolute inset-0 grid place-items-center">
                    <Icon className="h-7 w-7 text-slate-500" />
                </motion.span>
                <motion.span style={{ opacity: intensity }} className="absolute inset-0 grid place-items-center">
                    <Icon className="h-7 w-7 text-cyan-200" />
                </motion.span>
            </motion.div>
            <div className="absolute left-0 top-12 -translate-x-1/2 whitespace-nowrap text-center text-sm font-semibold tracking-wide">
                <motion.span style={{ opacity: idle }} className="block text-slate-400">
                    {splitTitle(project.title).name}
                </motion.span>
                <motion.span style={{ opacity: intensity }} className="absolute inset-0 block text-cyan-100">
                    {splitTitle(project.title).name}
                </motion.span>
            </div>
        </div>
    );
}

function ProjectSelector({ projects, layout, selection, opacity, comet, active }) {
    const count = projects.length;
    const { card, dial } = layout;
    const box = dial.r * 1.34;
    const angles = nodeAngles(count);
    const point = (degrees, radius = dial.r) => {
        const radians = (degrees * Math.PI) / 180;
        return { x: box + radius * Math.cos(radians), y: box + radius * Math.sin(radians) };
    };
    const start = point(angles[0]);
    const end = point(angles[count - 1]);
    const arc = `M ${start.x} ${start.y} A ${dial.r} ${dial.r} 0 0 1 ${end.x} ${end.y}`;
    const dash = useTransform(selection, (s) => `${count > 1 ? s / (count - 1) : 1} 1`);
    const sparkles = [-128, -104, -84, 74, 96, 118, 142, 166, 196];

    return (
        <motion.div
            aria-hidden="true"
            style={{ opacity }}
            className="pointer-events-none absolute inset-0 z-0 will-change-[opacity]"
        >
            <div
                className="absolute"
                style={{ left: dial.cx - box, top: dial.cy - box, width: box * 2, height: box * 2 }}
            >
                <svg className="absolute inset-0 h-full w-full overflow-visible">
                    <circle cx={box} cy={box} r={dial.r * 1.3} fill="none" stroke="rgba(148,163,184,0.06)" />
                    <circle cx={box} cy={box} r={dial.r} fill="none" stroke="rgba(148,163,184,0.13)" strokeWidth="1.5" />
                    <circle
                        cx={box}
                        cy={box}
                        r={dial.r * 0.72}
                        fill="none"
                        stroke="rgba(148,163,184,0.08)"
                        strokeDasharray="2 7"
                    />
                    <path d={arc} fill="none" stroke="rgba(34,211,238,0.14)" strokeWidth="3" strokeLinecap="round" />
                    <motion.path
                        d={arc}
                        pathLength="1"
                        fill="none"
                        stroke="rgba(34,211,238,0.22)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        style={{ strokeDasharray: dash }}
                    />
                    <motion.path
                        d={arc}
                        pathLength="1"
                        fill="none"
                        stroke="rgb(125,240,255)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        style={{ strokeDasharray: dash }}
                    />
                    {sparkles.map((degrees, index) => {
                        const spot = point(degrees, dial.r * (index % 2 ? 1.3 : 1.12));
                        return (
                            <circle
                                key={degrees}
                                cx={spot.x}
                                cy={spot.y}
                                r={index % 3 ? 1.2 : 1.8}
                                fill="rgb(125,240,255)"
                                opacity={0.25 + (index % 3) * 0.15}
                            />
                        );
                    })}
                </svg>

                <motion.span
                    style={{ x: comet.x, y: comet.y }}
                    className="absolute left-0 top-0 will-change-transform -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-cyan-100 shadow-[0_0_10px_3px_rgba(34,211,238,0.9),0_0_36px_10px_rgba(34,211,238,0.35)]"
                />

                {projects.map((project, index) => {
                    const spot = point(angles[index]);
                    return (
                        <SelectorNode
                            key={project.id}
                            project={project}
                            index={index}
                            x={spot.x}
                            y={spot.y}
                            selection={selection}
                        />
                    );
                })}
            </div>

            <div
                className="absolute -translate-x-1/2 whitespace-nowrap text-6xl leading-none text-[#ffe3c8] [text-shadow:0_0_16px_rgba(255,170,110,0.55),0_0_40px_rgba(255,140,80,0.28)]"
                style={{
                    left: card.x + card.width / 2,
                    top: card.y - 92,
                    fontFamily: "'Great Vibes', cursive",
                }}
            >
                Projects
            </div>

            <div
                className="absolute -translate-x-1/2 whitespace-nowrap text-center"
                style={{ left: card.x + card.width / 2, top: card.y + card.height + 26 }}
            >
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
                    Case Study {pad(active + 1)}
                </p>
                <p className="mt-1.5 text-lg font-semibold tracking-wide text-slate-200">
                    {splitTitle(projects[active].title).name}
                </p>
            </div>
        </motion.div>
    );
}

export function FeaturedShowcase({ projects, onOpen, onShowAll, hiddenCount }) {
    const trackRef = useRef(null);
    const count = projects.length;
    const span = count - 1 + END_HOLD;
    const viewport = useViewport();
    const layout = useMemo(() => getLayout(viewport), [viewport]);
    const layoutRef = useRef(layout);
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });
    const progress = useTransform(scrollYProgress, (value) => clamp(value * span, 0, count - 1));
    const zoom = useTransform(progress, (u) => zoomAt(u, count));
    const selection = useTransform(progress, (u) => selectionAt(u, count));
    const selectorOpacity = useTransform(zoom, (z) => smoothstep(0.35, 1, z));
    const glowOpacity = useTransform(zoom, (z) => smoothstep(0.2, 1, z));
    const hudOpacity = useTransform(zoom, (z) => 1 - smoothstep(0, 0.4, z));
    const imageTransform = useMotionValue('none');
    const cometX = useMotionValue(0);
    const cometY = useMotionValue(0);

    const applyFrame = (u) => {
        const current = layoutRef.current;
        const z = zoomAt(u, count);
        const from = slideFor(current, Math.round(u));
        const base = current.slides.right;
        const scale = 1 + (current.card.width / current.image.width - 1) * z;
        const x = from.x + (current.card.x - from.x) * z;
        const y = from.y + (current.card.y - from.y) * z;
        imageTransform.set(`translate3d(${x - base.x}px, ${y - base.y}px, 0) scale(${scale})`);

        const angles = nodeAngles(count);
        const s = selectionAt(u, count);
        const degrees = count > 1 ? angles[0] + ((angles[count - 1] - angles[0]) * s) / (count - 1) : 0;
        const radians = (degrees * Math.PI) / 180;
        const box = current.dial.r * 1.34;
        cometX.set(box + current.dial.r * Math.cos(radians));
        cometY.set(box + current.dial.r * Math.sin(radians));
    };

    useMotionValueEvent(progress, 'change', (u) => {
        applyFrame(u);
        setActive(clamp(Math.round(u), 0, count - 1));
    });

    useEffect(() => {
        layoutRef.current = layout;
        applyFrame(progress.get());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layout]);

    return (
        <div
            ref={trackRef}
            className="relative bg-[#060a13]"
            style={{ height: `${(span * SCREENS_PER_PROJECT + 1) * 100}vh` }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-[#060a13]"
            />
            <div className="sticky top-0 h-screen overflow-hidden">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transform-gpu bg-[radial-gradient(ellipse_70%_60%_at_65%_55%,rgba(34,211,238,0.09),transparent_70%),radial-gradient(ellipse_50%_50%_at_15%_35%,rgba(99,102,241,0.1),transparent_70%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transform-gpu bg-[linear-gradient(to_right,rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]"
                />

                <ProjectSelector
                    projects={projects}
                    layout={layout}
                    selection={selection}
                    opacity={selectorOpacity}
                    comet={{ x: cometX, y: cometY }}
                    active={active}
                />

                <motion.div
                    aria-hidden="true"
                    style={{
                        transform: imageTransform,
                        left: layout.slides.right.x,
                        top: layout.slides.right.y,
                        width: layout.image.width,
                        height: layout.image.height,
                    }}
                    className="pointer-events-none absolute z-10 origin-top-left will-change-transform"
                >
                    <div className="absolute inset-0 rounded-[26px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]" />
                    <motion.div
                        style={{ opacity: glowOpacity }}
                        className="absolute -inset-[3px] rounded-[29px] will-change-[opacity] border-2 border-cyan-300/80 shadow-[0_0_40px_rgba(34,211,238,0.45),0_0_90px_rgba(34,211,238,0.2)]"
                    />
                    <div className="absolute inset-0 overflow-hidden rounded-[26px] bg-slate-900 ring-1 ring-white/10">
                        {projects.map((project, index) => (
                            <StackedImage key={project.id} project={project} index={index} selection={selection} />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/[0.06]" />
                    </div>
                </motion.div>

                {projects.map((project, index) => (
                    <ShowcaseText
                        key={project.id}
                        project={project}
                        index={index}
                        count={count}
                        progress={progress}
                        layout={layout}
                        active={index === active}
                        onOpen={onOpen}
                    />
                ))}

                <motion.div
                    style={{ opacity: hudOpacity, top: NAV_HEIGHT, height: HUD_HEIGHT }}
                    className="absolute inset-x-0 z-30 flex items-center will-change-[opacity]"
                >
                    <div className="mx-auto flex w-full max-w-[1560px] items-center justify-between px-10">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-gradient-to-r from-cyan-300 to-indigo-400" />
                            <h2 className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">
                                Featured Projects
                            </h2>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3" aria-label={`Project ${active + 1} of ${count}`}>
                                <span className="font-mono text-xs text-white">{pad(active + 1)}</span>
                                <div className="flex gap-1.5" aria-hidden="true">
                                    {projects.map((project, index) => (
                                        <span
                                            key={project.id}
                                            className={`h-1 rounded-full transition-all duration-500 ${
                                                index === active ? 'w-8 bg-cyan-300' : 'w-3 bg-white/15'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="font-mono text-xs text-slate-500">{pad(count)}</span>
                            </div>
                            {hiddenCount > 0 && (
                                <button
                                    type="button"
                                    onClick={onShowAll}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-white"
                                >
                                    <Squares2X2Icon className="h-4 w-4" />
                                    All projects
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export function FeaturedList({ projects, onOpen, animate }) {
    return (
        <div className="space-y-20">
            {projects.map((project, index) => (
                <motion.article
                    key={project.id}
                    initial={animate ? { opacity: 0, y: 32 } : false}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
                >
                    <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : ''}`}>
                        <ProjectVisual project={project} index={index} />
                    </div>
                    <div className="lg:col-span-5">
                        <ProjectContent
                            project={project}
                            index={index}
                            count={projects.length}
                            onOpen={onOpen}
                        />
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
