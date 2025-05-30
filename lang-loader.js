// Safe storage wrapper
const safeStorage = {
    getItem(key) {
        try { return localStorage.getItem(key); }
        catch (e) { return null; }
    },
    setItem(key, value) {
        try { localStorage.setItem(key, value); return true; }
        catch (e) { return false; }
    }
};

// Prevent any manifest errors from crashing the page
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('manifest')) {
        e.preventDefault();
        console.warn('Manifest error caught and prevented');
    }
}, true);

// Complete language content for dashboard
const LANGUAGE_CONTENT = {
    en: {
        // Header
        "scans-left": "scans left",
        "tier-free": "Free Trial",
        "tier-plus": "Plus",
        "tier-premium": "Premium",
        
        // Tier Selection
        "choose-plan": "Choose Your Plan",
        "per-month": "/mo",
        "scans": "scans",
        "scans-month": "scans/month",
        "basic-compliance": "Basic compliance check",
        "standard-results": "Standard results",
        "enhanced-compliance": "Enhanced compliance check",
        "detailed-insights": "Detailed insights",
        "scan-history": "Scan history",
        "priority-support": "Priority support",
        "all-features": "All features included",
        "ai-guidance": "Advanced AI-powered guidance",
        "content-optimization": "Assured content optimization",
        "multi-platform": "Multi-platform scanning (up to 3)",
        "complete-history": "Complete scan history",
        
        // Main Cards
        "select-region": "Select Region",
        "select-platform": "Select Platform",
        "upload-content": "Upload Content",
        "global": "Global",
        "middle-east": "Middle East",
        "mena": "MENA",
        "europe": "Europe",
        
        // Upload Area
        "drop-here": "Drop your content here",
        "click-browse": "or click to browse files",
        "supports": "Supports: MP4, MOV, JPG, PNG, MP3, WAV (max 100MB)",
        "remove-file": "Remove File",
        
        // Selection Alert
        "selection-alert": "Please select a region and platform before uploading content for analysis",
        
        // Scan Button
        "start-check": "Start Content Check",
        "analyzing": "Analyzing...",
        
        // Results
        "compliance-results": "Compliance Results",
        "ready-post": "Ready to Post",
        "needs-review": "Needs Review",
        "do-not-post": "Do Not Post",
        "issues-found": "Issues Found",
        "recommendations": "Recommendations",
        
        // Stats
        "active-users": "Active Users",
        "content-scanned": "Content Scanned",
        "success-rate": "Success Rate",
        "platforms": "Platforms",
        "scans-used": "Scans Used (Testing)",
        
        // Modals
        "select-country": "Select Country",
        "insight-details": "Insight Details",
        
        // Footer
        "footer-text": "� 2025 CheckReel. All rights reserved. Copyright Protected."
    },
    
    ar: {
        // Header
        "scans-left": "?????? ??????",
        "tier-free": "????? ??????",
        "tier-plus": "???",
        "tier-premium": "???????",
        
        // Tier Selection
        "choose-plan": "???? ????",
        "per-month": "/??????",
        "scans": "??????",
        "scans-month": "???/??????",
        "basic-compliance": "??? ?????? ?????",
        "standard-results": "????? ??????",
        "enhanced-compliance": "??? ?????? ?????",
        "detailed-insights": "??? ?????",
        "scan-history": "??? ?????",
        "priority-support": "??? ?? ??????",
        "all-features": "???? ??????? ??????",
        "ai-guidance": "????? ????? ??????? ?????????",
        "content-optimization": "????? ????? ?????",
        "multi-platform": "??? ????? ??????? (??? 3)",
        "complete-history": "??? ??? ????",
        
        // Main Cards
        "select-region": "???? ???????",
        "select-platform": "???? ??????",
        "upload-content": "??? ???????",
        "global": "?????",
        "middle-east": "????? ??????",
        "mena": "????? ?????? ????? ???????",
        "europe": "??????",
        
        // Upload Area
        "drop-here": "???? ??????? ???",
        "click-browse": "?? ???? ????? ???????",
        "supports": "????: MP4? MOV? JPG? PNG? MP3? WAV (??? ???? 100 ????????)",
        "remove-file": "????? ?????",
        
        // Selection Alert
        "selection-alert": "???? ?????? ????? ????? ??? ??? ??????? ???????",
        
        // Scan Button
        "start-check": "??? ??? ???????",
        "analyzing": "???? ???????...",
        
        // Results
        "compliance-results": "????? ????????",
        "ready-post": "???? ?????",
        "needs-review": "????? ??????",
        "do-not-post": "?? ????",
        "issues-found": "??????? ????????",
        "recommendations": "????????",
        
        // Stats
        "active-users": "?????????? ???????",
        "content-scanned": "??????? ???????",
        "success-rate": "???? ??????",
        "platforms": "???????",
        "scans-used": "???????? ????????? (??????)",
        
        // Modals
        "select-country": "???? ??????",
        "insight-details": "?????? ??????",
        
        // Footer
        "footer-text": "� 2025 ???????. ???? ?????? ??????. ???? ????? ????? ??????."
    },
    
    fr: {
        // Header
        "scans-left": "scans restants",
        "tier-free": "Essai gratuit",
        "tier-plus": "Plus",
        "tier-premium": "Premium",
        
        // Tier Selection
        "choose-plan": "Choisissez votre plan",
        "per-month": "/mois",
        "scans": "scans",
        "scans-month": "scans/mois",
        "basic-compliance": "V�rification de conformit� de base",
        "standard-results": "R�sultats standards",
        "enhanced-compliance": "V�rification de conformit� am�lior�e",
        "detailed-insights": "Aper�us d�taill�s",
        "scan-history": "Historique des scans",
        "priority-support": "Support prioritaire",
        "all-features": "Toutes les fonctionnalit�s incluses",
        "ai-guidance": "Conseils avanc�s par IA",
        "content-optimization": "Optimisation de contenu assur�e",
        "multi-platform": "Scan multi-plateforme (jusqu'� 3)",
        "complete-history": "Historique complet des scans",
        
        // Main Cards
        "select-region": "S�lectionner la r�gion",
        "select-platform": "S�lectionner la plateforme",
        "upload-content": "T�l�charger le contenu",
        "global": "Global",
        "middle-east": "Moyen-Orient",
        "mena": "MENA",
        "europe": "Europe",
        
        // Upload Area
        "drop-here": "D�posez votre contenu ici",
        "click-browse": "ou cliquez pour parcourir",
        "supports": "Supporte: MP4, MOV, JPG, PNG, MP3, WAV (max 100 Mo)",
        "remove-file": "Supprimer le fichier",
        
        // Selection Alert
        "selection-alert": "Veuillez s�lectionner une r�gion et une plateforme avant de t�l�charger du contenu",
        
        // Scan Button
        "start-check": "Commencer la v�rification",
        "analyzing": "Analyse en cours...",
        
        // Results
        "compliance-results": "R�sultats de conformit�",
        "ready-post": "Pr�t � publier",
        "needs-review": "N�cessite une r�vision",
        "do-not-post": "Ne pas publier",
        "issues-found": "Probl�mes trouv�s",
        "recommendations": "Recommandations",
        
        // Stats
        "active-users": "Utilisateurs actifs",
        "content-scanned": "Contenu scann�",
        "success-rate": "Taux de r�ussite",
        "platforms": "Plateformes",
        "scans-used": "Scans utilis�s (Test)",
        
        // Modals
        "select-country": "S�lectionner le pays",
        "insight-details": "D�tails de l'aper�u",
        
        // Footer
        "footer-text": "� 2025 CheckReel. Tous droits r�serv�s. Prot�g� par le droit d'auteur."
    }
};

