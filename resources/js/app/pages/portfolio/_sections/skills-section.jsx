import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import { motion } from 'framer-motion';
import {
    CodeBracketIcon,
    ServerIcon,
    DevicePhoneMobileIcon,
    CloudIcon,
    CpuChipIcon,
    PaintBrushIcon,
} from '@heroicons/react/24/outline';

export default function SkillsSection() {
    const skillCategories = [
        {
            id: 1,
            title: 'Frontend Development',
            icon: CodeBracketIcon,
            color: 'text-blue-600 dark:text-blue-400',
            skills: [
                { name: 'React', level: 90 },
                { name: 'Tailwind CSS', level: 95 },
                { name: 'Redux Toolkit', level: 85 },
                { name: 'Inertia.js', level: 85 },
                { name: 'JavaScript/TypeScript', level: 90 },
            ],
        },
        {
            id: 2,
            title: 'Backend Development',
            icon: ServerIcon,
            color: 'text-green-600 dark:text-green-400',
            skills: [
                { name: 'Laravel/PHP', level: 90 },
                { name: 'Node.js', level: 85 },
                { name: 'FastAPI/Python', level: 85 },
                { name: 'REST APIs', level: 90 },
                { name: 'WebSocket', level: 85 },
            ],
        },
        {
            id: 3,
            title: 'Mobile Development',
            icon: DevicePhoneMobileIcon,
            color: 'text-purple-600 dark:text-purple-400',
            skills: [
                { name: 'Android (Java)', level: 85 },
                { name: 'Flutter', level: 80 },
                { name: 'Android Studio', level: 85 },
                { name: 'Android SDK', level: 80 },
                { name: 'Mobile UI/UX', level: 85 },
            ],
        },
        {
            id: 4,
            title: 'Database & Tools',
            icon: CloudIcon,
            color: 'text-orange-600 dark:text-orange-400',
            skills: [
                { name: 'MySQL', level: 90 },
                { name: 'PostgreSQL', level: 85 },
                { name: 'SQLite', level: 85 },
                { name: 'Git/GitHub', level: 90 },
                { name: 'Vite', level: 85 },
            ],
        },
        {
            id: 5,
            title: 'AI & Integration',
            icon: CpuChipIcon,
            color: 'text-red-600 dark:text-red-400',
            skills: [
                { name: 'OpenAI API', level: 90 },
                { name: 'Twilio Integration', level: 85 },
                { name: 'Google Maps API', level: 80 },
                { name: 'Python Automation', level: 85 },
            ],
        },
        {
            id: 6,
            title: 'UI/UX & Design',
            icon: PaintBrushIcon,
            color: 'text-pink-600 dark:text-pink-400',
            skills: [
                { name: 'Figma', level: 90 },
                { name: 'Design Systems', level: 85 },
                { name: 'Prototyping', level: 85 },
                { name: 'Chart.js', level: 85 },
            ],
        },
    ];

    return (
        <section id="skills" className="py-20 relative bg-white/50 dark:bg-gray-800/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Skills & Expertise"
                        subtitle="Technologies and tools I work with"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <motion.div whileHover={{ y: -5 }}>
                                    <Card className="h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/20 group hover:border-primary-500/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-900 group-hover:scale-110 transition-transform ${category.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {category.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-5">
                                            {category.skills.map((skill, skillIndex) => (
                                                <div key={skill.name}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {skill.name}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            {skill.level}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden relative">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.level}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.2 + (skillIndex * 0.1), type: "spring", bounce: 0.2 }}
                                                            className={`${category.color.replace('text-', 'bg-')} h-full rounded-full absolute left-0 top-0`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
