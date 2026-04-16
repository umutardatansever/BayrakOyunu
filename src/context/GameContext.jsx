import React, { createContext, useState, useEffect } from 'react';
import { DEMO_COUNTRIES } from '../data/demo-data';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [view, setView] = useState('quiz'); // 'quiz', 'explore', 'stats'
    const [lang, setLang] = useState('tr');
    
    const [settings, setSettings] = useState({
        mode: 'flagToName', 
        level: 1,
        region: 'all'
    });

    const [stats, setStats] = useState({
        totalGames: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        totalScore: 0,
        bestScore: 0
    });

    useEffect(() => {
        // Simulating fetch or load from local storage
        setCountries(DEMO_COUNTRIES);
    }, []);

    const value = {
        countries,
        view,
        setView,
        lang,
        setLang,
        settings,
        setSettings,
        stats,
        setStats
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
