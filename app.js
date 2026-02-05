// ==================== //
// State Management
// ==================== //

const state = {
    countries: [],
    currentView: 'quiz',
    gameSettings: {
        mode: 'flagToName', // 'flagToName' or 'nameToFlag'
        level: 1,
        region: 'all'
    },
    quiz: {
        questions: [],
        currentQuestion: 0,
        score: 0,
        correct: 0,
        incorrect: 0,
        totalQuestions: 20,
        lives: 3,
        maxLives: 3,
        extraLifeUsed: false,
        timerInterval: null,
        timerSeconds: 15
    },
    stats: {
        totalGames: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        totalScore: 0,
        bestScore: 0
    },
    unlockedLevel: 1, // Highest unlocked level
    theme: 'light',
    lang: 'tr' // 'tr' or 'en'
};

// Similar flags groups for hard modes
const SIMILAR_FLAGS = [
    ['RO', 'TD', 'AD', 'MD'], // Romania, Chad, Andorra, Moldova (blue-yellow-red vertical)
    ['ID', 'MC', 'PL', 'SG', 'AT', 'PE', 'LV', 'TR', 'TN'], // Red & White (Indonesia, Poland, Monaco, Austria, Peru, Latvia...)
    ['NL', 'LU', 'HR', 'PY', 'FR', 'RU'], // Red-White-Blue tricolors
    ['IE', 'CI', 'IT', 'MX'], // Ireland, Ivory Coast, Italy, Mexico
    ['AU', 'NZ', 'GB', 'FJ', 'TV'], // Union Jack flags
    ['NO', 'IS', 'DK', 'SE', 'FI', 'FO'], // Nordic crosses
    ['CO', 'EC', 'VE'], // Gran Colombia colors
    ['SN', 'ML', 'GN', 'GH', 'ET', 'CG'], // Pan-African colors (Green-Yellow-Red)
    ['BE', 'DE'], // Belgium, Germany
    ['RU', 'SK', 'SI', 'RS', 'HR'], // Slavic tricolors (White-Blue-Red)
    ['EE', 'BW', 'NI', 'HN', 'SV', 'GT', 'AR'], // Blue-White-Black/Blue-White
    ['MY', 'US', 'LR', 'PR', 'CU', 'CL'], // Stripes & Stars themes
    ['AE', 'KW', 'JO', 'PS', 'SD'], // Pan-Arab colors
    ['JP', 'BD', 'PW'], // Circle flags
    ['CH', 'TO', 'TR', 'TN', 'PK', 'MR'], // Star & Crescent or Cross variants
];

// Countries with similar names (Phonetic or textual similarity)
const SIMILAR_NAMES = [
    ['MY', 'MZ', 'MW', 'ML', 'MV', 'MT'], // Malaysia, Mozambique, Malawi, Mali, Maldives, Malta
    ['SK', 'SI'], // Slovakia, Slovenia
    ['GN', 'GW', 'GQ', 'GY', 'GH'], // Guinea group + Guyana + Ghana
    ['DM', 'DO'], // Dominica, Dominican Republic
    ['NE', 'NG'], // Niger, Nigeria
    ['PY', 'UY'], // Paraguay, Uruguay
    ['IQ', 'IR', 'IE'], // Iraq, Iran, Ireland
    ['AT', 'AU'], // Austria, Australia
    ['SE', 'CH', 'SZ'], // Sweden, Switzerland, Eswatini
    ['LV', 'LT', 'LR', 'LB', 'LS', 'LY'], // L-countries
    ['TR', 'TN', 'TM'], // Turkey, Tunisia, Turkmenistan
    ['KP', 'KR'], // Koreas
    ['CD', 'CG'], // Congos
    ['ZM', 'ZW'], // Zambia, Zimbabwe
    ['SO', 'SD', 'SS'], // Somalia, Sudan
];

// Level definitions with creative names
const LEVEL_CONFIG = {
    1: {
        name: { tr: '🌱 Çırak', en: '🌱 Apprentice' },
        info: { tr: 'En bilinen ülkeler ile başla', en: 'Start with the most famous countries' },
        popularity: 20,
        questionsRequired: 15
    },
    2: {
        name: { tr: '🚶 Gezgin', en: '🚶 Traveler' },
        info: { tr: 'Popüler ülkeleri öğren', en: 'Learn popular countries' },
        popularity: 35,
        questionsRequired: 15
    },
    3: {
        name: { tr: '🧭 Kaşif', en: '🧭 Explorer' },
        info: { tr: 'Dünyayı keşfetmeye başla', en: 'Start exploring the world' },
        popularity: 50,
        questionsRequired: 16
    },
    4: {
        name: { tr: '🎣 Balıkçı', en: '🎣 Fisherman' },
        info: { tr: 'Ada ve kıyı ülkeleri', en: 'Island and coastal countries' },
        popularity: 65,
        questionsRequired: 16
    },
    5: {
        name: { tr: '⛵ Denizci', en: '⛵ Sailor' },
        info: { tr: 'Okyanusları aş', en: 'Cross the oceans' },
        popularity: 75,
        questionsRequired: 17
    },
    6: {
        name: { tr: '🏔️ Dağcı', en: '🏔️ Mountaineer' },
        info: { tr: 'Zorlu coğrafyalar', en: 'Difficult geographies' },
        popularity: 85,
        shuffle: true,
        questionsRequired: 17
    },
    7: {
        name: { tr: '📿 Keşiş', en: '📿 Monk' },
        info: { tr: 'Sabır ve bilgelik gerektirir', en: 'Requires patience and wisdom' },
        popularity: 100,
        islands: true,
        questionsRequired: 18
    },
    8: {
        name: { tr: '🎭 İkizler', en: '🎭 Twins' },
        info: { tr: 'Benzer bayraklar! Dikkatli ol!', en: 'Similar flags! Be careful!' },
        similar: true,
        questionsRequired: 18
    },
    9: {
        name: { tr: '🦅 Kartal', en: '🦅 Eagle' },
        info: { tr: 'En nadir ülkeler', en: 'Rarest countries' },
        reverse: true,
        questionsRequired: 19
    },
    10: {
        name: { tr: '👑 Efsane', en: '👑 Legend' },
        info: { tr: 'Gerçek bir bayrak ustası!', en: 'A true flag master!' },
        hardcore: true,
        questionsRequired: 20
    }
};


