if (!window.safeStorage) {
  window.safeStorage = {
    getItem:   (k)=>{ try { return localStorage.getItem(k); } catch { return null } },
    setItem:   (k,v)=>{ try { localStorage.setItem(k,v) } catch {} },
    removeItem:(k)=>{ try { localStorage.removeItem(k) } catch {} }
  };
}
var safeStorage = window.safeStorage;

/* --- end safeStorage guard --- */
// Language content loader for CheckReel
const LANGUAGE_CONTENT = {
    en: {
        "home-page-title": "CheckReel - Check Before You Post",
        "home-hero-title": "CheckReel",
        "home-hero-subtitle": "Don't guess  check before you post.",
        "home-benefit-1": " Pre-check any video, image or audio",
        "home-benefit-2": " Instant AI-powered compliance report",
        "home-benefit-3": " Your privacy is fully protected",
        "home-subscribe-button": "Subscribe Now",
        "home-subscription-note": "$4.99/month after trial period",
        "home-active-users": " 2,729 active users",
        "home-platforms-title": "Supported Platforms",
        "home-about-title": "About CheckReel",
        "home-about-content": "CheckReel is part of Alwafer Media, specialising in social-media management, AI apps, and precision marketing.",
        "dashboard-upload-title": "Upload Content to Check",
        "dashboard-upload-text": "Drag and drop your file here or click to browse",
        "dashboard-platform-title": "Select Target Platform",
        "dashboard-scan-btn": "Start Content Check",
        "dashboard-results-title": "Compliance Report",
        "dashboard-score-label": "Compliance Score",
        "dashboard-issues-title": "Issues Found",
        "dashboard-recommendations-title": "Recommendations",
        "dashboard-upgrade-title": "Upgrade Your Plan",
        "dashboard-upgrade-message": "You've reached your scan limit. Upgrade to continue checking your content."
    },
    fr: {
        "home-page-title": "CheckReel - Vérifiez avant de publier",
        "home-hero-title": "CheckReel",
        "home-hero-subtitle": "Ne devinez pas  vérifiez avant de publier.",
        "home-benefit-1": " Pré-vérifiez toute vidéo, image ou audio",
        "home-benefit-2": " Rapport de conformité instantané avec l'IA",
        "home-benefit-3": " Votre vie privée est entièrement protégée",
        "home-subscribe-button": "S'abonner maintenant",
        "home-subscription-note": "4,99 $/mois après la période d'essai",
        "home-active-users": " 2 729 utilisateurs actifs",
        "home-platforms-title": "Plateformes prises en charge",
        "home-about-title": "À propos de CheckReel",
        "home-about-content": "CheckReel est un service d'Alwafer Media, experts en gestion des réseaux sociaux, applications IA et marketing de précision.",
        "dashboard-upload-title": "Télécharger le contenu à vérifier",
        "dashboard-upload-text": "Glissez et déposez votre fichier ici ou cliquez pour parcourir",
        "dashboard-platform-title": "Sélectionner la plateforme cible",
        "dashboard-scan-btn": "Commencer la vérification",
        "dashboard-results-title": "Rapport de conformité",
        "dashboard-score-label": "Score de conformité",
        "dashboard-issues-title": "Problèmes trouvés",
        "dashboard-recommendations-title": "Recommandations",
        "dashboard-upgrade-title": "Améliorer votre plan",
        "dashboard-upgrade-message": "Vous avez atteint votre limite de scans. Améliorez pour continuer à vérifier votre contenu."
    },
    ar: {
        "home-page-title": "??????? - ???? ??? ?????",
        "home-hero-title": "???????",
        "home-hero-subtitle": "?? ?????? ???? ??? ?????.",
        "home-benefit-1": " ??? ???? ??? ????? ?? ???? ?? ???",
        "home-benefit-2": " ????? ?????? ???? ????? ??????? ?????????",
        "home-benefit-3": " ??????? ????? ???????",
        "home-subscribe-button": "????? ????",
        "home-subscription-note": " ?????/?????? ??? ?????? ?????????",
        "home-active-users": "  ?????? ???",
        "home-platforms-title": "??????? ????????",
        "home-about-title": "??? ???????",
        "home-about-content": "??????? ?? ??? ?? ?????? ?????? ????? ?? ????? ????? ??????? ????????? ???????? ?????? ????????? ???????? ??????.",
        "dashboard-upload-title": "??? ??????? ?????",
        "dashboard-upload-text": "???? ????? ???? ??? ?? ???? ??????",
        "dashboard-platform-title": "???? ?????? ?????????",
        "dashboard-scan-btn": "??? ??? ???????",
        "dashboard-results-title": "????? ????????",
        "dashboard-score-label": "????? ????????",
        "dashboard-issues-title": "??????? ????????",
        "dashboard-recommendations-title": "????????",
        "dashboard-upgrade-title": "????? ????",
        "dashboard-upgrade-message": "??? ???? ??? ?? ????? ????? ??. ?? ???????? ??????? ??? ???????."
    }
};