window.loadLanguageContent = function(lang) {
    if (!lang || !LANGUAGE_CONTENT[lang]) {
        console.warn('Invalid language, defaulting to English');
        lang = 'en';
    }
    
    console.log('Loading dashboard language:', lang);
    
    // Set RTL for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.style.direction = 'rtl';
        document.documentElement.style.direction = 'rtl';
    } else {
        document.body.removeAttribute('dir');
        document.documentElement.removeAttribute('dir');
        document.body.style.direction = 'ltr';
        document.documentElement.style.direction = 'ltr';
    }
    
    // Apply translations
    const content = LANGUAGE_CONTENT[lang];
    
    // Update all text elements
    document.querySelectorAll('*').forEach(el => {
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
            const text = el.textContent.trim();
            
            // Direct text replacements
            Object.keys(LANGUAGE_CONTENT.en).forEach(key => {
                if (text === LANGUAGE_CONTENT.en[key]) {
                    el.textContent = content[key];
                }
            });
            
            // Special cases with icons
            if (text === '?? Select Region') el.textContent = `?? ${content['select-region']}`;
            if (text === '?? Select Platform') el.textContent = `?? ${content['select-platform']}`;
            if (text === '?? Upload Content') el.textContent = `?? ${content['upload-content']}`;
            if (text === '?? Choose Your Plan') el.textContent = `?? ${content['choose-plan']}`;
            if (text === '?? Compliance Results') el.textContent = `?? ${content['compliance-results']}`;
            if (text === '?? Issues Found') el.textContent = `?? ${content['issues-found']}`;
            if (text === '?? Recommendations') el.textContent = `?? ${content['recommendations']}`;
            
            // Scan counter
            if (text.includes('scans left')) {
                const num = text.match(/\d+/);
                el.textContent = num ? `${num[0]} ${content['scans-left']}` : content['scans-left'];
            }
            
            // Prices
            if (text === '$4.99/mo') el.textContent = `$4.99${content['per-month']}`;
            if (text === '$9.99/mo') el.textContent = `$9.99${content['per-month']}`;
            
            // Platform names
            const platforms = ['TikTok', 'YouTube', 'Instagram', 'Facebook', 'Twitter', 'Snapchat'];
            if (platforms.includes(text)) {
                // Keep platform names as is (they're brand names)
                return;
            }
        }
    });
    
    // Update specific elements by ID
    const scanBtn = document.getElementById('scan-btn-text');
    if (scanBtn) scanBtn.textContent = content['start-check'];
    
    const selectionAlert = document.getElementById('selectionAlert');
    if (selectionAlert && selectionAlert.textContent.includes('Please select')) {
        selectionAlert.textContent = `?? ${content['selection-alert']}`;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    try {
        const lang = safeStorage.getItem('checkreel_language') || 'en';
        window.loadLanguageContent(lang);
    } catch (e) {
        console.error('Language initialization error:', e);
        window.loadLanguageContent('en');
    }
});

// Export for global access
window.safeStorage = safeStorage;
window.LANGUAGE_CONTENT = LANGUAGE_CONTENT;
