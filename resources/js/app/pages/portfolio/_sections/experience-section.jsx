import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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
        <section id="experience" className="py-20 relative bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 dark:opacity-10 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Experience & Education"
                        subtitle="My professional journey and learning achievements"
                    />
                </motion.div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-500/30 before:to-transparent">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-primary-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 ml-0 md:ml-auto md:mr-auto">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            
                            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-100 dark:border-gray-700 hover:border-primary-500/30 shadow-md hover:shadow-xl transition-all duration-300">
                                {item.category === 'work' ? (
                                    <>
                                        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-4 gap-2">
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {item.position}
                                                </h4>
                                                <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-2">
                                                    {item.company}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-start xl:items-end gap-2">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    <span>{item.period}</span>
                                                </div>
                                                <Badge color={item.type === 'full-time' ? 'success' : 'primary'}>
                                                    {item.type === 'full-time' ? 'Full-time' : 'Freelance'}
                                                </Badge>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed text-sm xl:text-base">
                                            {item.description}
                                        </p>

                                        <div className="mb-5 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                            <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm xl:text-base">
                                                Key Achievements
                                            </h5>
                                            <ul className="space-y-2">
                                                {item.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="text-primary-500 mr-3 mt-1 text-xs">◆</span>
                                                        <span className="text-gray-600 dark:text-gray-300 text-sm xl:text-base">
                                                            {achievement}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {item.technologies.map((tech) => (
                                                <Badge key={tech} color="primary" className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-4 gap-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                            <div className="flex flex-col items-start xl:items-end gap-2">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm border dark:border-gray-700 px-3 py-1 rounded-full">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    <span>{item.period}</span>
                                                </div>
                                                <Badge color="info">Education</Badge>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed text-sm xl:text-base">
                                            {item.description}
                                        </p>

                                        {item.achievements && item.achievements.length > 0 && (
                                            <div className="mb-5 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm xl:text-base">
                                                    Key Topics
                                                </h5>
                                                <ul className="space-y-2 text-sm xl:text-base">
                                                    {item.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <span className="text-info-500 mr-3 mt-1 text-xs">◆</span>
                                                            <span className="text-gray-600 dark:text-gray-300">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-4 items-center">
                                            {item.certificateImage && (
                                                item.certificateImage.endsWith('.pdf') ? (
                                                    <a
                                                        href={item.certificateImage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border-2 border-red-50 dark:border-red-900/20 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm"
                                                    >
                                                        <svg className="h-10 w-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                        </svg>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">View Certificate</p>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <img
                                                        src={item.certificateImage}
                                                        alt={`${item.degree} Certificate`}
                                                        className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                                                    />
                                                )
                                            )}

                                            {item.courseUrl && (
                                                <a
                                                    href={item.courseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all shadow-md text-sm font-medium"
                                                >
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    View Course
                                                </a>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