// ==================== //
// API Functions
// ==================== //

async function fetchCountries() {
    const apiUrls = [
        'https://restcountries.com/v3.1/all',
        'https://restcountries.com/v3/all'
    ];

    // Try API first
    for (let i = 0; i < apiUrls.length; i++) {
        try {
            console.log(`API'ye bağlanılıyor: ${apiUrls[i]}`);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch(apiUrls[i], {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            clearTimeout(timeoutId);

            // Validate data
            state.countries = data.filter(country =>
                country.flags &&
                country.flags.png &&
                country.name &&
                country.name.common
            );

            console.log(`✅ ${state.countries.length} ülke başarıyla yüklendi (API)`);
            return state.countries;
        } catch (error) {
            console.error(`API hatası (${apiUrls[i]}):`, error.message);
        }
    }

    // API failed, use demo data
    console.warn('⚠️ API kullanılamıyor, demo veri kullanılıyor...');

    if (typeof DEMO_COUNTRIES !== 'undefined' && DEMO_COUNTRIES.length > 0) {
        state.countries = DEMO_COUNTRIES;
        console.log(`✅ ${state.countries.length} ülke yüklendi (Demo Veri)`);

        // Show user notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <strong>ℹ️ Demo Mod</strong><br>
            <small>REST Countries API'sine bağlanılamadı. ${state.countries.length} demo ülke ile çalışıyorsunuz.</small>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        return state.countries;
    }

    // No data available at all
    alert('Bayraklar yüklenirken bir hata oluştu.\n\nMuhtemel nedenler:\n- İnternet bağlantınızı kontrol edin\n- REST Countries API geçici olarak kullanılamıyor\n\nKonsolu (F12) açarak detaylı hata mesajını görebilirsiniz.');
    return [];
}

// Use global translation helper
function getCountryName(country) {
    if (!country || !country.name || !country.name.common) return '';
    return window.getTranslatedName(country.name.common, state.lang);
}

// ==================== //
// Quiz Functions
// ==================== //

async function startQuiz() {
    state.currentView = 'quiz';

    // Enable full screen game mode
    document.body.classList.add('game-mode-active');

    // Scroll to top for mobile
    window.scrollTo(0, 0);

    // Check if we have enough countries
    if (state.countries.length === 0) {
        await fetchCountries();
    }

    if (state.countries.length < 10) {
        alert('Yeterli ülke verisi bulunamadı!');
        return;
    }

    // Generate questions based on settings
    generateQuiz();

    // Show quiz view
    document.getElementById('loadingQuiz').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');

    // Reset Lives
    state.quiz.lives = 3;
    state.quiz.extraLifeUsed = false;
    updateLivesDisplay();

    // Start first question
    displayQuestion();
}
function generateQuiz() {
    state.quiz.questions = [];
    state.quiz.currentQuestion = 0;
    state.quiz.score = 0;
    state.quiz.correct = 0;
    state.quiz.incorrect = 0;
    state.quiz.lives = 3;
    state.quiz.maxLives = 3;
    state.quiz.extraLifeUsed = false;

    const { mode, level, region } = state.gameSettings;

    // Filter countries by region first
    let availableCountries = region === 'all'
        ? [...state.countries]
        : state.countries.filter(c => c.region === region);

    // NEW: Filter by difficulty based on game level
    // Level 1 = difficulty 1 only (easy)
    // Level 2 = difficulty 1-2
    // Level 3 = difficulty 1-3
    // Level 4 = difficulty 1-4
    // Level 5+ = all difficulties
    const maxDifficulty = Math.min(level, 5);
    let levelCountries = availableCountries.filter(c => {
        const countryDifficulty = c.difficulty || 3; // Default to medium if not set
        return countryDifficulty <= maxDifficulty;
    });

    // Fallback: If not enough countries with difficulty, use population-based sorting
    if (levelCountries.length < 15) {
        availableCountries.sort((a, b) => (b.population || 0) - (a.population || 0));
        const levelConfig = LEVEL_CONFIG[level];
        const maxIndex = Math.ceil(availableCountries.length * (levelConfig.popularity / 100));
        levelCountries = availableCountries.slice(0, maxIndex);
    }

    // Apply special level modes
    const levelConfig = LEVEL_CONFIG[level];

    // For higher levels, reverse or shuffle differently
    if (levelConfig.reverse) {
        levelCountries = levelCountries.reverse();
    }

    // Similar flags mode - Level 8
    if (levelConfig.similar) {
        levelCountries = getSimilarFlagsCountries(availableCountries);
    }

    // Ensure we have enough countries
    if (levelCountries.length < 10) {
        levelCountries = availableCountries;
    }

    // Shuffle and select countries for quiz
    const shuffled = [...levelCountries].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, state.quiz.totalQuestions);

    selected.forEach(correctCountry => {
        let wrongAnswers;

        // Use smart distractors for all levels to prevent elimination method
        // But respect "similar" mode which forces only very similar ones if possible
        const forceSimilar = levelConfig.similar || false;
        wrongAnswers = getSmartDistractors(correctCountry, availableCountries, 3, forceSimilar);

        // Combine and shuffle options
        const options = [correctCountry, ...wrongAnswers]
            .sort(() => Math.random() - 0.5);

        state.quiz.questions.push({
            flag: correctCountry.flags.png,
            correctAnswer: correctCountry.name.common,
            options: options,
            optionNames: options.map(c => c.name.common),
            optionFlags: options.map(c => c.flags.png),
            info: correctCountry,
            mode: mode
        });
    });
}

// Get countries with similar flags
function getSimilarFlagsCountries(allCountries) {
    const similarCountries = [];
    const countryCodes = allCountries.map(c => c.cca2 || '');

    SIMILAR_FLAGS.forEach(group => {
        group.forEach(code => {
            const country = allCountries.find(c => c.cca2 === code);
            if (country && !similarCountries.find(sc => sc.cca2 === code)) {
                similarCountries.push(country);
            }
        });
    });

    // Add more countries if needed
    if (similarCountries.length < 30) {
        const remaining = allCountries.filter(c => !similarCountries.find(sc => sc.cca2 === c.cca2));
        similarCountries.push(...remaining.slice(0, 30 - similarCountries.length));
    }

    return similarCountries;
}

// Smart Distractor Generation
function getSmartDistractors(correctCountry, allCountries, count = 3, forceHard = false) {
    const correctCode = correctCountry.cca2;
    // Helper to check identity safely (fallback to name if cca2 missing)
    const isSameCountry = (c1, c2) => {
        if (c1.cca2 && c2.cca2) return c1.cca2 === c2.cca2;
        return c1.name.common === c2.name.common;
    };

    let pool = [];

    // 1. Look for Similar Flags (Only works if we have codes)
    if (correctCode) {
        const flagGroup = SIMILAR_FLAGS.find(group => group.includes(correctCode));
        if (flagGroup) {
            pool.push(...flagGroup.filter(code => code !== correctCode));
        }

        // 2. Look for Similar Names
        const nameGroup = SIMILAR_NAMES.find(group => group.includes(correctCode));
        if (nameGroup) {
            pool.push(...nameGroup.filter(code => code !== correctCode));
        }
    }

    // Convert codes to country objects
    // If we have codes in pool, find them. 
    let candidateCountries = [];

    if (pool.length > 0) {
        candidateCountries = pool
            .map(code => allCountries.find(c => c.cca2 === code))
            .filter(c => c !== undefined && !isSameCountry(c, correctCountry));
    }

    // Remove duplicates
    candidateCountries = [...new Set(candidateCountries)];

    // 3. Look for Same Subregion/Region
    // This is the fallback that MUST work even without cca2
    if (candidateCountries.length < count) {
        // Filter out existing candidates and the correct country
        const regionCandidates = allCountries.filter(c =>
            !isSameCountry(c, correctCountry) &&
            !candidateCountries.some(cc => isSameCountry(cc, c)) &&
            (c.subregion === correctCountry.subregion || c.region === correctCountry.region)
        ).sort(() => Math.random() - 0.5);

        candidateCountries.push(...regionCandidates);
    }

    // 4. Global fallback
    if (candidateCountries.length < count) {
        const remaining = allCountries.filter(c =>
            !isSameCountry(c, correctCountry) &&
            !candidateCountries.some(cc => isSameCountry(cc, c))
        ).sort(() => Math.random() - 0.5);
        candidateCountries.push(...remaining);
    }

    // Return exact count
    return candidateCountries.slice(0, count);
}

function displayQuestion() {
    const question = state.quiz.questions[state.quiz.currentQuestion];
    const mode = state.gameSettings.mode;

    // Update progress
    const progress = ((state.quiz.currentQuestion + 1) / state.quiz.totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Update counter
    document.getElementById('currentQuestion').textContent = state.quiz.currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = state.quiz.totalQuestions;

    // Start Timer
    startQuizTimer();

    // Update lives display
    updateLivesDisplay();

    const flagDisplay = document.querySelector('.flag-display');
    const questionText = document.querySelector('.question-text');

    // Reset Question Text Style and Content
    questionText.className = 'question-text'; // Remove correct/incorrect classes
    questionText.style.transform = 'scale(1)';

    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';

    if (mode === 'flagToName') {
        // Mode 1: Show flag, select country name
        flagDisplay.querySelector('.flag-card').classList.remove('hidden');
        const flagImg = document.getElementById('flagImage');
        flagImg.src = question.flag;
        flagImg.alt = `Bayrak`;

        questionText.textContent = state.lang === 'en' ? 'Which country does this flag belong to?' : 'Bu bayrak hangi ülkeye ait?';

        optionsGrid.className = 'options-grid';

        // Use question.options (Objects) instead of optionNames (Strings)
        question.options.forEach(country => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = getCountryName(country); // Translated name
            button.dataset.country = country.name.common; // English/Unique name for ID
            button.onclick = () => checkAnswer(country.name.common);
            optionsGrid.appendChild(button);
        });
    } else {
        // Mode 2: Show country name, select flag
        flagDisplay.querySelector('.flag-card').classList.add('hidden');

        // Get translated name for the PROMPT
        const correctNameTranslated = getCountryName(question.info);

        const selectText = state.lang === 'en' ? 'Select the flag' : 'bayrağını seçin';
        questionText.innerHTML = `<span style="font-size: 2rem;">🏴</span> <strong>${correctNameTranslated}</strong> ${selectText}`;
        optionsGrid.className = 'flag-options-grid';

        question.options.forEach((country, index) => {
            const button = document.createElement('button');
            button.className = 'flag-option-btn';
            button.dataset.country = country.name.common; // English/Unique name

            const img = document.createElement('img');
            img.src = country.flags.png;
            img.alt = 'Flag option';
            img.className = 'flag-option-img';

            button.appendChild(img);
            button.onclick = () => checkAnswer(country.name.common);
            optionsGrid.appendChild(button);
        });
    }

    // Hide old feedback (just in case)
    document.getElementById('feedback').classList.add('hidden');
}

function updateLivesDisplay() {
    const hearts = [];
    for (let i = 0; i < state.quiz.lives; i++) {
        hearts.push('❤️');
    }
    for (let i = state.quiz.lives; i < state.quiz.maxLives; i++) {
        hearts.push('🖤');
    }

    const quizLivesHearts = document.getElementById('quizLivesHearts');
    if (quizLivesHearts) {
        quizLivesHearts.textContent = hearts.join(' ');
    }

    const livesHearts = document.getElementById('livesHearts');
    if (livesHearts) {
        livesHearts.textContent = hearts.join(' ');
    }
}

function checkAnswer(selected) {
    const question = state.quiz.questions[state.quiz.currentQuestion];

    // Compare unique names (name.common)
    const isCorrect = selected === question.correctAnswer;
    const correctCountry = question.info; // The full country object
    const translatedCorrectName = getCountryName(correctCountry);

    // Stop Timer
    stopQuizTimer();

    // Disable all buttons and update styles
    if (state.gameSettings.mode === 'flagToName') {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;

            // Check based on data-country
            if (btn.dataset.country === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.dataset.country === selected && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
    } else {
        // Disable flag buttons
        const buttons = document.querySelectorAll('.flag-option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.country === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.dataset.country === selected && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
    }

    // Update stats - level-based scoring
    const levelMultiplier = state.gameSettings.level;
    if (isCorrect) {
        state.quiz.correct++;
        state.quiz.score += 10 * levelMultiplier;
    } else {
        state.quiz.incorrect++;
        state.quiz.lives--;
        updateLivesDisplay();
    }

    updateStatsBar();

    // Show Feedback IN PLACE of the Question Text
    const questionText = document.querySelector('.question-text');
    const correctMsg = state.lang === 'en' ? 'Correct!' : 'Doğru!';
    const wrongMsg = state.lang === 'en' ? 'Wrong! Answer:' : 'Yanlış! Cevap:';

    questionText.innerHTML = isCorrect
        ? `<span style="font-size: 1.5em">✅</span> ${correctMsg} ${translatedCorrectName}`
        : `<span style="font-size: 1.5em">❌</span> ${wrongMsg} ${translatedCorrectName}`;

    questionText.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Check for lives
    if (state.quiz.lives <= 0) {
        setTimeout(() => {
            if (!state.quiz.extraLifeUsed) {
                showExtraLifeModal();
            } else {
                showGameOver();
            }
        }, 1500);
        return;
    }

    // Move to next question after delay
    setTimeout(() => {
        state.quiz.currentQuestion++;

        if (state.quiz.currentQuestion < state.quiz.totalQuestions) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showExtraLifeModal() {
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('extraLifeModal').classList.remove('hidden');
}

function hideExtraLifeModal() {
    document.getElementById('extraLifeModal').classList.add('hidden');
}

function useExtraLife() {
    state.quiz.extraLifeUsed = true;
    state.quiz.lives = 1;
    hideExtraLifeModal();
    document.getElementById('quizContent').classList.remove('hidden');
    updateLivesDisplay();

    // Continue to next question
    state.quiz.currentQuestion++;
    if (state.quiz.currentQuestion < state.quiz.totalQuestions) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showGameOver() {
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('extraLifeModal').classList.add('hidden');
    document.getElementById('gameOverModal').classList.remove('hidden');

    document.getElementById('gameOverQuestion').textContent = state.quiz.currentQuestion + 1;
    document.getElementById('gameOverTotal').textContent = state.quiz.totalQuestions;
}

function hideGameOver() {
    document.getElementById('gameOverModal').classList.add('hidden');
}

function showResults() {
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');

    const accuracy = Math.round((state.quiz.correct / state.quiz.totalQuestions) * 100);
    const levelConfig = LEVEL_CONFIG[state.gameSettings.level];
    const passed = state.quiz.correct >= (levelConfig.questionsRequired || 15);

    document.getElementById('resultsPercentage').textContent = `${accuracy}%`;
    document.getElementById('resultsCorrect').textContent = state.quiz.correct;
    document.getElementById('resultsIncorrect').textContent = state.quiz.incorrect;
    document.getElementById('resultsScore').textContent = state.quiz.score;

    // Message based on performance
    let message = '';
    if (passed && state.gameSettings.level < 10) {
        message = state.lang === 'en'
            ? `🎉 Level ${state.gameSettings.level} completed! Level ${state.gameSettings.level + 1} unlocked!`
            : `🎉 Seviye ${state.gameSettings.level} tamamlandı! Seviye ${state.gameSettings.level + 1} açıldı!`;

        // Unlock next level //selam
        if (state.gameSettings.level >= state.unlockedLevel) {
            state.unlockedLevel = state.gameSettings.level + 1;
            saveUnlockedLevel();
        }
    } else if (accuracy === 100) {
        message = state.lang === 'en' ? '🏆 Perfect! Amazing!' : '🏆 Mükemmel! Harikasın!';
    } else if (accuracy >= 80) {
        message = state.lang === 'en' ? '🎉 Great job!' : '🎉 Muhteşem! Çok iyisin!';
    } else if (accuracy >= 60) {
        message = state.lang === 'en' ? '👍 Good work!' : '👍 İyi iş! Gelişiyorsun!';
    } else if (accuracy >= 40) {
        message = state.lang === 'en' ? '💪 Not bad! Keep practicing!' : '💪 Fena değil! Pratik yap!';
    } else {
        message = state.lang === 'en' ? '📚 Keep learning!' : '📚 Devam et! Öğreniyorsun!';
    }

    document.getElementById('resultsMessage').textContent = message;

    // Update overall stats
    updateOverallStats();
}

function updateOverallStats() {
    state.stats.totalGames++;
    state.stats.totalCorrect += state.quiz.correct;
    state.stats.totalIncorrect += state.quiz.incorrect;
    state.stats.totalScore += state.quiz.score;

    if (state.quiz.score > state.stats.bestScore) {
        state.stats.bestScore = state.quiz.score;
    }

    saveStats();
    updateStatsView();
}

function updateStatsBar() {
    document.getElementById('scoreValue').textContent = state.quiz.score;
    document.getElementById('correctValue').textContent = state.quiz.correct;
    document.getElementById('incorrectValue').textContent = state.quiz.incorrect;

    const totalAnswered = state.quiz.correct + state.quiz.incorrect;
    const accuracy = totalAnswered > 0
        ? Math.round((state.quiz.correct / totalAnswered) * 100)
        : 0;
    document.getElementById('accuracyValue').textContent = `${accuracy}%`;
}

async function startQuiz() {
    document.body.classList.add('game-mode-active');
    document.getElementById('loadingQuiz').classList.remove('hidden');
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');

    if (state.countries.length === 0) {
        await fetchCountries();
    }

    if (state.countries.length > 0) {
        generateQuiz();
        displayQuestion();

        document.getElementById('loadingQuiz').classList.add('hidden');
        document.getElementById('quizContent').classList.remove('hidden');

        updateStatsBar();
    }
}

function startQuizTimer() {
    stopQuizTimer();
    let timeLeft = 15;
    const timerDisplay = document.getElementById('timerSeconds');
    const timerContainer = document.getElementById('quizTimer');

    if (timerDisplay) timerDisplay.textContent = timeLeft;
    if (timerContainer) timerContainer.classList.remove('warning');

    state.quiz.timerInterval = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.textContent = timeLeft;

        if (timeLeft <= 5 && timerContainer) {
            timerContainer.classList.add('warning');
        }

        if (timeLeft <= 0) {
            stopQuizTimer();
            // Automatically mark as wrong
            checkAnswer(null);
        }
    }, 1000);
}

function stopQuizTimer() {
    if (state.quiz.timerInterval) {
        clearInterval(state.quiz.timerInterval);
        state.quiz.timerInterval = null;
    }
}

// ==================== //
// Explore Functions
// ==================== //

async function displayCountries(filter = { search: '', region: 'all' }) {
    document.getElementById('loadingExplore').classList.remove('hidden');
    document.getElementById('countriesGrid').innerHTML = '';

    if (state.countries.length === 0) {
        await fetchCountries();
    }

    // Filter countries
    let filtered = state.countries;

    if (filter.region !== 'all') {
        filtered = filtered.filter(c => c.region === filter.region);
    }

    if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.common.toLowerCase().includes(searchLower) ||
            (c.name.official && c.name.official.toLowerCase().includes(searchLower))
        );
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.name.common.localeCompare(b.name.common, 'tr'));

    // Display countries
    const grid = document.getElementById('countriesGrid');
    grid.innerHTML = '';

    filtered.forEach(country => {
        const card = createCountryCard(country);
        grid.appendChild(card);
    });

    document.getElementById('loadingExplore').classList.add('hidden');

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); font-size: 1.25rem;">Ülke bulunamadı</p>';
    }
}

function createCountryCard(country) {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.onclick = () => showCountryModal(country);

    const flag = document.createElement('img');
    flag.className = 'country-flag';
    flag.src = country.flags.png;
    flag.alt = `${country.name.common} bayrağı`;
    flag.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'country-info';

    const name = document.createElement('div');
    name.className = 'country-name';
    // Use translated name
    name.textContent = getCountryName(country);

    const details = document.createElement('div');
    details.className = 'country-details';

    const region = document.createElement('div');
    region.className = 'country-detail';
    region.innerHTML = `<strong>Bölge:</strong> ${country.region || 'Bilgi yok'}`;

    const capital = document.createElement('div');
    capital.className = 'country-detail';
    capital.innerHTML = `<strong>Başkent:</strong> ${country.capital ? country.capital[0] : 'Bilgi yok'}`;

    const population = document.createElement('div');
    population.className = 'country-detail';
    const popFormatted = country.population ? country.population.toLocaleString('tr-TR') : 'Bilgi yok';
    population.innerHTML = `<strong>Nüfus:</strong> ${popFormatted}`;

    details.appendChild(region);
    details.appendChild(capital);
    details.appendChild(population);

    info.appendChild(name);
    info.appendChild(details);

    card.appendChild(flag);
    card.appendChild(info);

    return card;
}

function showCountryModal(country) {
    const modal = document.getElementById('countryModal');
    const modalBody = document.getElementById('modalBody');

    // Translated name
    const displayName = getCountryName(country);

    modalBody.innerHTML = `
        <img src="${country.flags.png}" alt="${displayName}" class="modal-flag">
        <h2 class="modal-title">${displayName}</h2>
        ${country.name.official ? `<p class="modal-native-name">${country.name.official}</p>` : ''}
        
        <div class="modal-details">
            <div class="modal-detail-group">
                <h3>Genel Bilgiler</h3>
                <div class="modal-detail-item">
                    <strong>Başkent:</strong>
                    <span>${country.capital ? country.capital[0] : 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Bölge:</strong>
                    <span>${country.region || 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Alt Bölge:</strong>
                    <span>${country.subregion || 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Nüfus:</strong>
                    <span>${country.population ? country.population.toLocaleString('tr-TR') : 'Bilgi yok'}</span>
                </div>
            </div>
            
            <div class="modal-detail-group">
                <h3>Diğer Bilgiler</h3>
                <div class="modal-detail-item">
                    <strong>Alan:</strong>
                    <span>${country.area ? country.area.toLocaleString('tr-TR') + ' km²' : 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Para Birimi:</strong>
                    <span>${country.currencies ? Object.values(country.currencies)[0]?.name : 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Diller:</strong>
                    <span>${country.languages ? Object.values(country.languages).join(', ') : 'Bilgi yok'}</span>
                </div>
                <div class="modal-detail-item">
                    <strong>Zaman Dilimi:</strong>
                    <span>${country.timezones ? country.timezones[0] : 'Bilgi yok'}</span>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// ==================== //
// Stats Functions
// ==================== //

function updateStatsView() {
    const totalQuestions = state.stats.totalCorrect + state.stats.totalIncorrect;
    const accuracy = totalQuestions > 0
        ? Math.round((state.stats.totalCorrect / totalQuestions) * 100)
        : 0;

    document.getElementById('totalAccuracy').textContent = `${accuracy}%`;
    document.getElementById('totalGames').textContent = state.stats.totalGames;
    document.getElementById('totalQuestionsAnswered').textContent = totalQuestions;
    document.getElementById('totalScore').textContent = state.stats.totalScore;
    document.getElementById('totalCorrect').textContent = state.stats.totalCorrect;
    document.getElementById('totalIncorrect').textContent = state.stats.totalIncorrect;
    document.getElementById('bestScore').textContent = state.stats.bestScore;
}

function resetStats() {
    if (confirm('Tüm istatistiklerinizi silmek istediğinizden emin misiniz?')) {
        state.stats = {
            totalGames: 0,
            totalCorrect: 0,
            totalIncorrect: 0,
            totalScore: 0,
            bestScore: 0
        };
        saveStats();
        updateStatsView();
        alert('İstatistikler sıfırlandı!');
    }
}

// ==================== //
// Local Storage
// ==================== //

function saveStats() {
    localStorage.setItem('worldWideFlagStats', JSON.stringify(state.stats));
}

function loadStats() {
    const saved = localStorage.getItem('worldWideFlagStats');
    if (saved) {
        state.stats = JSON.parse(saved);
        updateStatsView();
    }
}

function saveUnlockedLevel() {
    localStorage.setItem('worldWideFlagUnlockedLevel', state.unlockedLevel.toString());
}

function loadUnlockedLevel() {
    const saved = localStorage.getItem('worldWideFlagUnlockedLevel');
    if (saved) {
        state.unlockedLevel = parseInt(saved);
    }
    updateLevelLock();
}

function updateLevelLock() {
    const level = state.gameSettings.level;
    const isLocked = level > state.unlockedLevel;
    const levelLock = document.getElementById('levelLock');
    const startBtn = document.getElementById('startGameBtn');

    if (levelLock) {
        if (isLocked) {
            levelLock.classList.remove('hidden');
        } else {
            levelLock.classList.add('hidden');
        }
    }

    if (startBtn) {
        startBtn.disabled = isLocked;
        if (isLocked) {
            startBtn.style.opacity = '0.5';
            startBtn.style.cursor = 'not-allowed';
        } else {
            startBtn.style.opacity = '1';
            startBtn.style.cursor = 'pointer';
        }
    }
}

// ==================== //
// Language Functions
// ==================== //

function toggleLang() {
    state.lang = state.lang === 'tr' ? 'en' : 'tr';
    applyLang();
    saveLang();

    // If quiz is currently active and showing a question, refresh it
    const quizContent = document.getElementById('quizContent');
    if (state.currentView === 'quiz' && quizContent && !quizContent.classList.contains('hidden')) {
        // Also ensure we are not in results or modals
        const results = document.getElementById('quizResults');
        if (results && results.classList.contains('hidden')) {
            displayQuestion();
        }
    }

    // Refresh Explore Grid if active
    if (state.currentView === 'explore') {
        const searchInput = document.getElementById('searchInput');
        const regionFilter = document.getElementById('regionFilter');
        displayCountries({
            search: searchInput ? searchInput.value : '',
            region: regionFilter ? regionFilter.value : 'all'
        });
    }
}

function applyLang() {
    const lang = state.lang;

    // Update all translatable elements
    document.querySelectorAll('[data-tr][data-en]').forEach(el => {
        el.textContent = el.dataset[lang];
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-tr][data-placeholder-en]').forEach(el => {
        el.placeholder = el.dataset[`placeholder${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
    });

    // Update select options
    document.querySelectorAll('select option[data-tr][data-en]').forEach(option => {
        option.textContent = option.dataset[lang];
    });

    // Update language text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'tr' ? 'TR' : 'EN';
    }

    // Update level name and info
    const level = state.gameSettings.level;
    const levelConfig = LEVEL_CONFIG[level];
    document.getElementById('levelName').textContent = levelConfig.name[lang];
    document.getElementById('levelInfo').textContent = levelConfig.info[lang];

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function saveLang() {
    localStorage.setItem('worldWideFlagLang', state.lang);
}

