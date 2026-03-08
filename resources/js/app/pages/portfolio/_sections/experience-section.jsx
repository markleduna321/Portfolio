import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import { BriefcaseIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function ExperienceSection() {
    const experiences = [
        {
            id: 1,
            company: 'Tech Innovations Inc.',
            position: 'Senior Full Stack Developer',
            period: '2022 - Present',
            location: 'San Francisco, CA',
            description: 'Leading development of enterprise applications and mentoring junior developers.',
            achievements: [
                'Led a team of 5 developers in building a microservices architecture',
                'Improved application performance by 60% through optimization',
                'Implemented CI/CD pipelines reducing deployment time by 80%',
                'Mentored 3 junior developers into mid-level positions',
            ],
            technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
            type: 'full-time',
        },
        {
            id: 2,
            company: 'Digital Solutions Ltd.',
            position: 'Full Stack Developer',
            period: '2020 - 2022',
            location: 'Remote',
            description: 'Developed and maintained multiple client-facing web applications.',
            achievements: [
                'Built 15+ responsive web applications from scratch',
                'Reduced bug reports by 40% through comprehensive testing',
                'Collaborated with UX team to improve user satisfaction by 35%',
                'Integrated third-party APIs and payment systems',
            ],
            technologies: ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS'],
            type: 'full-time',
        },
        {
            id: 3,
            company: 'StartUp Ventures',
            position: 'Frontend Developer',
            period: '2019 - 2020',
            location: 'New York, NY',
            description: 'Focused on creating modern, responsive user interfaces.',
            achievements: [
                'Redesigned company website increasing conversions by 45%',
                'Implemented responsive design across all platforms',
                'Reduced page load time by 50% through optimization',
                'Created reusable component library used across 10+ projects',
            ],
            technologies: ['React', 'TypeScript', 'SCSS', 'Redux'],
            type: 'full-time',
        },
        {
            id: 4,
            company: 'Freelance',
            position: 'Web Developer',
            period: '2018 - 2019',
            location: 'Remote',
            description: 'Provided web development services to various clients.',
            achievements: [
                'Completed 30+ client projects successfully',
                'Maintained 5-star rating across all projects',
                'Built long-term relationships with 10+ recurring clients',
                'Specialized in e-commerce and business websites',
            ],
            technologies: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
            type: 'freelance',
        },
    ];

    const education = [
        {
            id: 1,
            institution: 'University of Technology',
            degree: 'Bachelor of Science in Computer Science',
            period: '2014 - 2018',
            description: 'Focus on Software Engineering and Web Development',
            achievements: [
                'Graduated with Honors (3.8 GPA)',
                'President of Computer Science Club',
                'Published research on web performance optimization',
            ],
        },
        {
            id: 2,
            institution: 'Tech Academy',
            degree: 'Full Stack Web Development Bootcamp',
            period: '2017',
            description: 'Intensive program covering modern web technologies',
            achievements: [
                'Top 5% of graduating class',
                'Built 10+ full-stack applications',
                'Received Job-Ready certification',
            ],
        },
    ];

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Experience & Education"
                    subtitle="My professional journey and qualifications"
                />

                {/* Work Experience */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                        <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                        Work Experience
                    </h3>
                    
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <Card
                                key={exp.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                                hover={false}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {exp.position}
                                        </h4>
                                        <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-2">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <CalendarIcon className="h-5 w-5" />
                                            <span>{exp.period}</span>
                                        </div>
                                        <Badge color={exp.type === 'full-time' ? 'success' : 'secondary'}>
                                            {exp.type === 'full-time' ? 'Full-time' : 'Freelance'}
                                        </Badge>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {exp.description}
                                </p>

                                <div className="mb-4">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Key Achievements:
                                    </h5>
                                    <ul className="space-y-1">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="text-primary-600 mr-2">•</span>
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {achievement}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <Badge key={tech} color="primary">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                        <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Education
                    </h3>
                    
                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <Card
                                key={edu.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${(experiences.length + index) * 100}ms` }}
                                hover={false}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                            {edu.institution}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <CalendarIcon className="h-5 w-5" />
                                        <span>{edu.period}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {edu.description}
                                </p>

                                <ul className="space-y-1">
                                    {edu.achievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-primary-600 mr-2">•</span>
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {achievement}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
