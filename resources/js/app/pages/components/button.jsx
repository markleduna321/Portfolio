export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseClasses =
        'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#060a13] disabled:pointer-events-none disabled:opacity-60';

    const variants = {
        primary:
            'bg-slate-950 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_40px_-12px_rgba(56,189,248,0.55)] dark:hover:bg-cyan-50',
        secondary:
            'border border-slate-300 bg-white/70 text-slate-800 backdrop-blur hover:border-slate-400 hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-white/30 dark:hover:bg-white/[0.08]',
        outline:
            'border border-slate-300 text-slate-800 hover:border-cyan-500/60 hover:text-cyan-700 dark:border-white/15 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200',
    };

    return (
        <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
