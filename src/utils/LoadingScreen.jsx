import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
            <motion.div
                className="absolute text-8xl"
                initial={{ x: -100, y: 0, rotate: 0 }}
                animate={{
                    x: [-100, 0, 200, -50, 100],
                    y: [0, -50, 30, -80, 0],
                    rotate: [0, 15, -15, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                🦟
            </motion.div>

            <div className="absolute bottom-10 text-gray-600 text-lg">
                Preparando resultados...
            </div>
        </div>
    );
}
