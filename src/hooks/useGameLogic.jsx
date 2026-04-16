import { useContext, useState, useCallback } from 'react';
import { GameContext } from '../context/GameContext';
import { getTranslatedName } from '../data/translations';
import { LEVEL_CONFIG } from '../data/levels';

export const useGameLogic = () => {
    const { countries, settings, lang, stats, setStats } = useContext(GameContext);
    
    const [quizState, setQuizState] = useState({
        isActive: false,
        questions: [],
        currentIndex: 0,
        score: 0,
        lives: 3,
        isGameOver: false,
        isCompleted: false,
        selectedAnswer: null, // to show feedback
    });

    const generateQuestions = useCallback(() => {
        if (!countries || countries.length === 0) return [];
        
        let pool = [...countries];
        if (settings.region !== 'all') {
            pool = pool.filter(c => c.region === settings.region);
        }
        
        const levelData = LEVEL_CONFIG[settings.level] || LEVEL_CONFIG[1];
        pool = pool.filter(c => (c.difficulty || 3) <= levelData.maxDiff);
        
        if (levelData.reverse) {
            pool = pool.reverse();
        } else {
            pool = pool.sort(() => Math.random() - 0.5);
        }
        
        // Pick top 20 or less for questions
        const selected = pool.slice(0, Math.min(20, pool.length));
        
        const questions = selected.map(country => {
            // Pick 3 random wrong answers
            const wrongAnswers = pool
                .filter(c => c.cca2 !== country.cca2)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            const options = [country, ...wrongAnswers].sort(() => Math.random() - 0.5);
            
            return {
                correctCountry: country,
                options
            };
        });
        
        return questions;
    }, [countries, settings]);

    const startGame = useCallback(() => {
        const questions = generateQuestions();
        if (questions.length === 0) return;
        
        setQuizState({
            isActive: true,
            questions,
            currentIndex: 0,
            score: 0,
            lives: 3,
            isGameOver: false,
            isCompleted: false,
            selectedAnswer: null
        });
    }, [generateQuestions]);

    const handleAnswer = useCallback((selectedCountryCca2) => {
        if (quizState.selectedAnswer !== null) return; // prevent multiple clicks
        
        const question = quizState.questions[quizState.currentIndex];
        const isCorrect = selectedCountryCca2 === question.correctCountry.cca2;
        
        setQuizState(prev => {
            const newState = { ...prev, selectedAnswer: selectedCountryCca2 };
            
            if (isCorrect) {
                newState.score += 10 * settings.level;
            } else {
                newState.lives -= 1;
            }
            return newState;
        });

        // Delay moving to next question
        setTimeout(() => {
            setQuizState(prev => {
                if (prev.lives <= 0) {
                    // Update global stats
                    setStats(s => ({...s, totalGames: s.totalGames + 1, bestScore: Math.max(s.bestScore, prev.score)}));
                    return { ...prev, isGameOver: true };
                }
                
                if (prev.currentIndex + 1 >= prev.questions.length) {
                    // Update global stats
                    setStats(s => ({...s, totalGames: s.totalGames + 1, bestScore: Math.max(s.bestScore, prev.score)}));
                    return { ...prev, isCompleted: true };
                }
                
                return {
                    ...prev,
                    currentIndex: prev.currentIndex + 1,
                    selectedAnswer: null
                };
            });
        }, 1500);
        
    }, [quizState, settings.level, setStats]);

    const quitGame = useCallback(() => {
        setQuizState(prev => ({ ...prev, isActive: false }));
    }, []);

    return {
        quizState,
        startGame,
        handleAnswer,
        quitGame
    };
};
