import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Button from '../../components/button';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

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
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
            href: 'https://github.com/markleduna321',
        },
        {
            id: 2,
            name: 'LinkedIn',
            icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            href: 'https://www.linkedin.com/in/mark-harvey-leduna-67071b178/',
        },
        {
            id: 4,
            name: 'Stack Overflow',
            icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                </svg>
            ),
            href: 'https://stackoverflow.com/users/12023932/mark-harvey-leduna',
        },
    ];

    return (
        <section id="contact" className="py-20 relative bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-400/5 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Get In Touch"
                        subtitle="Have a project in mind? Let's work together!"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-6 h-1 bg-primary-500 rounded-full"></span>
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    {contactInfo.map((info) => {
                                        const Icon = info.icon;
                                        const content = (
                                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                                <div className="flex-shrink-0 p-2.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl shadow-sm">
                                                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-0.5">
                                                        {info.label}
                                                    </p>
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {info.value}
                                                    </p>
                                                </div>
                                            </div>
                                        );

                                        return info.href ? (
                                            <motion.a key={info.id} href={info.href} whileHover={{ x: 5 }} className="block">
                                                {content}
                                            </motion.a>
                                        ) : (
                                            <div key={info.id} className="block">{content}</div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <svg viewBox="0 0 24 24" className="w-32 h-32 text-gray-900 dark:text-white" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
                                    <span className="w-6 h-1 bg-primary-500 rounded-full"></span>
                                    Follow Me
                                </h3>
                                <div className="flex gap-4 relative z-10">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.id}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white dark:bg-gray-700/50 shadow-sm border border-gray-100 dark:border-gray-600 rounded-xl hover:bg-primary-600 hover:border-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:border-primary-600 transition-colors"
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-l-4 border-l-green-500 shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Availability
                                </h3>
                                <div className="flex items-center gap-3 mb-3 bg-green-50 dark:bg-green-900/20 w-max px-3 py-1.5 rounded-full border border-green-100 dark:border-green-800/30">
                                    <div className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </div>
                                    <span className="text-green-700 dark:text-green-400 font-semibold text-sm">
                                        Available for Work
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Currently accepting new projects and opportunities
                                </p>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-xl p-8 md:p-10">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                Send Me a Message
                            </h3>

                            <motion.div layout>
                                {submitted && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                                        <div className="bg-green-100 dark:bg-green-800 rounded-full p-1 mt-0.5">
                                            <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <p className="text-green-800 dark:text-green-300 font-medium">
                                            Thank you! Your message has been sent successfully. I'll get back to you soon.
                                        </p>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                                        <div className="bg-red-100 dark:bg-red-800 rounded-full p-1 mt-0.5">
                                            <svg className="w-4 h-4 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </div>
                                        <p className="text-red-800 dark:text-red-300 font-medium">
                                            {error}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors">
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 transition-all outline-none"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="group">
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 transition-all outline-none resize-none"
                                        placeholder="Tell me about your vision..."
                                    />
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 flex items-center justify-center gap-3 transition-all border-none"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <PaperAirplaneIcon className="h-5 w-5 rotate-[-20deg]" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
