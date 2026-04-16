import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import Card from '../ui/Card';
import { Trophy, Target, PlayCircle, Star } from 'lucide-react';

const StatsView = () => {
    const { stats, lang } = useContext(GameContext);

    const statCards = [
        { 
            id: 'games', 
            label: lang === 'tr' ? 'Toplam Oyun' : 'Total Games', 
            val: stats.totalGames,
            icon: PlayCircle,
            color: '#3b82f6'
        },
        { 
            id: 'best', 
            label: lang === 'tr' ? 'En İyi Skor' : 'Best Score', 
            val: stats.bestScore,
            icon: Trophy,
            color: '#f59e0b'
        },
        { 
            id: 'total', 
            label: lang === 'tr' ? 'Toplam Skor' : 'Total Score', 
            val: stats.totalScore,
            icon: Star,
            color: '#8b5cf6'
        },
        { 
            id: 'accuracy', 
            label: lang === 'tr' ? 'Doğruluk' : 'Accuracy', 
            val: stats.totalGames ? `${Math.round((stats.totalCorrect / (stats.totalCorrect + stats.totalIncorrect)) * 100 || 0)}%` : '0%',
            icon: Target,
            color: '#10b981'
        }
    ];

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
                {lang === 'tr' ? 'İstatistikler' : 'Your Statistics'}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                {statCards.map(s => {
                    const Icon = s.icon;
                    return (
                        <Card key={s.id} style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ 
                                background: `rgba(255, 255, 255, 0.1)`, 
                                padding: '16px', 
                                borderRadius: '16px',
                                color: s.color
                            }}>
                                <Icon size={32} />
                            </div>
                            <div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
                                    {s.label}
                                </div>
                                <div style={{ fontSize: '32px', fontWeight: 800 }}>
                                    {s.val}
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default StatsView;
