import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import {
    CodeBracketIcon,
    StarIcon,
    CommandLineIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const GITHUB_USERNAME = 'markleduna321';

export default function GitHubSection() {
    const [loading, setLoading] = useState(true);
    const [repositories, setRepositories] = useState([]);
    const [stats, setStats] = useState({
        totalRepos: 0,
        totalStars: 0,
        totalCommits: 0,
        contributionsThisYear: 0,
    });

    useEffect(() => {
        fetchGitHubData();
    }, []);

    const fetchGitHubData = async () => {
        try {
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            const userData = await userResponse.json();

            // Fetch repositories
            const reposResponse = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
            );
            const reposData = await reposResponse.json();

            // Calculate total stars
            const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);

            // Format repositories data
            const formattedRepos = reposData.map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                language: repo.language || 'Unknown',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: formatDate(repo.updated_at),
                topics: repo.topics || [],
                url: repo.html_url,
            }));

            setRepositories(formattedRepos);
            setStats({
                totalRepos: userData.public_repos,
                totalStars: totalStars,
                totalCommits: reposData.length * 50, // Estimate
                contributionsThisYear: userData.public_repos * 20, // Estimate
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: 'bg-yellow-400',
            TypeScript: 'bg-blue-600',
            Python: 'bg-green-600',
            PHP: 'bg-purple-600',
            Java: 'bg-red-600',
            Go: 'bg-cyan-600',
            C: 'bg-gray-700',
            'C++': 'bg-pink-600',
            Ruby: 'bg-red-500',
            Rust: 'bg-orange-600',
        };
        return colors[language] || 'bg-gray-600';
    };

    return (
        <section id="github" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary-50 dark:bg-primary-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="GitHub Activity"
                        subtitle={`Latest repositories from @${GITHUB_USERNAME}`}
                    />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <Card className="text-center h-full bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <CodeBracketIcon className="h-10 w-10 mx-auto mb-3 text-primary-600 dark:text-primary-400" />
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                                {loading ? '...' : stats.totalRepos}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Repositories</p>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <Card className="text-center h-full bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <StarIcon className="h-10 w-10 mx-auto mb-3 text-yellow-500" />
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                                {loading ? '...' : stats.totalStars}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Stars</p>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <Card className="text-center h-full bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <CommandLineIcon className="h-10 w-10 mx-auto mb-3 text-green-600 dark:text-green-400" />
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                                {loading ? '...' : stats.totalCommits}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Est. Commits</p>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                        <Card className="text-center h-full bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <ClockIcon className="h-10 w-10 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                                {loading ? '...' : repositories.length}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Recent Repos</p>
                        </Card>
                    </motion.div>
                </div>

                {/* Repositories Section */}
                <div className="mb-8">
                    <motion.h3 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2"
                    >
                        <span className="w-8 h-1 bg-primary-500 rounded-full"></span>
                        Latest Repositories
                    </motion.h3>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading GitHub repositories...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {repositories.map((repo, index) => (
                                <motion.a
                                    key={repo.id}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:border-primary-500/50 shadow-sm group-hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                <CodeBracketIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-500" />
                                                {repo.name}
                                            </h4>
                                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-800">
                                                <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{repo.stars}</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">
                                            {repo.description}
                                        </p>

                                        {repo.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {repo.topics.slice(0, 4).map((topic) => (
                                                    <Badge key={topic} color="secondary" className="bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                            <div className="flex items-center gap-4">
                                                {repo.language && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)} shadow-sm`}></span>
                                                        <span>{repo.language}</span>
                                                    </div>
                                                )}
                                                <span><span className="opacity-70 text-[10px]">⑂</span> {repo.forks}</span>
                                            </div>
                                            <span>{repo.updatedAt}</span>
                                        </div>
                                    </Card>
                                </motion.a>
                            ))}
                        </div>
                    )}
                    
                    {!loading && repositories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-400">No repositories found</p>
                        </div>
                    )}
                </div>

                {/* GitHub Profile Link */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl font-medium"
                    >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View Full GitHub Profile
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
