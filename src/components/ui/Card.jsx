import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={hover ? { y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' } : {}}
            className={`glass-panel flex-col ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