function loadLang() {
    const saved = localStorage.getItem('worldWideFlagLang');
    if (saved) {
        state.lang = saved;
    }
    applyLang();
}

// ==================== //
// View Management
// ==================== //

function switchView(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    document.getElementById(`${viewName}View`).classList.add('active');
    state.currentView = viewName;

    // Load view data
    if (viewName === 'quiz') {
        showGameSetup();
    } else if (viewName === 'explore') {
        displayCountries();
    } else if (viewName === 'stats') {
        updateStatsView();
    }
}

function showGameSetup() {
    document.body.classList.remove('game-mode-active');
    // Show Main Menu, hide others
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('settingsPanel').classList.add('hidden');
    document.getElementById('gameSetup').classList.add('hidden'); // Legacy container

    document.getElementById('loadingQuiz').classList.add('hidden');
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('extraLifeModal').classList.add('hidden');
    document.getElementById('gameOverModal').classList.add('hidden');

    // Reset lives display
    state.quiz.lives = 3;
    state.quiz.extraLifeUsed = false;
    updateLivesDisplay();

    // Update level lock status
    updateLevelLock();

    // Update UI elements based on current settings
    updateSettingsUI();
}

function updateSettingsUI() {
    const lang = state.lang;
    const level = state.gameSettings.level;

    // Update Level Info
    document.getElementById('levelName').textContent = LEVEL_CONFIG[level].name[lang];
    document.getElementById('levelInfo').textContent = LEVEL_CONFIG[level].info[lang];

    // Update Mode Badge
    const modeBadge = document.getElementById('currentMode');
    const modeIcon = state.gameSettings.mode === 'flagToName' ? '🏴' : '📝';
    const modeText = state.gameSettings.mode === 'flagToName'
        ? (lang === 'tr' ? 'Bayrak → İsim' : 'Flag → Name')
        : (lang === 'tr' ? 'İsim → Bayrak' : 'Name → Flag');

    modeBadge.querySelector('.badge-icon').textContent = modeIcon;
    modeBadge.querySelector('span:last-child').textContent = modeText;

    // Update Region Badge
    const regionBadge = document.getElementById('currentRegion');
    const regionNames = {
        'all': { tr: 'Tüm Dünya', en: 'All World' },
        'Europe': { tr: 'Avrupa', en: 'Europe' },
        'Asia': { tr: 'Asya', en: 'Asia' },
        'Americas': { tr: 'Amerika', en: 'Americas' },
        'Africa': { tr: 'Afrika', en: 'Africa' },
        'Oceania': { tr: 'Okyanusya', en: 'Oceania' }
    };

    // Icon for world changed
    const regionIcons = {
        'all': '🗺️',
        'Europe': '🏰',
        'Asia': '🏯',
        'Americas': '🗽',
        'Africa': '🦁',
        'Oceania': '🐨'
    };

    const regionText = regionNames[state.gameSettings.region][lang];
    regionBadge.querySelector('.badge-icon').textContent = regionIcons[state.gameSettings.region] || '🌍';
    regionBadge.querySelector('span:last-child').textContent = regionText;

    // Update Slider Progress Bar
    const slider = document.getElementById('levelSlider');
    if (slider) {
        updateSliderProgress(slider);
    }
}

