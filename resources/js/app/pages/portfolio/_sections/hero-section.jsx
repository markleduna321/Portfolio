import { ArrowDownIcon } from '@heroicons/react/24/outline';
import Button from '../../components/button';

export default function HeroSection() {
    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
            
            {/* Animated circles */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <div className="animate-fadeIn">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Hi, I'm{' '}
                        <span className="gradient-text">
                            Mark Harvey Leduna
                        </span>
                    </h1>
                    
                    <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
                        Full Stack Developer & Creative Problem Solver
                    </p>
                    
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12">
                        I build exceptional digital experiences that combine beautiful design 
                        with powerful functionality. Specializing in modern web technologies 
                        and scalable solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Button onClick={scrollToProjects}>
                            View My Work
                        </Button>
                        <Button variant="outline" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Get In Touch
                        </Button>
                    </div>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {['React', 'Laravel', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300 font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowDownIcon className="h-8 w-8 text-gray-400" />
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
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
