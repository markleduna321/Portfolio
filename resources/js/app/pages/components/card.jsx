export default function Card({ children, className = '', hover = true }) {
    return (
        <div
            className={`
                bg-white dark:bg-gray-800 
                rounded-xl shadow-lg 
                p-6 
                transition-all duration-300
                ${hover ? 'hover:shadow-2xl hover:scale-105' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
}
