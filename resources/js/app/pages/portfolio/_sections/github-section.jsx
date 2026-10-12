import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, StarIcon } from '@heroicons/react/24/outline';

const GITHUB_USERNAME = 'markleduna321';
const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const RECENT_COUNT = 6;

const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    PHP: '#777bb4',
    Python: '#3572a5',
    'C#': '#178600',
    Java: '#b07219',
    Dart: '#00b4ab',
    HTML: '#e34c26',
    CSS: '#663399',
    Blade: '#f7523f',
    Go: '#00add8',
    Rust: '#dea584',
};
const OTHER_COLOR = '#64748b';

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function formatRelative(dateString) {
    const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
    if (days < 1) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} wk ago`;
    if (days < 365) return `${Math.floor(days / 30)} mo ago`;
    return `${Math.floor(days / 365)} yr ago`;
}

function languageBreakdown(repos) {
    const counts = {};
    repos.forEach((repo) => {
        if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
    });
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    if (!total) return [];

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const rest = sorted.slice(5).reduce((sum, [, value]) => sum + value, 0);
    if (rest) top.push(['Other', rest]);

    return top.map(([name, value]) => ({
        name,
        share: (value / total) * 100,
        color: LANGUAGE_COLORS[name] || OTHER_COLOR,
    }));
}

function GitHubMark({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}

function StatCell({ label, value, loading }) {
    return (
        <div className="px-6 py-7 sm:px-8">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</dt>
            <dd className="mt-3 text-4xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
                {loading ? <span className="inline-block h-9 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-white/[0.06]" /> : value}
            </dd>
        </div>
    );
}

function LanguageFootprint({ languages, loading }) {
    return (
        <div className="px-6 py-7 sm:px-8">
            <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Language footprint</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">by repository</span>
            </div>
            <div className="mt-5 flex h-2 w-full gap-[3px] overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.05]">
                {!loading &&
                    languages.map((language, index) => (
                        <motion.span
                            key={language.name}
                            className="h-full first:rounded-l-full last:rounded-r-full"
                            style={{ backgroundColor: language.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${language.share}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                    ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                {languages.map((language) => (
                    <li key={language.name} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: language.color }} />
                        {language.name}
                        <span className="font-mono text-xs tabular-nums text-slate-400 dark:text-slate-500">
                            {language.share.toFixed(0)}%
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RepoCard({ repo, index }) {
    const trackPointer = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
    };

    return (
        <motion.a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={trackPointer}
            className="group relative flex min-h-[172px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-cyan-500/40 dark:border-white/[0.07] dark:bg-white/[0.02] dark:shadow-none dark:hover:border-cyan-300/30"
            {...reveal}
            transition={{ ...reveal.transition, delay: (index % 3) * 0.08 }}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgba(34, 211, 238, 0.09), transparent 60%)',
                }}
            />

            <div className="relative flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400 dark:text-slate-600">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <ArrowUpRightIcon className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500 dark:text-slate-600 dark:group-hover:text-cyan-300" />
            </div>

            <h4 className="relative mb-6 mt-5 break-words text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200">
                {repo.name}
            </h4>
            {repo.description && (
                <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {repo.description}
                </p>
            )}
            {repo.topics.length > 0 && (
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 3).map((topic) => (
                        <span
                            key={topic}
                            className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-white/[0.08] dark:text-slate-400"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            )}

            <div className="relative mt-auto flex items-center gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-white/[0.06]">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || OTHER_COLOR }}
                        />
                        {repo.language}
                    </span>
                )}
                {repo.stars > 0 && (
                    <span className="flex items-center gap-1 tabular-nums">
                        <StarIcon className="h-3.5 w-3.5" />
                        {repo.stars}
                    </span>
                )}
                <span className="ml-auto font-mono text-[11px]">{repo.updatedAt}</span>
            </div>
        </motion.a>
    );
}

export default function GitHubSection() {
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [profile, setProfile] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [totalStars, setTotalStars] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const [userResponse, reposResponse] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`),
                ]);
                if (!userResponse.ok || !reposResponse.ok) throw new Error('GitHub API request failed');

                const [user, repos] = await Promise.all([userResponse.json(), reposResponse.json()]);
                if (cancelled) return;

                const owned = repos.filter((repo) => !repo.fork);
                setProfile(user);
                setTotalStars(owned.reduce((sum, repo) => sum + repo.stargazers_count, 0));
                setLanguages(languageBreakdown(owned));
                setRepositories(
                    owned.slice(0, RECENT_COUNT).map((repo) => ({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stars: repo.stargazers_count,
                        topics: repo.topics || [],
                        updatedAt: formatRelative(repo.pushed_at || repo.updated_at),
                        url: repo.html_url,
                    })),
                );
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                if (!cancelled) setFailed(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const stat = (value) => (failed ? '—' : value);
    const since = profile?.created_at ? new Date(profile.created_at).getFullYear() : '—';

    return (
        <section id="github" className="relative overflow-hidden bg-slate-50 py-28 dark:bg-[#060a13] lg:py-36">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/[0.07]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-b from-transparent to-[#060a13] dark:block"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div {...reveal} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-indigo-400" />
                            <span className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">
                                GitHub Activity
                            </span>
                        </div>
                        <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                            Building in the open.
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                            Templates, experiments, and side projects I push to GitHub, pulled live from the GitHub API.
                        </p>
                    </div>

                    <a
                        href={PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 self-start rounded-2xl border border-slate-200 bg-white/70 py-3 pl-3 pr-5 backdrop-blur transition-colors hover:border-cyan-500/40 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-cyan-300/30 lg:self-auto"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white ring-1 ring-white/10 dark:bg-white/[0.06]">
                            <GitHubMark className="h-6 w-6" />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">@{GITHUB_USERNAME}</span>
                            <span className="font-mono text-[11px] text-slate-500">View full profile</span>
                        </span>
                        <ArrowUpRightIcon className="ml-2 h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500 dark:group-hover:text-cyan-300" />
                    </a>
                </motion.div>

                <motion.div
                    {...reveal}
                    transition={{ ...reveal.transition, delay: 0.1 }}
                    className="mt-14 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/[0.07] dark:shadow-[0_30px_80px_-40px_rgba(34,211,238,0.25)]"
                >
                    <dl className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-white/[0.07] lg:grid-cols-4 [&>*]:bg-white dark:[&>*]:bg-[#080d18]">
                        <StatCell label="Public repositories" value={stat(profile?.public_repos)} loading={loading} />
                        <StatCell label="Stars earned" value={stat(totalStars)} loading={loading} />
                        <StatCell label="Followers" value={stat(profile?.followers)} loading={loading} />
                        <StatCell label="On GitHub since" value={since} loading={loading} />
                    </dl>
                    {(loading || languages.length > 0) && (
                        <div className="border-t border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#080d18]">
                            <LanguageFootprint languages={languages} loading={loading} />
                        </div>
                    )}
                </motion.div>

                <div className="mt-20 flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Recently active</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Sorted by last push</span>
                </div>

                {loading ? (
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: RECENT_COUNT }, (_, index) => (
                            <div
                                key={index}
                                className="h-[172px] animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]"
                            />
                        ))}
                    </div>
                ) : repositories.length > 0 ? (
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {repositories.map((repo, index) => (
                            <RepoCard key={repo.id} repo={repo} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/[0.1]">
                        <p className="text-slate-600 dark:text-slate-400">
                            Repositories couldn&apos;t be loaded right now.{' '}
                            <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline-offset-4 hover:underline dark:text-cyan-300">
                                Browse them on GitHub
                            </a>
                            .
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
