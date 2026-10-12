import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRightIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';

const fieldClass =
    'peer w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-cyan-500/60 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-300/50 dark:focus:bg-white/[0.05] dark:focus:ring-cyan-400/10';

const labelClass = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400';

const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(data.error || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            setError('Failed to send message. Please try contacting me directly via email.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            id: 1,
            icon: EnvelopeIcon,
            label: 'Email',
            value: 'markharvey.leduna@gmail.com',
            href: 'mailto:markharvey.leduna@gmail.com',
        },
        {
            id: 2,
            icon: PhoneIcon,
            label: 'Phone',
            value: '+63995982241',
            href: 'tel:+63995982241',
        },
        {
            id: 3,
            icon: MapPinIcon,
            label: 'Location',
            value: 'San Carlos City, Negros Occidental, Philippines',
            href: null,
        },
    ];

    const socialLinks = [
        {
            id: 1,
            name: 'GitHub',
            icon: (
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
            href: 'https://github.com/markleduna321',
        },
        {
            id: 2,
            name: 'LinkedIn',
            icon: (
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            href: 'https://www.linkedin.com/in/mark-harvey-leduna-67071b178/',
        },
        {
            id: 4,
            name: 'Stack Overflow',
            icon: (
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                </svg>
            ),
            href: 'https://stackoverflow.com/users/12023932/mark-harvey-leduna',
        },
    ];

    return (
        <section id="contact" className="relative isolate overflow-hidden bg-slate-50 py-24 transition-colors duration-500 dark:bg-[#060a13] md:py-28">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_45%,black_10%,transparent_70%)] dark:opacity-60 dark:[background-image:linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[140px] dark:bg-cyan-500/[0.07]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-400/10 blur-[140px] dark:bg-indigo-500/[0.08]" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8">
                <div className="flex flex-col">
                    <motion.div {...reveal(0)}>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-indigo-400" />
                            <span className="text-xs font-medium uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">
                                Get in Touch
                            </span>
                        </div>
                        <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 dark:text-white md:text-5xl lg:text-[3.5rem]">
                            Let&apos;s build something
                            <span className="block bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text pb-1 text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-indigo-300">
                                dependable.
                            </span>
                        </h2>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                            Architecting a platform, hardening infrastructure, or bringing AI into an
                            existing workflow? Tell me about it.
                        </p>
                    </motion.div>

                    <motion.div {...reveal(0.1)} className="mt-10 inline-flex w-max items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                            Available for new projects
                        </span>
                    </motion.div>

                    <motion.ul {...reveal(0.18)} className="mt-10 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.07] dark:border-white/[0.07]">
                        {contactInfo.map((info) => {
                            const Icon = info.icon;
                            const inner = (
                                <>
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors duration-300 group-hover:border-cyan-500/40 group-hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:group-hover:text-cyan-300">
                                        <Icon className="h-[18px] w-[18px]" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                            {info.label}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[15px] text-slate-800 dark:text-slate-200">
                                            {info.value}
                                        </span>
                                    </span>
                                    {info.href && (
                                        <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-slate-400 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500 group-hover:opacity-100 dark:group-hover:text-cyan-300" />
                                    )}
                                </>
                            );
                            return (
                                <li key={info.id}>
                                    {info.href ? (
                                        <a href={info.href} className="group flex items-center gap-4 py-4">
                                            {inner}
                                        </a>
                                    ) : (
                                        <div className="group flex items-center gap-4 py-4">{inner}</div>
                                    )}
                                </li>
                            );
                        })}
                    </motion.ul>

                    <motion.div {...reveal(0.26)} className="mt-8 flex items-center gap-3">
                        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Elsewhere
                        </span>
                        {socialLinks.map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                title={social.name}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-cyan-300/40 dark:hover:text-cyan-200"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </motion.div>
                </div>

                <motion.div {...reveal(0.12)} className="relative">
                    <div aria-hidden="true" className="pointer-events-none absolute -inset-1 overflow-hidden rounded-[2rem] opacity-60 blur-xl">
                        <div className="absolute left-1/2 top-1/2 aspect-square w-[300%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_220deg,rgba(34,211,238,0.85)_300deg,rgba(129,140,248,0.95)_345deg,transparent_360deg)] motion-reduce:animate-none sm:w-[160%]" />
                    </div>

                    <div className="relative overflow-hidden rounded-[1.75rem] p-px">
                        <div aria-hidden="true" className="absolute inset-0 bg-slate-200 dark:bg-white/[0.08]" />
                        <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[300%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_220deg,#22d3ee_300deg,#818cf8_345deg,#e0e7ff_357deg,transparent_360deg)] motion-reduce:animate-none sm:w-[160%]" />

                        <div className="relative rounded-[calc(1.75rem-1px)] bg-white p-7 dark:bg-[#080d18] sm:p-10">
                            <div className="mb-8 flex items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                                        Send a message
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Share a few details and I&apos;ll get back to you.
                                    </p>
                                </div>
                            </div>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    role="status"
                                    className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4 text-sm text-emerald-800 dark:text-emerald-200"
                                >
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
                                    Thank you! Your message has been sent. I&apos;ll get back to you soon.
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    role="alert"
                                    className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/25 bg-rose-500/[0.07] p-4 text-sm text-rose-800 dark:text-rose-200"
                                >
                                    <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className={labelClass}>Name</label>
                                        <input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" className={fieldClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={labelClass}>Email</label>
                                        <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="jane@company.com" className={fieldClass} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className={labelClass}>Subject</label>
                                    <input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} placeholder="Project inquiry" className={fieldClass} />
                                </div>
                                <div>
                                    <label htmlFor="message" className={labelClass}>Message</label>
                                    <textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} placeholder="Tell me about the system you want to build…" className={`${fieldClass} resize-none`} />
                                </div>

                                <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                        All fields are required
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-[15px] font-medium tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:pointer-events-none disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_40px_-12px_rgba(56,189,248,0.6)] dark:hover:bg-cyan-50 sm:w-auto"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send message
                                                <PaperAirplaneIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
