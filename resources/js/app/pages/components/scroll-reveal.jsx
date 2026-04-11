import { motion } from 'framer-motion';

export default function ScrollReveal({ children, width = "100%", delay = 0, yOffset = 50, duration = 0.5, className = "" }) {
    return (
        <div style={{ width }} className={className}>
            <motion.div
                initial={{ opacity: 0, y: yOffset }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration, delay, ease: "easeOut" }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
