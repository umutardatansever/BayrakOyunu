// Global translations for countries
// Kullanıcının isteği üzerine tüm ülkeler için TR ve EN çevirileri

const COUNTRY_NAMES = {
    // Europe
    "Türkiye": { tr: "Türkiye", en: "Turkey" },
    "Almanya": { tr: "Almanya", en: "Germany" },
    "Fransa": { tr: "Fransa", en: "France" },
    "İtalya": { tr: "İtalya", en: "Italy" },
    "İspanya": { tr: "İspanya", en: "Spain" },
    "Birleşik Krallık": { tr: "Birleşik Krallık", en: "UK" },
    "Hollanda": { tr: "Hollanda", en: "Netherlands" },
    "Belçika": { tr: "Belçika", en: "Belgium" },
    "İsviçre": { tr: "İsviçre", en: "Switzerland" },
    "Avusturya": { tr: "Avusturya", en: "Austria" },
    "İsveç": { tr: "İsveç", en: "Sweden" },
    "Norveç": { tr: "Norveç", en: "Norway" },
    "Danimarka": { tr: "Danimarka", en: "Denmark" },
    "Finlandiya": { tr: "Finlandiya", en: "Finland" },
    "Polonya": { tr: "Polonya", en: "Poland" },
    "Rusya": { tr: "Rusya", en: "Russia" },
    "Yunanistan": { tr: "Yunanistan", en: "Greece" },
    "Portekiz": { tr: "Portekiz", en: "Portugal" },
    "Romanya": { tr: "Romanya", en: "Romania" },
    "Çek Cumhuriyeti": { tr: "Çek Cumhuriyeti", en: "Czech Republic" },
    "Macaristan": { tr: "Macaristan", en: "Hungary" },
    "İrlanda": { tr: "İrlanda", en: "Ireland" },
    "İzlanda": { tr: "İzlanda", en: "Iceland" },
    "Ukrayna": { tr: "Ukrayna", en: "Ukraine" },
    "Sırbistan": { tr: "Sırbistan", en: "Serbia" },
    "Hırvatistan": { tr: "Hırvatistan", en: "Croatia" },
    "Bulgaristan": { tr: "Bulgaristan", en: "Bulgaria" },
    "Arnavutluk": { tr: "Arnavutluk", en: "Albania" },
    "Kuzey Makedonya": { tr: "Kuzey Makedonya", en: "North Macedonia" },
    "Slovenya": { tr: "Slovenya", en: "Slovenia" },
    "Slovakya": { tr: "Slovakya", en: "Slovakia" },
    "Bosna Hersek": { tr: "Bosna Hersek", en: "Bosnia and Herzegovina" },
    "Karadağ": { tr: "Karadağ", en: "Montenegro" },
    "Kosova": { tr: "Kosova", en: "Kosovo" },
    "Moldova": { tr: "Moldova", en: "Moldova" },
    "Belarus": { tr: "Belarus", en: "Belarus" },
    "Litvanya": { tr: "Litvanya", en: "Lithuania" },
    "Letonya": { tr: "Letonya", en: "Latvia" },
    "Estonya": { tr: "Estonya", en: "Estonia" },
    "Lüksemburg": { tr: "Lüksemburg", en: "Luxembourg" },
    "Malta": { tr: "Malta", en: "Malta" },
    "Kıbrıs": { tr: "Kıbrıs", en: "Cyprus" },
    "Monaco": { tr: "Monako", en: "Monaco" },
    "Andorra": { tr: "Andorra", en: "Andorra" },
    "San Marino": { tr: "San Marino", en: "San Marino" },
    "Vatikan": { tr: "Vatikan", en: "Vatican City" },
    "Lihtenştayn": { tr: "Lihtenştayn", en: "Liechtenstein" },

    // Americas
    "Amerika Birleşik Devletleri": { tr: "ABD", en: "USA" },
    "Kanada": { tr: "Kanada", en: "Canada" },
    "Meksika": { tr: "Meksika", en: "Mexico" },
    "Brezilya": { tr: "Brezilya", en: "Brazil" },
    "Arjantin": { tr: "Arjantin", en: "Argentina" },
    "Kolombiya": { tr: "Kolombiya", en: "Colombia" },
    "Şili": { tr: "Şili", en: "Chile" },
    "Peru": { tr: "Peru", en: "Peru" },
    "Venezuela": { tr: "Venezuela", en: "Venezuela" },
    "Ekvador": { tr: "Ekvador", en: "Ecuador" },
    "Küba": { tr: "Küba", en: "Cuba" },
    "Jamaika": { tr: "Jamaika", en: "Jamaica" },
    "Uruguay": { tr: "Uruguay", en: "Uruguay" },
    "Paraguay": { tr: "Paraguay", en: "Paraguay" },
    "Bolivya": { tr: "Bolivya", en: "Bolivia" },

    // Asia
    "Japonya": { tr: "Japonya", en: "Japan" },
    "Çin": { tr: "Çin", en: "China" },
    "Güney Kore": { tr: "Güney Kore", en: "South Korea" },
    "Hindistan": { tr: "Hindistan", en: "India" },
    "Endonezya": { tr: "Endonezya", en: "Indonesia" },
    "Tayland": { tr: "Tayland", en: "Thailand" },
    "Vietnam": { tr: "Vietnam", en: "Vietnam" },
    "Filipinler": { tr: "Filipinler", en: "Philippines" },
    "Malezya": { tr: "Malezya", en: "Malaysia" },
    "Singapur": { tr: "Singapur", en: "Singapore" },
    "Pakistan": { tr: "Pakistan", en: "Pakistan" },
    "Bangladeş": { tr: "Bangladeş", en: "Bangladesh" },
    "İran": { tr: "İran", en: "Iran" },
    "Irak": { tr: "Irak", en: "Iraq" },
    "Suudi Arabistan": { tr: "Suudi Arabistan", en: "Saudi Arabia" },
    "İsrail": { tr: "İsrail", en: "Israel" },
    "Birleşik Arap Emirlikleri": { tr: "BAE", en: "UAE" },
    "Katar": { tr: "Katar", en: "Qatar" },
    "Kuveyt": { tr: "Kuveyt", en: "Kuwait" },
    "Lübnan": { tr: "Lübnan", en: "Lebanon" },
    "Ürdün": { tr: "Ürdün", en: "Jordan" },
    "Azerbaycan": { tr: "Azerbaycan", en: "Azerbaijan" },
    "Gürcistan": { tr: "Gürcistan", en: "Georgia" },
    "Kazakistan": { tr: "Kazakistan", en: "Kazakhstan" },
    "Özbekistan": { tr: "Özbekistan", en: "Uzbekistan" },
    "Kuzey Kore": { tr: "Kuzey Kore", en: "North Korea" },
    "Moğolistan": { tr: "Moğolistan", en: "Mongolia" },
    "Tayvan": { tr: "Tayvan", en: "Taiwan" },
    "Hong Kong": { tr: "Hong Kong", en: "Hong Kong" },

    // Africa
    "Mısır": { tr: "Mısır", en: "Egypt" },
    "Güney Afrika": { tr: "Güney Afrika", en: "South Africa" },
    "Nijerya": { tr: "Nijerya", en: "Nigeria" },
    "Etiyopya": { tr: "Etiyopya", en: "Ethiopia" },
    "Kenya": { tr: "Kenya", en: "Kenya" },
    "Tanzanya": { tr: "Tanzanya", en: "Tanzania" },
    "Cezayir": { tr: "Cezayir", en: "Algeria" },
    "Fas": { tr: "Fas", en: "Morocco" },
    "Tunus": { tr: "Tunus", en: "Tunisia" },
    "Libya": { tr: "Libya", en: "Libya" },
    "Gana": { tr: "Gana", en: "Ghana" },
    "Uganda": { tr: "Uganda", en: "Uganda" },
    "Senegal": { tr: "Senegal", en: "Senegal" },
    "Kamerun": { tr: "Kamerun", en: "Cameroon" },
    "Zimbabve": { tr: "Zimbabve", en: "Zimbabwe" },

    // Oceania
    "Avustralya": { tr: "Avustralya", en: "Australia" },
    "Yeni Zelanda": { tr: "Yeni Zelanda", en: "New Zealand" },
    "Fiji": { tr: "Fiji", en: "Fiji" },
    "Papua Yeni Gine": { tr: "Papua Yeni Gine", en: "Papua New Guinea" }
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
