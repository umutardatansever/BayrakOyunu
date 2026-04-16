import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Play, Settings, X, Heart, HeartCrack, RefreshCw } from 'lucide-react';
import { getTranslatedName } from '../../data/translations';
import { LEVEL_CONFIG } from '../../data/levels';

const QuizGame = () => {
    const { lang, settings, setSettings } = useContext(GameContext);
    const { quizState, startGame, handleAnswer, quitGame } = useGameLogic();

    if (!quizState.isActive) {
        return (
            <Card className="flex-center animate-slide-up" delay={0.1} style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>
                        {lang === 'tr' ? 'Bayrak Ustası Ol!' : 'Become a Flag Master!'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {lang === 'tr' ? 'Dünya bayraklarını öğren ve test et' : 'Learn and test world flags'}
                    </p>
                </div>
                
                <div className="flex-responsive" style={{ marginBottom: '40px', width: '100%' }}>
                    <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '10px' }}>{lang === 'tr' ? 'Zorluk Seviyesi' : 'Difficulty Level'}</h3>
                        <input 
                            type="range" 
                            min="1" max="10" 
                            value={settings.level} 
                            onChange={(e) => setSettings({...settings, level: parseInt(e.target.value)})}
                            style={{ width: '100%', marginBottom: '15px', cursor: 'pointer' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                            <span>{LEVEL_CONFIG[settings.level]?.name[lang]}</span>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                            {LEVEL_CONFIG[settings.level]?.info[lang]}
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '14px' }}>{lang === 'tr' ? 'Oyun Modu' : 'Game Mode'}</h3>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '12px' }}>
                            <button 
                                onClick={() => setSettings({...settings, mode: 'flagToName'})}
                                style={{ 
                                    flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                                    background: settings.mode === 'flagToName' ? 'var(--accent-primary)' : 'transparent',
                                    color: settings.mode === 'flagToName' ? 'white' : 'var(--text-secondary)',
                                    fontWeight: '600' 
                                }}
                            >
                                {lang === 'tr' ? 'Bayrak → İsim' : 'Flag → Name'}
                            </button>
                            <button 
                                onClick={() => setSettings({...settings, mode: 'nameToFlag'})}
                                style={{ 
                                    flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                                    background: settings.mode === 'nameToFlag' ? 'var(--accent-primary)' : 'transparent',
                                    color: settings.mode === 'nameToFlag' ? 'white' : 'var(--text-secondary)',
                                    fontWeight: '600' 
                                }}
                            >
                                {lang === 'tr' ? 'İsim → Bayrak' : 'Name → Flag'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Button size="lg" icon={Play} onClick={startGame}>
                        {lang === 'tr' ? 'Oyunu Başlat' : 'Start Game'}
                    </Button>
                    <Button variant="secondary" size="lg" icon={Settings} onClick={() => alert('Settings popup soon!')}>
                        {lang === 'tr' ? 'Ayarlar' : 'Settings'}
                    </Button>
                </div>
            </Card>
        );
    }

    if (quizState.isGameOver) {
        return (
            <Card className="flex-center flex-col animate-pop" style={{ padding: '60px', textAlign: 'center' }}>
                <HeartCrack size={64} color="var(--danger)" style={{ marginBottom: '20px' }} />
                <h2 style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--danger)' }}>
                    {lang === 'tr' ? 'Kaybettin!' : 'Game Over!'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {lang === 'tr' ? 'Tüm canlar bitti. Tekrar dene!' : 'All lives lost. Try again!'}
                </p>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>
                    Score: {quizState.score}
                </div>
                <Button size="lg" icon={RefreshCw} onClick={startGame}>
                    {lang === 'tr' ? 'Tekrar Dene' : 'Try Again'}
                </Button>
                <Button variant="ghost" className="mt-4" onClick={quitGame} style={{ marginTop: '16px' }}>
                    {lang === 'tr' ? 'Ana Menü' : 'Main Menu'}
                </Button>
            </Card>
        );
    }

    if (quizState.isCompleted) {
        return (
            <Card className="flex-center flex-col animate-pop" style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏆</div>
                <h2 style={{ fontSize: '32px', marginBottom: '10px', color: 'var(--success)' }}>
                    {lang === 'tr' ? 'Tebrikler!' : 'Congratulations!'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {lang === 'tr' ? 'Mükemmel bir iş çıkardın.' : 'Excellent job!'}
                </p>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>
                    Score: {quizState.score}
                </div>
                <Button size="lg" icon={RefreshCw} onClick={startGame}>
                    {lang === 'tr' ? 'Yeni Oyun' : 'Play Again'}
                </Button>
                <Button variant="ghost" onClick={quitGame} style={{ marginTop: '16px' }}>
                    {lang === 'tr' ? 'Ana Menü' : 'Main Menu'}
                </Button>
            </Card>
        );
    }

    const question = quizState.questions[quizState.currentIndex];

    // Build Lives Display
    const livesDisplay = [];
    for(let i=0; i<3; i++) {
        if(i < quizState.lives) livesDisplay.push(<Heart key={i} size={24} color="var(--danger)" fill="var(--danger)" />);
        else livesDisplay.push(<HeartCrack key={i} size={24} color="var(--text-muted)" />);
    }

    return (
        <Card className="animate-fade-in" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                    {lang === 'tr' ? 'Soru' : 'Question'} {quizState.currentIndex + 1} / {quizState.questions.length}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {livesDisplay}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '20px' }}>
                        {quizState.score} PTS
                    </div>
                    <button 
                        onClick={quitGame}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 0 }}
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {settings.mode === 'flagToName' && (
                <div style={{ 
                    margin: '0 auto', 
                    width: '100%', 
                    maxWidth: '400px', 
                    height: '240px', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    marginBottom: '30px'
                }}>
                    <img 
                        src={question.correctCountry.flags.png} 
                        alt="Flag" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>
            )}

            <h3 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '22px' }}>
                {settings.mode === 'flagToName' 
                    ? (lang === 'tr' ? 'Bu bayrak hangi ülkeye ait?' : 'Which country does this flag belong to?')
                    : (lang === 'tr' ? `Hangi bayrak ${getTranslatedName(question.correctCountry.name.common, lang)} ülkesine aittir?` : `Which flag belongs to ${getTranslatedName(question.correctCountry.name.common, lang)}?`)
                }
            </h3>

            <div className="grid-2">
                {question.options.map((opt) => {
                    const isSelected = quizState.selectedAnswer === opt.cca2;
                    const isCorrect = opt.cca2 === question.correctCountry.cca2;
                    const showFeedback = quizState.selectedAnswer !== null;
                    
                    let bg = 'rgba(255, 255, 255, 0.1)';
                    let border = '1px solid rgba(255, 255, 255, 0.2)';
                    
                    if (showFeedback) {
                        if (isCorrect) {
                            bg = 'rgba(16, 185, 129, 0.2)';
                            border = '1px solid var(--success)';
                        } else if (isSelected && !isCorrect) {
                            bg = 'rgba(239, 68, 68, 0.2)';
                            border = '1px solid var(--danger)';
                        }
                    }

                    return (
                        <button
                            key={opt.cca2}
                            onClick={() => handleAnswer(opt.cca2)}
                            disabled={showFeedback}
                            style={{
                                padding: '16px',
                                background: bg,
                                border: border,
                                borderRadius: '12px',
                                color: 'var(--text-primary)',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: showFeedback ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                                ...(showFeedback && !isCorrect && !isSelected ? { opacity: 0.5 } : {})
                            }}
                        >
                            {settings.mode === 'flagToName' ? (
                                getTranslatedName(opt.name.common, lang)
                            ) : (
                                <img src={opt.flags.png} alt="Flag" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                            )}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
};

export default QuizGame;
