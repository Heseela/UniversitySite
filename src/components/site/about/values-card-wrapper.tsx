"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode,
    index: number
}

export default function AboutValuesCardWrapper({ children, index }: Props) {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {children}
        </motion.div>
    )
}