import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon,
    disabled = false,
    className = '',
    fullWidth = false
}) => {
    const baseStyle = {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        borderRadius: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
        primary: {
            background: 'var(--accent-gradient)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
        },
        secondary: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        danger: {
            background: 'var(--danger)',
            color: 'white',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-secondary)',
        }
    };

    const sizes = {
        sm: { padding: '8px 16px', fontSize: '14px' },
        md: { padding: '12px 24px', fontSize: '16px' },
        lg: { padding: '16px 32px', fontSize: '18px' },
        icon: { padding: '12px', fontSize: '20px' }
    };

    const style = {
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            style={style}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {Icon && <Icon size={size === 'sm' ? 16 : 20} />}
            {children}
        </motion.button>
    );
};

export default Button;
