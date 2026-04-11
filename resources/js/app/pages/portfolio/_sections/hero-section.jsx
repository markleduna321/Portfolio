import { ArrowDownIcon } from '@heroicons/react/24/outline';
import Button from '../../components/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"></div>
            
            {/* Animated circles */}
            <div className="absolute top-20 left-10 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-primary-400 dark:bg-primary-900/60 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[100px] opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-400 dark:bg-purple-900/60 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 md:left-40 w-64 h-64 md:w-96 md:h-96 bg-pink-400 dark:bg-pink-900/60 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10 w-full">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
                        Hi, I'm{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 drop-shadow-md">
                            Mark Harvey Leduna
                        </span>
                    </motion.h1>
                    
                    <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-light">
                        Full Stack Developer & Creative Problem Solver
                    </motion.p>
                    
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        I build exceptional digital experiences that combine beautiful design 
                        with powerful functionality. Specializing in modern web technologies 
                        and scalable solutions.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={scrollToProjects} className="shadow-lg shadow-primary-500/30">
                                View My Work
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="backdrop-blur-md bg-white/30 dark:bg-white/5 border-gray-300 dark:border-gray-700">
                                Get In Touch
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Tech Stack Preview */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                        {['React', 'Laravel', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-sm border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 font-medium tracking-wide"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
                >
                    <ArrowDownIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 8s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
}
