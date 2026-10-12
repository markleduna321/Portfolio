export default function SectionTitle({ title, subtitle, eyebrow, centered = true }) {
    return (
        <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
            {eyebrow && (
                <div className={`mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
                    <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-indigo-400" />
                    <span className="text-xs font-medium uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">
                        {eyebrow}
                    </span>
                </div>
            )}
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className={`mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 ${centered ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