function updateSliderProgress(slider) {
    const min = slider.min || 1;
    const max = slider.max || 10;
    const val = slider.value;
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.backgroundSize = `${percentage}% 100%`;
}

// ==================== //
// Event Listeners
// ==================== //

function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.view);
        });
    });

    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            toggleLang();
            updateSettingsUI(); // Update UI when lang changes
        });
    }

    // Search & Region Filter (Explore Page)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const search = e.target.value;
            const region = document.getElementById('regionFilter').value;
            displayCountries({ search, region });
        });
    }

    const regionFilter = document.getElementById('regionFilter');
    if (regionFilter) {
        regionFilter.addEventListener('change', (e) => {
            const region = e.target.value;
            const search = document.getElementById('searchInput').value;
            displayCountries({ search, region });
        });
    }

    // Modal close
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('countryModal').classList.add('hidden');
    });

    document.getElementById('modalOverlay').addEventListener('click', () => {
        document.getElementById('countryModal').classList.add('hidden');
    });

    // Reset stats
    document.getElementById('resetStats').addEventListener('click', resetStats);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('countryModal').classList.add('hidden');
        }
    });

    // ==================== //
    // NEW Settings Menu Listeners
    // ==================== //

    // Open Settings
    document.getElementById('openSettingsBtn').addEventListener('click', () => {
        document.getElementById('settingsPanel').classList.remove('hidden');
        document.getElementById('mainMenu').classList.add('hidden');
    });

    // Close Settings (X button)
    document.getElementById('closeSettingsBtn').addEventListener('click', () => {
        document.getElementById('settingsPanel').classList.add('hidden');
        document.getElementById('mainMenu').classList.remove('hidden');
    });

    // Save Settings
    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
        document.getElementById('settingsPanel').classList.add('hidden');
        document.getElementById('mainMenu').classList.remove('hidden');
        updateSettingsUI();
    });

    // Mode buttons (in Settings)
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.gameSettings.mode = btn.dataset.mode;
        });
    });

    // Region buttons (in Settings)
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.gameSettings.region = btn.dataset.region;
        });
    });

    // Level slider (in Main Menu)
    const levelSlider = document.getElementById('levelSlider');
    if (levelSlider) {
        levelSlider.addEventListener('input', (e) => {
            const level = parseInt(e.target.value);
            state.gameSettings.level = level;
            updateSettingsUI(); // Included slider updating
            updateLevelLock();
            updateSliderProgress(e.target);
        });
    }

    // Start game button
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', async () => {
            if (state.gameSettings.level > state.unlockedLevel) {
                const message = state.lang === 'en'
                    ? 'This level is locked! Complete previous levels first.'
                    : 'Bu seviye kilitli! Önce önceki seviyeleri tamamla.';
                alert(message);
                return;
            }
            document.getElementById('mainMenu').classList.add('hidden');
            await startQuiz();
        });
    }

    // Extra life button
    const extraLifeBtn = document.getElementById('extraLifeBtn');
    if (extraLifeBtn) {
        extraLifeBtn.addEventListener('click', useExtraLife);
    }

    // Give up button
    const giveUpBtn = document.getElementById('giveUpBtn');
    if (giveUpBtn) {
        giveUpBtn.addEventListener('click', () => {
            hideExtraLifeModal();
            showGameOver();
        });
    }

    // Retry button
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            hideGameOver();
            showGameSetup();
        });
    }

    // Restart quiz
    document.getElementById('restartQuiz').addEventListener('click', showGameSetup);

    // Game Exit Button
    const gameExitBtn = document.getElementById('gameExitBtn');
    if (gameExitBtn) {
        gameExitBtn.addEventListener('click', () => {
            if (confirm(state.lang === 'en' ? 'Quit game?' : 'Oyundan çıkmak istiyor musunuz?')) {
                showGameSetup();
            }
        });
    }
}

