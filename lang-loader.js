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
        // Homepage translations
        "home-page-title": "CheckReel - Check Before You Post",
        "home-hero-title": "CheckReel",
        "home-hero-subtitle": "Don't guess  check before you post.",
        "home-benefit-1": " Pre-check any video, image or audio",
        "home-benefit-2": " Instant AI-powered compliance report",
        "home-benefit-3": " Your privacy is fully protected",
        "home-subscribe-button": "Subscribe Now",
        "home-subscription-note": "$4.99/month after trial period",
        "home-active-users": "✓ 2,729 active users",
        "home-platforms-title": "Supported Platforms",
        "home-about-title": "About CheckReel",
        "home-about-content": "CheckReel is part of Alwafer Media, specialising in social-media management, AI apps, and precision marketing.",
        
        // Dashboard translations
        "dashboard-title": "CheckReel Dashboard",
        "choose-plan": "Choose Your Plan",
        "selection-alert": "Please select a tier to continue",
        "select-region": "Select Region",
        "select-platform": "Select Target Platform",
        "upload-content": "Upload Content to Check",
        "drop-here": "Drop your file here",
        "click-browse": "or click to browse",
        "start-check": "Start Content Check",
        "analyzing": "Analyzing...",
        "compliance-report": "Compliance Report",
        "compliance-score": "Compliance Score",
        "issues-found": "Issues Found",
        "recommendations": "Recommendations",
        "free-trial": "Free Trial",
        "plus-tier": "Plus",
        "premium-tier": "Premium",
        "scans-left": "scans left",
        "per-month": "mo",
        "recommended": "RECOMMENDED",
        "basic-compliance": "Basic compliance check",
        "standard-results": "Standard results",
        "enhanced-compliance": "Enhanced compliance check",
        "detailed-insights": "Detailed insights",
        "scan-history": "Scan history",
        "priority-support": "Priority support",
        "full-compliance": "Full compliance suite",
        "advanced-analytics": "Advanced analytics",
        "team-features": "Team features",
        "white-label": "White-label reports",
        "api-access": "API access",
        "dedicated-support": "Dedicated support"
    },
    fr: {
        // Homepage translations
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
        
        // Dashboard translations
        "dashboard-title": "Tableau de bord CheckReel",
        "choose-plan": "Choisissez votre plan",
        "selection-alert": "Veuillez sélectionner un niveau pour continuer",
        "select-region": "Sélectionner la région",
        "select-platform": "Sélectionner la plateforme cible",
        "upload-content": "Télécharger le contenu à vérifier",
        "drop-here": "Déposez votre fichier ici",
        "click-browse": "ou cliquez pour parcourir",
        "start-check": "Commencer la vérification",
        "analyzing": "Analyse en cours...",
        "compliance-report": "Rapport de conformité",
        "compliance-score": "Score de conformité",
        "issues-found": "Problèmes trouvés",
        "recommendations": "Recommandations",
        "free-trial": "Essai gratuit",
        "plus-tier": "Plus",
        "premium-tier": "Premium",
        "scans-left": "analyses restantes",
        "per-month": "mois",
        "recommended": "RECOMMANDÉ",
        "basic-compliance": "Vérification de conformité de base",
        "standard-results": "Résultats standards",
        "enhanced-compliance": "Vérification de conformité améliorée",
        "detailed-insights": "Informations détaillées",
        "scan-history": "Historique des analyses",
        "priority-support": "Support prioritaire",
        "full-compliance": "Suite de conformité complète",
        "advanced-analytics": "Analyses avancées",
        "team-features": "Fonctionnalités d'équipe",
        "white-label": "Rapports en marque blanche",
        "api-access": "Accès API",
        "dedicated-support": "Support dédié"
    },
    ar: {
        // Homepage translations
        "home-page-title": "تشيكريل - افحص قبل النشر",
        "home-hero-title": "تشيكريل",
        "home-hero-subtitle": "لا تخمن  افحص قبل النشر.",
        "home-benefit-1": " فحص مسبق لأي فيديو أو صورة أو صوت",
        "home-benefit-2": " تقرير امتثال فوري مدعوم بالذكاء الاصطناعي",
        "home-benefit-3": " خصوصيتك محمية بالكامل",
        "home-subscribe-button": "اشترك الآن",
        "home-subscription-note": "4.99 دولار/شهرياً بعد الفترة التجريبية",
        "home-active-users": " 2,729 مستخدم نشط",
        "home-platforms-title": "المنصات المدعومة",
        "home-about-title": "حول تشيكريل",
        "home-about-content": "تشيكريل هو جزء من الوافر ميديا، متخصصون في إدارة وسائل التواصل الاجتماعي وتطبيقات الذكاء الاصطناعي والتسويق الدقيق.",
        
        // Dashboard translations
        "dashboard-title": "لوحة تحكم تشيكريل",
        "choose-plan": "اختر خطتك",
        "selection-alert": "يرجى اختيار مستوى للمتابعة",
        "select-region": "اختر المنطقة",
        "select-platform": "اختر المنصة المستهدفة",
        "upload-content": "ارفع المحتوى للفحص",
        "drop-here": "اسقط ملفك هنا",
        "click-browse": "أو انقر للاستعراض",
        "start-check": "ابدأ فحص المحتوى",
        "analyzing": "جاري التحليل...",
        "compliance-report": "تقرير الامتثال",
        "compliance-score": "نقاط الامتثال",
        "issues-found": "المشاكل المكتشفة",
        "recommendations": "التوصيات",
        "free-trial": "تجربة مجانية",
        "plus-tier": "بلس",
        "premium-tier": "بريميوم",
        "scans-left": "فحوصات متبقية",
        "per-month": "شهر",
        "recommended": "موصى به",
        "basic-compliance": "فحص امتثال أساسي",
        "standard-results": "نتائج قياسية",
        "enhanced-compliance": "فحص امتثال محسّن",
        "detailed-insights": "رؤى مفصلة",
        "scan-history": "سجل الفحوصات",
        "priority-support": "دعم ذو أولوية",
        "full-compliance": "مجموعة امتثال كاملة",
        "advanced-analytics": "تحليلات متقدمة",
        "team-features": "ميزات الفريق",
        "white-label": "تقارير بعلامة تجارية خاصة",
        "api-access": "الوصول إلى API",
        "dedicated-support": "دعم مخصص"
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


