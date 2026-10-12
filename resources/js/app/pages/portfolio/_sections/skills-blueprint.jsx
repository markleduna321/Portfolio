import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BLUEPRINT_LABELS, PRE_ROLL, createBlueprintScene } from './skills-blueprint-scene';

const END_HOLD = 0.8;
const SCREENS_PER_CHAPTER = 1.4;
const STAGES = ['Blueprint', 'Render', 'Production'];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0, edge1, value) => {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};
const pad = (value) => String(value).padStart(2, '0');
const stageAt = (f) => (f < 0.1 ? 0 : f < 0.45 ? 1 : 2);

function ChapterText({ category, index, count, progress, active }) {
    const opacity = useTransform(progress, (u) => {
        const f = u - index;
        const enter = index === 0 ? smoothstep(-PRE_ROLL, -0.05, f) : smoothstep(-0.16, 0.04, f);
        const exit = index === count - 1 ? 1 : 1 - smoothstep(0.66, 0.8, f);
        return enter * exit;
    });
    const y = useTransform(progress, (u) => clamp((0.3 - (u - index)) * 70, -60, 60));

    return (
        <motion.article
            aria-hidden={!active}
            style={{ opacity, y }}
            className={`absolute inset-0 flex items-center will-change-transform ${active ? '' : 'pointer-events-none'}`}
        >
            <div className="w-full">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                    <span>Chapter {category.number}</span>
                    <span className="h-px w-8 bg-cyan-300/40" />
                    <span className="text-slate-400">{category.chapter}</span>
                </div>
                <h3 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-[2.75rem] [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-3xl">
                    {category.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-300 [@media(max-height:760px)]:mt-2 [@media(max-height:760px)]:text-[15px]">
                    {category.story}
                </p>

                <dl className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07] [@media(max-height:760px)]:mt-4">
                    {category.groups.map((group) => (
                        <div key={group.title} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 [@media(max-height:760px)]:py-1.5">
                            <dt className="pt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-slate-500">
                                {group.title}
                            </dt>
                            <dd className="flex flex-wrap gap-1.5">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-md border border-cyan-300/15 bg-cyan-300/[0.04] px-2 py-0.5 text-[12.5px] text-slate-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>

                <p className="mt-5 flex gap-3 text-sm leading-relaxed text-slate-400 [@media(max-height:760px)]:mt-3">
                    <span className="mt-2 h-px w-5 shrink-0 bg-cyan-300/60" />
                    <span>
                        <span className="font-semibold text-slate-200">In practice — </span>
                        {category.proof}
                    </span>
                </p>
            </div>
        </motion.article>
    );
}

function CornerMarks() {
    const mark = 'absolute h-5 w-5 border-cyan-300/40';
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-4">
            <span className={`${mark} left-0 top-0 border-l border-t`} />
            <span className={`${mark} right-0 top-0 border-r border-t`} />
            <span className={`${mark} bottom-0 left-0 border-b border-l`} />
            <span className={`${mark} bottom-0 right-0 border-b border-r`} />
        </div>
    );
}

export default function SkillsBlueprint({ categories }) {
    const trackRef = useRef(null);
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const labelRefs = useRef([]);
    const count = categories.length;
    const span = count - 1 + END_HOLD;
    const progress = useMotionValue(-PRE_ROLL);
    const [active, setActive] = useState(0);
    const [stage, setStage] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const track = trackRef.current;
        const stageElement = stageRef.current;
        const blueprint = createBlueprintScene(canvasRef.current);
        if (!track || !stageElement || !blueprint) return undefined;
        setReady(true);

        let frameId = 0;
        let running = false;
        let current = null;
        let last = performance.now();
        let lastActive = -1;
        let lastStage = -1;

        const targetProgress = () => {
            const rect = track.getBoundingClientRect();
            const raw = -rect.top / Math.max(1, rect.height - window.innerHeight);
            return clamp(raw * span, -PRE_ROLL, span);
        };

        const paintLabels = () => {
            const bounds = stageElement.clientWidth;
            blueprint.labelStates.forEach((state, index) => {
                const element = labelRefs.current[index];
                if (!element) return;
                if (state.opacity <= 0.001) {
                    if (element.style.opacity !== '0') element.style.opacity = '0';
                    return;
                }
                if (!element.dataset.width) element.dataset.width = element.firstElementChild.offsetWidth;
                const labelWidth = Number(element.dataset.width);
                let side = state.side;
                if (side === 'right' && state.x + labelWidth > bounds - 16) side = 'left';
                else if (side === 'left' && state.x - labelWidth < 16) side = 'right';
                element.style.opacity = state.opacity.toFixed(3);
                element.style.transform = `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)`;
                if (element.dataset.side !== side) element.dataset.side = side;
            });
        };

        const tick = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const target = targetProgress();
            current = current === null ? target : current + (target - current) * (1 - Math.exp(-dt * 7));
            if (Math.abs(target - current) < 0.0005) current = target;

            progress.set(current);
            blueprint.update(current, now / 1000);
            blueprint.render();
            paintLabels();

            const nextActive = clamp(Math.round(current - 0.15), 0, count - 1);
            if (nextActive !== lastActive) {
                lastActive = nextActive;
                setActive(nextActive);
            }
            const nextStage = stageAt(current - nextActive);
            if (nextStage !== lastStage) {
                lastStage = nextStage;
                setStage(nextStage);
            }

            if (running) frameId = window.requestAnimationFrame(tick);
        };

        const start = () => {
            if (running) return;
            running = true;
            last = performance.now();
            frameId = window.requestAnimationFrame(tick);
        };
        const stop = () => {
            running = false;
            window.cancelAnimationFrame(frameId);
        };

        const resizeObserver = new ResizeObserver(([entry]) => {
            blueprint.resize(entry.contentRect.width, entry.contentRect.height);
            if (!running) {
                blueprint.render();
            }
        });
        resizeObserver.observe(stageElement);

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { rootMargin: '200px 0px' },
        );
        intersectionObserver.observe(track);

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            blueprint.dispose();
        };
    }, [count, progress, span]);

    return (
        <div
            ref={trackRef}
            className="relative bg-[#060a13]"
            style={{ height: `${(span * SCREENS_PER_CHAPTER + 1) * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transform-gpu bg-[radial-gradient(ellipse_60%_70%_at_68%_55%,rgba(14,116,144,0.22),transparent_70%),radial-gradient(ellipse_45%_50%_at_10%_30%,rgba(79,70,229,0.12),transparent_70%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transform-gpu bg-[linear-gradient(to_right,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:120px_120px,120px_120px,24px_24px,24px_24px] [mask-image:radial-gradient(ellipse_at_60%_55%,black_30%,transparent_85%)]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060a13] to-transparent" />

                <div className="absolute inset-x-0 top-16 z-30 h-16">
                    <div className="mx-auto flex h-full w-full max-w-[1560px] items-center justify-between px-10">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-gradient-to-r from-cyan-300 to-indigo-400" />
                            <h2 className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">
                                Skills &amp; Expertise
                            </h2>
                        </div>
                        <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em]" aria-label="Build stage">
                            {STAGES.map((label, index) => (
                                <li key={label} className="flex items-center gap-2">
                                    {index > 0 && <span className="h-px w-6 bg-white/10" />}
                                    <span
                                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-500 ${
                                            index === stage
                                                ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-200'
                                                : index < stage
                                                  ? 'border-white/10 text-slate-400'
                                                  : 'border-white/5 text-slate-600'
                                        }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                index === stage ? 'bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]' : 'bg-current'
                                            }`}
                                        />
                                        {label}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 top-32">
                    <div className="relative mx-auto h-full w-full max-w-[1560px] px-10">
                        <div className="relative h-full w-[38%] max-w-[560px] pb-10">
                            {categories.map((category, index) => (
                                <ChapterText
                                    key={category.id}
                                    category={category}
                                    index={index}
                                    count={count}
                                    progress={progress}
                                    active={index === active}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div ref={stageRef} className="absolute bottom-0 right-0 top-32 left-[40%]">
                    <canvas
                        ref={canvasRef}
                        aria-hidden="true"
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <CornerMarks />

                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        {BLUEPRINT_LABELS.map((label, index) => (
                            <div
                                key={label.text}
                                ref={(element) => {
                                    labelRefs.current[index] = element;
                                }}
                                data-side="right"
                                className="group absolute left-0 top-0 opacity-0 will-change-transform"
                            >
                                <div className="flex items-center group-data-[side=left]:-translate-x-full group-data-[side=left]:flex-row-reverse">
                                    <span className="relative -ml-1 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.95)] group-data-[side=left]:-mr-1 group-data-[side=left]:ml-0" />
                                    <span className={`h-px bg-gradient-to-r from-cyan-300/80 to-cyan-300/20 group-data-[side=left]:bg-gradient-to-l ${label.small ? 'w-5' : 'w-10'}`} />
                                    <span
                                        className={`whitespace-nowrap rounded-md border border-cyan-300/25 bg-[#071426]/85 font-mono uppercase tracking-[0.14em] text-cyan-100 ${
                                            label.small ? 'px-1.5 py-0.5 text-[9.5px]' : 'px-2.5 py-1 text-[10.5px]'
                                        }`}
                                    >
                                        {label.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pointer-events-none absolute bottom-8 right-10 grid grid-cols-[auto_auto] border border-cyan-300/20 bg-[#060d1a]/70 font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">
                        <span className="border-b border-r border-cyan-300/15 px-3 py-1.5">Sheet</span>
                        <span className="border-b border-cyan-300/15 px-3 py-1.5 text-cyan-200">
                            {pad(active + 1)} / {pad(count)}
                        </span>
                        <span className="border-b border-r border-cyan-300/15 px-3 py-1.5">System</span>
                        <span className="border-b border-cyan-300/15 px-3 py-1.5 text-slate-300">
                            {categories[active].model}
                        </span>
                        <span className="border-r border-cyan-300/15 px-3 py-1.5">Drawn by</span>
                        <span className="px-3 py-1.5 text-slate-300">M. H. Leduna</span>
                    </div>
                </div>

                <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {categories.map((category, index) => (
                        <span
                            key={category.id}
                            className={`h-1 rounded-full transition-all duration-500 ${
                                index === active ? 'w-10 bg-cyan-300' : 'w-4 bg-white/15'
                            }`}
                        />
                    ))}
                </div>
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[calc(100%-2px)] h-[calc(8rem+2px)] bg-gradient-to-b from-[#060a13] to-transparent"
            />
        </div>
    );
}