// ==================== //
// Initialization
// ==================== //

async function init() {
    console.log('🌍 WorldWideFlag başlatılıyor...');

    // Load saved data
    loadStats();
    loadUnlockedLevel();

    // Initialize event listeners
    initializeEventListeners();

    // Load language (after event listeners so it can update UI)
    loadLang();

    // Preload countries in background
    fetchCountries().then(() => {
        console.log('✅ Country data ready!');
    });

    // Show game setup screen
    showGameSetup();

    // ==================== //
    // Easter Egg: Plaka Quiz
    // ==================== //
    const TURKEY_CITIES = [
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
        "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
        "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
        "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
        "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
        "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
        "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
        "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
    ];

    let logoClicks = 0;
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transition = 'transform 0.2s ease';
        logo.addEventListener('click', () => {
            logoClicks++;

            // Visual feedback
            logo.style.transform = 'scale(0.95)';
            setTimeout(() => { logo.style.transform = 'scale(1)'; }, 100);

            if (logoClicks >= 5) {
                logoClicks = 0;
                startPlakaQuiz();
            }
            // Reset clicks after 2 seconds of inactivity
            clearTimeout(logo.clickTimeout);
            logo.clickTimeout = setTimeout(() => { logoClicks = 0; }, 2000);
        });
    }

    const plakaState = {
        currentQuestion: 0,
        lives: 3,
        correctCityIndex: -1,
        timerInterval: null
    };

    function startPlakaQuiz() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            container.style.opacity = '0';
            container.style.transform = 'scale(1.1)';

            setTimeout(() => {
                document.body.classList.add('game-mode-active');
                switchView('plaka');
                window.scrollTo(0, 0); // Scroll to top for mobile
                plakaState.currentQuestion = 1;
                plakaState.lives = 3;
                updatePlakaLives();

                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
                nextPlakaQuestion();
            }, 500);
        } else {
            document.body.classList.add('game-mode-active');
            switchView('plaka');
            nextPlakaQuestion();
        }
    }

    function nextPlakaQuestion() {
        if (plakaState.lives <= 0) {
            alert(state.lang === 'tr' ? 'Oyun Bitti!' : 'Game Over!');
            document.body.classList.remove('game-mode-active');
            switchView('quiz');
            return;
        }

        if (plakaState.currentQuestion > 20) {
            alert(state.lang === 'tr' ? 'Tebrikler! Tüm plakaları bildin.' : 'Congratulations! You knew all the plates.');
            document.body.classList.remove('game-mode-active');
            switchView('quiz');
            return;
        }

        const questionText = document.querySelector('#plakaView .question-text');
        questionText.textContent = state.lang === 'tr' ? 'Bu plaka kodu hangi ile ait?' : 'Which city does this plate code belong to?';
        questionText.style.color = 'var(--color-1)';

        document.getElementById('plakaCounter').textContent = `${plakaState.currentQuestion}/20`;
        const correctIndex = Math.floor(Math.random() * 81);
        plakaState.correctCityIndex = correctIndex;

        const plateNum = (correctIndex + 1).toString().padStart(2, '0');
        document.getElementById('plakaNumber').textContent = plateNum;

        // Start Plaka Timer
        startPlakaTimer();

        // Generate options
        const options = [correctIndex];
        while (options.length < 4) {
            const rand = Math.floor(Math.random() * 81);
            if (!options.includes(rand)) options.push(rand);
        }
        options.sort(() => Math.random() - 0.5);

        const optionsGrid = document.getElementById('plakaOptions');
        optionsGrid.innerHTML = '';
        options.forEach(idx => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = TURKEY_CITIES[idx];
            btn.onclick = () => checkPlakaAnswer(idx, btn);
            optionsGrid.appendChild(btn);
        });
    }

    function checkPlakaAnswer(selectedIdx, btn) {
        const isCorrect = selectedIdx === plakaState.correctCityIndex;
        const questionText = document.querySelector('#plakaView .question-text');
        const correctCity = TURKEY_CITIES[plakaState.correctCityIndex];

        // Stop Plaka Timer
        stopPlakaTimer();

        const buttons = document.querySelectorAll('#plakaOptions .option-btn');
        buttons.forEach(b => b.disabled = true);

        if (isCorrect) {
            btn.style.backgroundColor = 'var(--success)';
            btn.style.color = 'white';
            questionText.innerHTML = `✅ ${state.lang === 'tr' ? 'Doğru!' : 'Correct!'} <strong>${correctCity}</strong>`;
            questionText.style.color = 'var(--success)';
        } else {
            btn.style.backgroundColor = 'var(--error)';
            btn.style.color = 'white';
            questionText.innerHTML = `❌ ${state.lang === 'tr' ? 'Yanlış! Cevap:' : 'Wrong! Answer:'} <strong>${correctCity}</strong>`;
            questionText.style.color = 'var(--error)';
            plakaState.lives--;
            updatePlakaLives();
        }

        setTimeout(() => {
            plakaState.currentQuestion++;
            nextPlakaQuestion();
        }, 1500);
    }

    function updatePlakaLives() {
        const hearts = '❤️'.repeat(Math.max(0, plakaState.lives)) + '🖤'.repeat(Math.max(0, 3 - plakaState.lives));
        document.getElementById('plakaLivesHearts').textContent = hearts;
    }

    function startPlakaTimer() {
        stopPlakaTimer();
        let timeLeft = 15;
        const timerDisplay = document.getElementById('plakaTimerSeconds');
        const timerContainer = document.getElementById('plakaTimer');

        if (timerDisplay) timerDisplay.textContent = timeLeft;
        if (timerContainer) timerContainer.classList.remove('warning');

        plakaState.timerInterval = setInterval(() => {
            timeLeft--;
            if (timerDisplay) timerDisplay.textContent = timeLeft;

            if (timeLeft <= 5 && timerContainer) {
                timerContainer.classList.add('warning');
            }

            if (timeLeft <= 0) {
                stopPlakaTimer();
                checkPlakaAnswer(-1, null);
            }
        }, 1000);
    }

    function stopPlakaTimer() {
        if (plakaState.timerInterval) {
            clearInterval(plakaState.timerInterval);
            plakaState.timerInterval = null;
        }
    }

    document.getElementById('plakaExitBtn').onclick = () => {
        document.body.classList.remove('game-mode-active');
        switchView('quiz');
    };

    console.log('✅ App ready!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
