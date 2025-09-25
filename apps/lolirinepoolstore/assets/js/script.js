
const translations = {
    en: { welcome: "Welcome to the Pool Store" },
    fr: { welcome: "Bienvenue à la boutique de piscine" },
    nl: { welcome: "Welkom bij de Zwembadwinkel" }
};

function setLanguage(lang) {
    document.getElementById('welcome-message').innerText = translations[lang].welcome;
}
