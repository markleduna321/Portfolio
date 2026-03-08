import { useState } from 'react';
import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import {
    CodeBracketIcon,
    StarIcon,
    CommandLineIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function GitHubSection() {
    const [activeTab, setActiveTab] = useState('repositories');

    // Mock GitHub data - will be replaced with real API data
    const stats = {
        totalRepos: 42,
        totalStars: 328,
        totalCommits: 1847,
        contributionsThisYear: 892,
    };

    const repositories = [
        {
            id: 1,
            name: 'awesome-react-components',
            description: 'A collection of reusable React components with TypeScript support',
            language: 'TypeScript',
            stars: 156,
            forks: 23,
            updatedAt: '2 days ago',
            topics: ['react', 'typescript', 'components', 'ui'],
        },
        {
            id: 2,
            name: 'laravel-api-boilerplate',
            description: 'Production-ready Laravel API boilerplate with authentication and testing',
            language: 'PHP',
            stars: 89,
            forks: 15,
            updatedAt: '1 week ago',
            topics: ['laravel', 'api', 'rest', 'authentication'],
        },
        {
            id: 3,
            name: 'ai-content-generator',
            description: 'AI-powered content generation tool using GPT-4',
            language: 'Python',
            stars: 52,
            forks: 8,
            updatedAt: '3 days ago',
            topics: ['ai', 'gpt-4', 'content', 'openai'],
        },
        {
            id: 4,
            name: 'task-management-app',
            description: 'Real-time task management with drag-and-drop and collaboration',
            language: 'JavaScript',
            stars: 31,
            forks: 6,
            updatedAt: '5 days ago',
            topics: ['react', 'socket-io', 'real-time', 'task-management'],
        },
    ];

    const contributions = [
        {
            id: 1,
            repo: 'facebook/react',
            type: 'Pull Request',
            title: 'Fix: Memory leak in useEffect cleanup',
            status: 'merged',
            date: '1 week ago',
        },
        {
            id: 2,
            repo: 'laravel/framework',
            type: 'Issue',
            title: 'Feature request: Add support for custom validation rules',
            status: 'open',
            date: '2 weeks ago',
        },
        {
            id: 3,
            repo: 'tailwindlabs/tailwindcss',
            type: 'Pull Request',
            title: 'Add new utility classes for grid layouts',
            status: 'merged',
            date: '1 month ago',
        },
        {
            id: 4,
            repo: 'vercel/next.js',
            type: 'Issue',
            title: 'Bug: Hydration error in development mode',
            status: 'closed',
            date: '1 month ago',
        },
    ];

    const activity = [
        { date: '2024-03-08', count: 5 },
        { date: '2024-03-07', count: 8 },
        { date: '2024-03-06', count: 3 },
        { date: '2024-03-05', count: 12 },
        { date: '2024-03-04', count: 7 },
        { date: '2024-03-03', count: 0 },
        { date: '2024-03-02', count: 0 },
        { date: '2024-03-01', count: 6 },
    ];

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: 'bg-yellow-400',
            TypeScript: 'bg-blue-600',
            Python: 'bg-green-600',
            PHP: 'bg-purple-600',
            Java: 'bg-red-600',
            Go: 'bg-cyan-600',
        };
        return colors[language] || 'bg-gray-600';
    };

    const getStatusColor = (status) => {
        const colors = {
            merged: 'success',
            open: 'warning',
            closed: 'secondary',
        };
        return colors[status] || 'secondary';
    };

    return (
        <section id="github" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="GitHub Activity"
                    subtitle="My open source contributions and projects"
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <Card className="text-center">
                        <CodeBracketIcon className="h-10 w-10 mx-auto mb-3 text-primary-600" />
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stats.totalRepos}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Repositories</p>
                    </Card>
                    <Card className="text-center">
                        <StarIcon className="h-10 w-10 mx-auto mb-3 text-yellow-500" />
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stats.totalStars}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Stars</p>
                    </Card>
                    <Card className="text-center">
                        <CommandLineIcon className="h-10 w-10 mx-auto mb-3 text-green-600" />
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stats.totalCommits}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Commits</p>
                    </Card>
                    <Card className="text-center">
                        <ClockIcon className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stats.contributionsThisYear}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">This Year</p>
                    </Card>
                </div>

                {/* Contribution Graph */}
                <Card className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Recent Activity
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {activity.map((day, index) => (
                            <div key={index} className="flex flex-col items-center gap-1 min-w-fit">
                                <div
                                    className={`
                                        w-8 h-8 rounded
                                        ${day.count === 0 ? 'bg-gray-200 dark:bg-gray-700' :
                                          day.count <= 3 ? 'bg-green-200 dark:bg-green-900' :
                                          day.count <= 6 ? 'bg-green-400 dark:bg-green-700' :
                                          day.count <= 9 ? 'bg-green-600 dark:bg-green-600' :
                                          'bg-green-800 dark:bg-green-500'}
                                        transition-colors hover:ring-2 hover:ring-primary-500
                                    `}
                                    title={`${day.count} contributions on ${day.date}`}
                                ></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(day.date).getDate()}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('repositories')}
                        className={`
                            px-4 py-2 font-semibold transition-colors border-b-2
                            ${activeTab === 'repositories'
                                ? 'text-primary-600 dark:text-primary-400 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                            }
                        `}
                    >
                        Popular Repositories
                    </button>
                    <button
                        onClick={() => setActiveTab('contributions')}
                        className={`
                            px-4 py-2 font-semibold transition-colors border-b-2
                            ${activeTab === 'contributions'
                                ? 'text-primary-600 dark:text-primary-400 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
                            }
                        `}
                    >
                        Open Source Contributions
                    </button>
                </div>

                {/* Repositories Tab */}
                {activeTab === 'repositories' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {repositories.map((repo) => (
                            <Card key={repo.id}>
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <CodeBracketIcon className="h-5 w-5" />
                                        {repo.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm">{repo.stars}</span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {repo.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.topics.map((topic) => (
                                        <Badge key={topic} color="secondary">
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                                        <span>{repo.language}</span>
                                    </div>
                                    <span>Updated {repo.updatedAt}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Contributions Tab */}
                {activeTab === 'contributions' && (
                    <div className="space-y-4">
                        {contributions.map((contribution) => (
                            <Card key={contribution.id}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge color="secondary">{contribution.type}</Badge>
                                            <Badge color={getStatusColor(contribution.status)}>
                                                {contribution.status}
                                            </Badge>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                            {contribution.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {contribution.repo}
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {contribution.date}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* GitHub Profile Link */}
                <div className="mt-12 text-center">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View Full GitHub Profile
                    </a>
                </div>
            </div>
        </section>
    );
}
