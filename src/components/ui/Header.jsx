import React, { useContext } from 'react';
import { Globe, Compass, BarChart2, Languages } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';

const Header = () => {
    const { view, setView, lang, setLang } = useContext(GameContext);

    const navItems = [
        { id: 'quiz', label: { tr: 'Quiz', en: 'Quiz' }, icon: Globe },
        { id: 'explore', label: { tr: 'Keşfet', en: 'Explore' }, icon: Compass },
        { id: 'stats', label: { tr: 'İstatistikler', en: 'Stats' }, icon: BarChart2 }
    ];

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            marginBottom: '30px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                    background: 'var(--accent-gradient)',
                    padding: '8px',
                    borderRadius: '12px',
                    color: 'white',
                    display: 'flex'
                }}>
                    <Globe size={24} />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    WorldWideFlag
                </h1>
            </div>

            <nav style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-full)',
                padding: '6px',
                display: 'flex',
                gap: '4px',
                border: '1px solid var(--glass-border)'
            }}>
                {navItems.map(item => {
                    const active = view === item.id;
                    const Icon = item.icon;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: active ? 'var(--accent-gradient)' : 'transparent',
                                color: active ? 'white' : 'var(--text-secondary)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Icon size={18} />
                            <span style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}>
                                {item.label[lang]}
                            </span>
                        </motion.button>
                    )
                })}
            </nav>

            <div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 16px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'white',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    <Languages size={18} />
                    {lang.toUpperCase()}
                </motion.button>
            </div>
        </header>
    );
};

export default Header;
