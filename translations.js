// Global translations for countries
// Kullanıcının isteği üzerine kısa ve net isimler (USA, UK, vb.)

const COUNTRY_NAMES = {
    // North America
    "Amerika Birleşik Devletleri": { tr: "ABD", en: "USA" },
    "Kanada": { tr: "Kanada", en: "Canada" },
    "Meksika": { tr: "Meksika", en: "Mexico" },
    "Küba": { tr: "Küba", en: "Cuba" },

    // Europe
    "Türkiye": { tr: "Türkiye", en: "Turkey" },
    "Almanya": { tr: "Almanya", en: "Germany" },
    "Fransa": { tr: "Fransa", en: "France" },
    "Birleşik Krallık": { tr: "İngiltere", en: "UK" },
    "İtalya": { tr: "İtalya", en: "Italy" },
    "İspanya": { tr: "İspanya", en: "Spain" },
    "Hollanda": { tr: "Hollanda", en: "Netherlands" },
    "Belçika": { tr: "Belçika", en: "Belgium" },
    "İsviçre": { tr: "İsviçre", en: "Switzerland" },
    "Rusya": { tr: "Rusya", en: "Russia" },
    "Ukrayna": { tr: "Ukrayna", en: "Ukraine" },
    "Polonya": { tr: "Polonya", en: "Poland" },
    "Yunanistan": { tr: "Yunanistan", en: "Greece" },
    "Portekiz": { tr: "Portekiz", en: "Portugal" },
    "İsveç": { tr: "İsveç", en: "Sweden" },
    "Norveç": { tr: "Norveç", en: "Norway" },
    "Danimarka": { tr: "Danimarka", en: "Denmark" },
    "Finlandiya": { tr: "Finlandiya", en: "Finland" },
    "Avusturya": { tr: "Avusturya", en: "Austria" },
    "Macaristan": { tr: "Macaristan", en: "Hungary" },
    "Çek Cumhuriyeti": { tr: "Çekya", en: "Czechia" },

    // Asia
    "Japonya": { tr: "Japonya", en: "Japan" },
    "Çin": { tr: "Çin", en: "China" },
    "Güney Kore": { tr: "Güney Kore", en: "South Korea" },
    "Hindistan": { tr: "Hindistan", en: "India" },
    "Endonezya": { tr: "Endonezya", en: "Indonesia" },
    "Pakistan": { tr: "Pakistan", en: "Pakistan" },
    "Azerbaycan": { tr: "Azerbaycan", en: "Azerbaijan" },
    "Suudi Arabistan": { tr: "Suudi Arabistan", en: "Saudi Arabia" },
    "Birleşik Arap Emirlikleri": { tr: "BAE", en: "UAE" },
    "İran": { tr: "İran", en: "Iran" },
    "Irak": { tr: "Irak", en: "Iraq" },

    // South America
    "Brezilya": { tr: "Brezilya", en: "Brazil" },
    "Arjantin": { tr: "Arjantin", en: "Argentina" },
    "Kolombiya": { tr: "Kolombiya", en: "Colombia" },
    "Şili": { tr: "Şili", en: "Chile" },
    "Peru": { tr: "Peru", en: "Peru" },

    // Africa
    "Mısır": { tr: "Mısır", en: "Egypt" },
    "Güney Afrika": { tr: "Güney Afrika", en: "South Africa" },
    "Nijerya": { tr: "Nijerya", en: "Nigeria" },
    "Fas": { tr: "Fas", en: "Morocco" },
    "Cezayir": { tr: "Cezayir", en: "Algeria" },

    // Oceania
    "Avustralya": { tr: "Avustralya", en: "Australia" },
    "Yeni Zelanda": { tr: "Yeni Zelanda", en: "New Zealand" }
};

// Global Translation Helper
window.getTranslatedName = function (originalName, lang) {
    if (!originalName) return "";

    // Check if we have a manual translation
    if (COUNTRY_NAMES[originalName]) {
        return COUNTRY_NAMES[originalName][lang] || originalName;
    }

    // Fallback logic for names not in our list
    return originalName;
};
