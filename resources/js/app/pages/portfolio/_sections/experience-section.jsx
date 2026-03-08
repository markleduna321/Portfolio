import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function ExperienceSection() {
    const timeline = [
        {
            id: 1,
            category: 'work',
            company: 'Freelance',
            position: 'Full-Stack Developer',
            period: 'March 2020 – Present',
            location: 'Remote',
            description: 'Providing comprehensive full-stack development services for enterprise clients, government agencies, and businesses.',
            achievements: [
                'Automation System: Designed and developed internal automation systems to streamline HR, operations, and reporting workflows',
                'Built secure role-based access controls and audit logging features',
                'Government Census & Assistance Tracking System: Engineered a geo-tagged census system with resident validation and assistance tracking',
                'Implemented dynamic reporting dashboards and database optimization',
                'Inventory & Job Order Workflow System: Developed custom workflow automation platform for inventory management and job tracking',
                'Cross-Platform E-Learning Mobile Application: Built mobile learning platform with authentication and quiz modules',
                'Developed REST APIs for internal system integration and content management',
                'Implemented responsive UI using React and Tailwind CSS',
                'Reduced manual operational tasks through structured workflow automation',
            ],
            technologies: ['React', 'Laravel', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'FastAPI', 'Android', 'REST APIs'],
            type: 'freelance',
        },
        {
            id: 2,
            category: 'work',
            company: 'Raz Pharmaceuticals Products & Trading',
            position: 'IT Officer',
            period: 'January 2021 – March 2022',
            location: 'On-site',
            description: 'Managed and developed IT infrastructure and custom business systems for pharmaceutical operations.',
            achievements: [
                'System Architecture: Architected a custom web-based system to streamline core business operations',
                'Infrastructure: Established and configured the company\'s complete IT infrastructure, including network hardware and workstations',
                'Implemented end-to-end IT support and maintenance protocols',
                'Optimized business workflows through custom software solutions',
            ],
            technologies: ['Web Development', 'Network Infrastructure', 'System Architecture', 'IT Support'],
            type: 'full-time',
        },
        {
            id: 3,
            category: 'education',
            institution: 'Udemy',
            degree: 'QA Software Testing Training Course',
            period: 'Completed',
            description: 'Comprehensive training on Quality Assurance and Software Testing methodologies',
            achievements: [
                'Software Testing Fundamentals and Best Practices',
                'Test Case Design and Execution',
                'Bug Tracking and Reporting',
                'Quality Assurance Methodologies',
            ],
            certificateImage: '/images/certificates/Software QA.pdf',
            courseUrl: 'https://www.udemy.com/course/qa-software-testing-training-course/',
        },
    ];

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Experience & Education"
                    subtitle="My professional journey and learning achievements"
                />

                <div className="space-y-6">
                    {timeline.map((item, index) => (
                        <Card
                            key={item.id}
                            className="animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                            hover={false}
                        >
                            {item.category === 'work' ? (
                                <>
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {item.position}
                                            </h4>
                                            <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                                {item.company}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <CalendarIcon className="h-5 w-5" />
                                                <span>{item.period}</span>
                                            </div>
                                            <Badge color={item.type === 'full-time' ? 'success' : 'secondary'}>
                                                {item.type === 'full-time' ? 'Full-time' : 'Freelance'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {item.description}
                                    </p>

                                    <div className="mb-4">
                                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Key Achievements:
                                        </h5>
                                        <ul className="space-y-1">
                                            {item.achievements.map((achievement, idx) => (
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
                                        {item.technologies.map((tech) => (
                                            <Badge key={tech} color="primary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {item.degree}
                                                </h4>
                                            </div>
                                            <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                                {item.institution}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <CalendarIcon className="h-5 w-5" />
                                                <span>{item.period}</span>
                                            </div>
                                            <Badge color="info">Education</Badge>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {item.description}
                                    </p>

                                    {item.achievements && item.achievements.length > 0 && (
                                        <div className="mb-4">
                                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                Key Topics:
                                            </h5>
                                            <ul className="space-y-1">
                                                {item.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="text-primary-600 mr-2">•</span>
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            {achievement}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {item.certificateImage && (
                                        <div className="mb-4">
                                            {item.certificateImage.endsWith('.pdf') ? (
                                                <a
                                                    href={item.certificateImage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                                                >
                                                    <svg className="h-12 w-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                    </svg>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 dark:text-white">View Certificate</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Click to view PDF certificate</p>
                                                    </div>
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <img
                                                    src={item.certificateImage}
                                                    alt={`${item.degree} Certificate`}
                                                    className="w-full max-w-2xl rounded-lg border border-gray-200 dark:border-gray-700"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {item.courseUrl && (
                                        <a
                                            href={item.courseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Course on Udemy
                                        </a>
                                    )}
                                </>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
