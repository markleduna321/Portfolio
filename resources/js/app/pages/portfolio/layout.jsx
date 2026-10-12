import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from './_redux/theme-slice';
import CustomCursor from '../components/custom-cursor';
import { scrollToSummary } from './_sections/summary-transition';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'Summary', href: '#summary' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
];

const socials = [
    { name: 'GitHub', href: 'https://github.com/markleduna321' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mark-harvey-leduna-67071b178/' },
    { name: 'Stack Overflow', href: 'https://stackoverflow.com/users/12023932/mark-harvey-leduna' },
];

const iconButton =
    'flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white';

export default function PortfolioLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', darkMode);
        root.style.colorScheme = darkMode ? 'dark' : 'light';
        root.style.backgroundColor = darkMode ? '#060a13' : '#f8fafc';
    }, [darkMode]);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > 50);
            const probe = window.innerHeight * 0.4;
            let current = navigation[0].href;
            for (const item of navigation) {
                const el = document.querySelector(item.href);
                if (el && el.getBoundingClientRect().top <= probe) current = item.href;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const scrollToSection = (href) => {
        setMobileMenuOpen(false);
        if (href === '#summary') {
            scrollToSummary();
            return;
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    const ThemeToggle = () => (
        <button
            type="button"
            onClick={() => dispatch(toggleDarkMode())}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className={iconButton}
        >
            {darkMode ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
        </button>
    );

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''} overflow-x-clip`}>
            <CustomCursor />
            <div className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060a13] dark:text-slate-100">
                <nav
                    className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
                        scrolled
                            ? 'border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#060a13]/75'
                            : 'border-b border-transparent bg-transparent py-2'
                    }`}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <a
                                href="#hero"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('#hero');
                                }}
                                className="group flex items-center gap-3"
                                aria-label="Mark Harvey Leduna — back to top"
                            >
                                <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white font-mono text-[13px] font-semibold tracking-tight text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                                    <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-400 to-indigo-400" />
                                    ML
                                </span>
                                <span className="hidden flex-col leading-tight sm:flex">
                                    <span className="text-sm font-semibold tracking-[-0.01em] text-slate-950 dark:text-white">
                                        Mark Harvey Leduna
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                        Solutions Architect
                                    </span>
                                </span>
                            </a>

                            <div className="hidden items-center gap-6 md:flex">
                                <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/60 p-1 backdrop-blur dark:border-white/[0.07] dark:bg-white/[0.03]">
                                    {navigation.map((item) => {
                                        const isActive = active === item.href;
                                        return (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection(item.href);
                                                }}
                                                aria-current={isActive ? 'true' : undefined}
                                                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                                                    isActive
                                                        ? 'bg-slate-950 text-white dark:bg-white/10 dark:text-white'
                                                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                                                }`}
                                            >
                                                {item.name}
                                            </a>
                                        );
                                    })}
                                </div>
                                <ThemeToggle />
                            </div>

                            <div className="flex items-center gap-2 md:hidden">
                                <ThemeToggle />
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-label="Toggle menu"
                                    aria-expanded={mobileMenuOpen}
                                    className={iconButton}
                                >
                                    {mobileMenuOpen ? <XMarkIcon className="h-[18px] w-[18px]" /> : <Bars3Icon className="h-[18px] w-[18px]" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#060a13]/95 md:hidden">
                            <div className="space-y-1 px-4 pb-4 pt-2">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        className={`block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                                            active === item.href
                                                ? 'bg-slate-100 text-slate-950 dark:bg-white/[0.06] dark:text-white'
                                                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/[0.04]'
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>

                <main>{children}</main>

                <footer className="relative border-t border-slate-200 bg-slate-50 dark:border-white/[0.06] dark:bg-[#060a13]">
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                        <div>
                            <p className="text-sm font-semibold tracking-[-0.01em] text-slate-950 dark:text-white">Mark Harvey Leduna</p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Solutions Architect &amp; Full-Stack Developer
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                                >
                                    {social.name}
                                </a>
                            ))}
                            <button
                                type="button"
                                onClick={() => scrollToSection('#hero')}
                                aria-label="Back to top"
                                className={iconButton}
                            >
                                <ArrowUpIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-white/[0.05]">
                        <p className="mx-auto max-w-7xl px-4 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 sm:px-6 lg:px-8">
                            © {new Date().getFullYear()} Mark Harvey Leduna · Built with React, Three.js &amp; Tailwind
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
