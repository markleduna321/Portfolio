import { Dialog, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ isOpen, onClose, title, children, size = 'max-w-4xl' }) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className={`${size} w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden`}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </DialogTitle>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {children}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
