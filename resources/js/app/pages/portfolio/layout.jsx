import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from './_redux/theme-slice';
import { Link } from '@inertiajs/react';
import {
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
];

export default function PortfolioLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                {/* Navigation */}
                <nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                        scrolled
                            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
                            : 'bg-transparent'
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <a
                                    href="#hero"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('#hero');
                                    }}
                                    className="text-2xl font-bold gradient-text"
                                >
                                    &lt;Portfolio /&gt;
                                </a>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <button
                                    onClick={() => dispatch(toggleDarkMode())}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {darkMode ? (
                                        <SunIcon className="h-6 w-6" />
                                    ) : (
                                        <MoonIcon className="h-6 w-6" />
                                    )}
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center space-x-4">
                                <button
                                    onClick={() => dispatch(toggleDarkMode())}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {darkMode ? (
                                        <SunIcon className="h-6 w-6" />
                                    ) : (
                                        <MoonIcon className="h-6 w-6" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {mobileMenuOpen ? (
                                        <XMarkIcon className="h-6 w-6" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content */}
                <main>{children}</main>

                {/* Footer */}
                <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} Developer Portfolio. Built with Laravel & React.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