async function loadLanguageFromFile(lang) {
    try {
        const response = await fetch(`data/${lang}.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.warn(`Could not load ${lang}.json, using embedded content`);
    }
    return LANGUAGE_CONTENT[lang] || LANGUAGE_CONTENT.en;
}

function applyLanguageContent(content) {
    if (content['home-page-title']) {
        document.title = content['home-page-title'];
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = content['home-page-title'];
    }
    
    Object.keys(content).forEach(key => {
        const elementId = key.replace('home-', '').replace('dashboard-', '');
        const element = document.getElementById(elementId);
        
        if (element) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = content[key];
            } else if (element.tagName === 'INPUT') {
                element.placeholder = content[key];
            } else {
                element.textContent = content[key];
            }
        }
        
        const directElement = document.getElementById(key);
        if (directElement) {
            if (directElement.tagName === 'INPUT' && directElement.type === 'submit') {
                directElement.value = content[key];
            } else if (directElement.tagName === 'INPUT') {
                directElement.placeholder = content[key];
            } else {
                directElement.textContent = content[key];
            }
        }
    });
    
    updateSpecialElements(content);
}

function updateSpecialElements(content) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && content['home-hero-title']) {
        heroTitle.textContent = content['home-hero-title'];
    }
    
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle && content['home-hero-subtitle']) {
        heroSubtitle.textContent = content['home-hero-subtitle'];
    }
    
    ['benefit-1', 'benefit-2', 'benefit-3'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element && content[`home-${id}`]) {
            element.textContent = content[`home-${id}`];
        }
    });
    
    updateActiveUsersCount(content);
}

function updateActiveUsersCount(content) {
    const activeUsersEl = document.getElementById('active-users');
    if (!activeUsersEl) return;
    
    const baseCount = 2697;
    let userIncrement = localStorage.getItem('checkreel_user_increment');
    
    if (!userIncrement) {
        userIncrement = Math.floor(Math.random() * 100) + 1;
        localStorage.setItem('checkreel_user_increment', userIncrement.toString());
    }
    
    const totalUsers = baseCount + parseInt(userIncrement);
    
    if (currentLanguage === 'ar') {
        activeUsersEl.textContent = ` ${totalUsers.toLocaleString('ar')} ?????? ???`;
    } else if (currentLanguage === 'fr') {
        activeUsersEl.textContent = ` ${totalUsers.toLocaleString('fr')} utilisateurs actifs`;
    } else {
        activeUsersEl.textContent = ` ${totalUsers.toLocaleString('en')} active users`;
    }
}

async function loadLanguageContent(lang) {
    currentLanguage = lang;
    
    try {
        const content = await loadLanguageFromFile(lang);
        applyLanguageContent(content);
        
        localStorage.setItem('checkreel_language', lang);
        document.documentElement.lang = lang;
        
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
            document.documentElement.removeAttribute('dir');
        }
        
    } catch (error) {
        console.error('Failed to load language content:', error);
        if (lang !== 'en') {
            loadLanguageContent('en');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('checkreel_language') || 'en';
    loadLanguageContent(savedLang);
});

window.loadLanguageContent = loadLanguageContent;
window.LANGUAGE_CONTENT = LANGUAGE_CONTENT;

