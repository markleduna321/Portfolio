import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
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
                { name: 'React/Next.js', level: 95 },
                { name: 'TypeScript', level: 90 },
                { name: 'Tailwind CSS', level: 95 },
                { name: 'Redux/Zustand', level: 85 },
                { name: 'Vue.js', level: 80 },
            ],
        },
        {
            id: 2,
            title: 'Backend Development',
            icon: ServerIcon,
            color: 'text-green-600 dark:text-green-400',
            skills: [
                { name: 'Laravel/PHP', level: 90 },
                { name: 'Node.js/Express', level: 85 },
                { name: 'Python/Django', level: 80 },
                { name: 'REST APIs', level: 95 },
                { name: 'GraphQL', level: 75 },
            ],
        },
        {
            id: 3,
            title: 'Mobile Development',
            icon: DevicePhoneMobileIcon,
            color: 'text-purple-600 dark:text-purple-400',
            skills: [
                { name: 'React Native', level: 85 },
                { name: 'Flutter', level: 75 },
                { name: 'iOS/Swift', level: 70 },
                { name: 'Android/Kotlin', level: 70 },
            ],
        },
        {
            id: 4,
            title: 'DevOps & Cloud',
            icon: CloudIcon,
            color: 'text-orange-600 dark:text-orange-400',
            skills: [
                { name: 'Docker', level: 85 },
                { name: 'AWS', level: 80 },
                { name: 'CI/CD', level: 85 },
                { name: 'Kubernetes', level: 70 },
                { name: 'Digital Ocean', level: 90 },
            ],
        },
        {
            id: 5,
            title: 'AI & Machine Learning',
            icon: CpuChipIcon,
            color: 'text-red-600 dark:text-red-400',
            skills: [
                { name: 'OpenAI API', level: 85 },
                { name: 'TensorFlow', level: 75 },
                { name: 'Python ML', level: 80 },
                { name: 'NLP', level: 70 },
            ],
        },
        {
            id: 6,
            title: 'UI/UX Design',
            icon: PaintBrushIcon,
            color: 'text-pink-600 dark:text-pink-400',
            skills: [
                { name: 'Figma', level: 90 },
                { name: 'Adobe XD', level: 85 },
                { name: 'Responsive Design', level: 95 },
                { name: 'User Research', level: 80 },
            ],
        },
    ];

    return (
        <section id="skills" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Skills & Expertise"
                    subtitle="Technologies and tools I work with"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <Card
                                key={category.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${category.color}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className={`${category.color.replace('text-', 'bg-')} h-2 rounded-full transition-all duration-1000`}
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
