import SectionTitle from '../../components/section-title';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from './featured-showcase';
import SkillsBlueprint from './skills-blueprint';
import {
    CpuChipIcon,
    CodeBracketIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const skillCategories = [
    {
        id: 'systems',
        number: '01',
        title: 'Systems Architecture & Automation',
        chapter: 'Foundation',
        model: 'Network & automation rig',
        story: 'Every dependable system starts with the network underneath it. I design secure, self-healing infrastructure and automate the work that keeps it running.',
        description: 'Designing resilient infrastructure and automating the systems businesses rely on.',
        icon: CpuChipIcon,
        size: 'lg:col-span-7 lg:row-span-2',
        groups: [
            {
                title: 'Infrastructure Automation',
                skills: ['CI/CD Pipelines', 'Python Automation', 'Automated BDR Triggers'],
            },
            {
                title: 'Hardware & IoT Integration',
                skills: ['ESP32', 'Wi-Fi CSI Sensing'],
            },
            {
                title: 'Enterprise Networking',
                skills: [
                    'OPNsense',
                    'Sophos XGS',
                    'Peplink SD-WAN',
                    'VLAN Segmentation',
                    'Ubiquiti Wireless Bridges',
                ],
            },
        ],
        proof: 'Planned and orchestrated the EmpireOneCx ERP from the ground up, turning business needs into a coordinated system delivery.',
    },
    {
        id: 'full-stack',
        number: '02',
        title: 'Full-Stack Software Engineering',
        chapter: 'Application',
        model: 'Multi-tier app stack',
        story: 'On top of that foundation I build the applications people use every day, from the database layer to the interface.',
        description: 'Building multi-tier applications from data layer to user experience.',
        icon: CodeBracketIcon,
        size: 'lg:col-span-5',
        groups: [
            {
                title: 'Core Stack',
                skills: ['Laravel', 'React', 'Redux Toolkit', 'Inertia.js', 'Tailwind CSS'],
            },
            {
                title: 'Languages & Data',
                skills: ['PHP', 'JavaScript / TypeScript', 'Python', 'C#', 'PostgreSQL', 'MySQL'],
            },
            {
                title: 'Application Architecture',
                skills: ['Multi-Tier Applications', 'REST APIs', 'WebSockets'],
            },
        ],
        proof: 'Built the Skybridge BPO Solutions HRIS with Laravel and React, adding OpenAI integration to the application.',
    },
    {
        id: 'ai-security',
        number: '03',
        title: 'AI, Vision & Data Integration',
        chapter: 'Intelligence',
        model: 'AI & security core',
        story: 'Then I teach the system to see, reason, and stay secure, wiring intelligent models and enterprise identity into the core.',
        description: 'Connecting intelligent models, external services, and secure enterprise operations.',
        icon: ShieldCheckIcon,
        size: 'lg:col-span-5',
        groups: [
            {
                title: 'Machine Learning & Vision',
                skills: ['Custom YOLO Models', 'Real-Time Event Detection', 'Ollama', 'Odysseus'],
            },
            {
                title: 'API Orchestration',
                skills: ['OpenAI API', 'Twilio', 'Google Maps API'],
            },
            {
                title: 'Security & GRC',
                skills: [
                    'SOC 2 & PCI DSS Readiness',
                    'Security by Design',
                    'Active Directory',
                    'Microsoft 365 Identity',
                ],
            },
        ],
        proof: 'Applied specialized engineering to custom YOLO event detection and Wi-Fi Channel State Information sensing.',
    },
];

export default function SkillsSection() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const reduceMotion = useReducedMotion();

    if (isDesktop && !reduceMotion) {
        return (
            <section id="skills" className="relative z-10">
                <SkillsBlueprint categories={skillCategories} />
            </section>
        );
    }

    return (
        <section id="skills" className="relative overflow-hidden bg-slate-50 py-24 dark:bg-[#060a13]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-200/60 via-transparent to-transparent dark:from-gray-800/40" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Skills & Expertise"
                        subtitle="Architecture, automation, and software engineering for dependable, intelligent systems."
                    />
                </motion.div>

                <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <motion.article
                                key={category.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/[0.08] dark:bg-[#080d18] dark:hover:border-white/20 dark:hover:shadow-black/20 sm:p-8 ${category.size}`}
                            >
                                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-80 transition-opacity group-hover:opacity-100 dark:from-gray-800/70" />

                                <div className="relative">
                                    <div className="mb-8 flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200">
                                                <Icon className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-slate-400 dark:text-gray-500">
                                                    {category.number} / EXPERTISE
                                                </p>
                                                <h3 className="text-xl font-bold leading-snug text-slate-950 dark:text-white sm:text-2xl">
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mb-7 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                                        {category.description}
                                    </p>

                                    <div className="space-y-6">
                                        {category.groups.map((group) => (
                                            <div key={group.title}>
                                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-gray-500">
                                                    {group.title}
                                                </h4>
                                                <ul className="flex flex-wrap gap-2">
                                                    {group.skills.map((skill) => (
                                                        <li
                                                            key={skill}
                                                            className="rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/[0.02] dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                                                        >
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 border-t border-slate-200 pt-5 dark:border-gray-800">
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-gray-500">
                                            In practice
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                                            {category.proof}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
