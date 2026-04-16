import React, { useContext } from 'react';
import Header from './components/ui/Header';
import { GameContext } from './context/GameContext';
import QuizGame from './components/game/QuizGame';
import ExploreView from './components/explore/ExploreView';
import StatsView from './components/game/StatsView';

function AppContent() {
    const { view } = useContext(GameContext);

    return (
        <div className="container">
            <Header />
            <main>
                {view === 'quiz' && <QuizGame />}
                {view === 'explore' && <ExploreView />}
                {view === 'stats' && <StatsView />}
            </main>
        </div>
    );
}

function App() {
    return (
        <>
            <div className="modern-bg"></div>
            <AppContent />
        </>
    );
}

export default App;
