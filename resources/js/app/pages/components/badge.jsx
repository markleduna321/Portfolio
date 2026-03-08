export default function Badge({ children, color = 'primary', className = '' }) {
    const colors = {
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };

    return (
        <span
            className={`
                inline-flex items-center 
                px-3 py-1 
                rounded-full 
                text-sm font-medium
                ${colors[color]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
