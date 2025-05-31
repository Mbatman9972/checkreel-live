/* ---------- GLOBAL SINGLETONS ---------- */
const safeStorage = {
  getItem: k => { try { return localStorage.getItem(k); } catch { return null; } },
  setItem: (k, v) => { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  removeItem: k => { try { localStorage.removeItem(k); return true; } catch { return false; } }
};

let currentLanguage = safeStorage.getItem('checkreel_language') || 'en';
let selectedFile      = null;
let selectedRegion    = null;
let selectedCountry   = null;
let selectedPlatforms = [];
let currentTier       = safeStorage.getItem('checkreel_tier') || 'free';
let scanHistory       = JSON.parse(safeStorage.getItem('checkreel_scan_history') || '[]');

/* ---------- DOM READY ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLanguage).then(() => applyDashboardTranslations());
  hookStaticUI();
  updateTierDisplay();
  updatePlatformCounter();
  updateScansCounter();
  if (currentTier !== 'free') loadScanHistory();
});

/* ---------- LANGUAGE ---------- */
async function loadLanguage(lang) {
  if (window.loadLanguageContent) await window.loadLanguageContent(lang);
  safeStorage.setItem('checkreel_language', lang);
}
function applyDashboardTranslations() {
  const L = window.LANGUAGE_CONTENT?.[currentLanguage] ?? {};
  qs('#scan-btn-text').textContent      = L['dashboard-scan-btn']  ?? 'Start Content Check';
  qs('.tier-selection h2').textContent  = L['dashboard-plan-title']?? '?? Choose Your Plan';
  qs('#selectionAlert').textContent     = L['dashboard-alert']     ?? '?? Please select a region and platform before uploading content for analysis';
  if (currentLanguage === 'ar')  document.body.dir = 'rtl'; else document.body.removeAttribute('dir');
}

/* ---------- SHORTCUTS ---------- */
const qs  = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];

/* ---------- TIER ---------- */
function selectTier(tier){
  currentTier = tier;
  safeStorage.setItem('checkreel_tier',tier);
  qsa('.tier-plan').forEach(p=>p.classList.toggle('active',p.dataset.tier===tier));
  if(tier!=='free') safeStorage.setItem('checkreel_scans_used','0');
  updateTierDisplay(); updateScansCounter(); updatePlatformCounter();
  qs('#scanHistory').classList.toggle('visible',tier!=='free');
}

/* ---------- REGION / PLATFORM ---------- */
function selectRegion(r){
  selectedRegion = r;
  qsa('.region-option').forEach(o=>o.classList.toggle('selected',o.dataset.region===r));
  updateScanButton(); updateSelectionAlert();
}
function selectPlatform(p){
  const isPremium = currentTier==='premium';
  if(isPremium){
    if(selectedPlatforms.includes(p)) selectedPlatforms = selectedPlatforms.filter(x=>x!==p);
    else if(selectedPlatforms.length<3) selectedPlatforms.push(p);
  }else{ selectedPlatforms=[p]; }
  qsa('.platform-option').forEach(o=>o.classList.toggle('selected',selectedPlatforms.includes(o.dataset.platform)));
  updatePlatformCounter(); updateScanButton(); updateSelectionAlert();
}
function updatePlatformCounter(){
  const el = qs('#platformCounter');
  if(!el) return;
  if(currentTier==='premium') el.textContent=`(${selectedPlatforms.length}/3)`;
  else                        el.textContent='';
}

/* ---------- FILE UPLOAD ---------- */
function hookStaticUI(){
  /* tier / region / platform buttons already have inline data-attrs */
  window.selectTier       = selectTier;
  window.selectRegion     = selectRegion;
  window.selectPlatform   = selectPlatform;

  /* upload area */
  const upload  = qs('#uploadArea');
  const input   = qs('#fileInput');
  const infoBox = qs('#fileInfo');
  const rm      = qs('#removeFile');
  upload.addEventListener('click',()=>{ if(checkSelection())input.click(); });
  input.addEventListener('change',e=>{ if(checkSelection()) handleFile(e.target.files[0]); });
  ['dragover','drop','dragleave'].forEach(ev=>upload.addEventListener(ev,e=>e.preventDefault()));
  upload.addEventListener('drop',e=>{ if(checkSelection()) handleFile(e.dataTransfer.files[0]); });
  rm.addEventListener('click',clearFile);

  /* scan button */
  qs('#scanBtn').addEventListener('click',startScan);
}
function checkSelection(){
  if(!selectedRegion||!selectedPlatforms.length){ alert('Select region & platform first'); return false;}
  return true;
}
function handleFile(f){
  if(!f) return;
  const okTypes=['video/mp4','video/quicktime','image/jpeg','image/png','audio/mp3','audio/wav'];
  if(!okTypes.includes(f.type)) return alert('Unsupported file type');
  if(f.size>104857600)          return alert('Max size 100 MB');
  selectedFile=f;
  qs('#fileName').textContent=f.name;
  qs('#fileSize').textContent=(f.size/1024/1024).toFixed(1)+' MB';
  qs('#uploadArea').style.display='none';
  qs('#fileInfo').style.display='block';
  updateScanButton();
}
function clearFile(){
  selectedFile=null; qs('#fileInfo').style.display='none'; qs('#uploadArea').style.display='';
  qs('#fileInput').value=''; updateScanButton();
}

/* ---------- BUTTON / ALERT ---------- */
function updateSelectionAlert(){
  qs('#selectionAlert').classList.toggle('hidden',selectedRegion&&selectedPlatforms.length);
}
function updateScanButton(){
  const btn=qs('#scanBtn');
  const ready=selectedFile&&selectedRegion&&selectedPlatforms.length;
  btn.disabled=!ready; btn.classList.toggle('ready',ready);
}

/* ---------- SCAN ---------- */
function scansLimit(){ return {free:3,plus:20,premium:40}[currentTier]; }
function scansUsed(){  return +safeStorage.getItem('checkreel_scans_used')||0; }
function incScan(){    safeStorage.setItem('checkreel_scans_used',scansUsed()+1); }

async function startScan(){
  if(scansUsed()>=scansLimit()) return alert('Scan limit reached');
  const btn=qs('#scanBtn'); const txt=qs('#scan-btn-text'); const loader=qs('#btnLoader');
  btn.disabled=true; loader.classList.add('active'); txt.textContent='Analyzing…';
  await new Promise(r=>setTimeout(r,3000));
  const res = fakeResults();
  renderResults(res);
  saveHistory(res);
  incScan(); updateScansCounter(); updateTierDisplay();
  qs('#resultsSection').scrollIntoView({behavior:'smooth'});
  btn.disabled=false; loader.classList.remove('active'); txt.textContent='Start Content Check';
}
function fakeResults(){
  const scenarios=[95,85,72,60,42]; const s=scenarios[Math.floor(Math.random()*scenarios.length)];
  const status= s>=90?'? Perfect!':
                s>=80?'? Good':
                s>=70?'?? Minor issues':
                s>=60?'?? Fix before post':'? Do NOT post';
  const issues = s>=70?0:s>=60?3:5;
  return {score:s,status,issues};
}
function renderResults({score,status,issues}){
  qs('#scoreValue').textContent=score;
  qs('#status-text').textContent=status.slice(2);
  qs('#statusIcon').textContent=status[0];
  qs('#issuesList').innerHTML= issues? `<div class="issue-item"><span>??</span><span>${issues} potential issues detected</span></div>`:'';
  qs('#recommendationsList').innerHTML='<div class="recommendation-item"><span>??</span><span>Upgrade for detailed recommendations</span></div>';
  // score gradient
  const red  = score<50?255:Math.round(255*(100-score)/50);
  const green= score>50?255:Math.round(255*score/50);
  qs('#scoreCircle').style.background=`conic-gradient(rgb(${red},${green},0) 0 ${score}%,#e0e0e0 ${score}% 100%)`;
  qs('#resultsSection').style.display='block';
}

/* ---------- HISTORY (plus & premium) ---------- */
function saveHistory(r){
  if(currentTier==='free') return;
  const rec={id:Date.now(),date:new Date().toISOString(),score:r.score,status:r.status,file:selectedFile.name,
             region:selectedRegion,platforms:[...selectedPlatforms]};
  scanHistory.unshift(rec); scanHistory=scanHistory.slice(0,50);
  safeStorage.setItem('checkreel_scan_history',JSON.stringify(scanHistory));
  loadScanHistory();
}
function loadScanHistory(){ displayHistory(scanHistory); }
function displayHistory(arr){
  qs('#historyList').innerHTML = arr.map(s=>`
    <div class="history-item">
      <div><strong>${s.file}</strong><br><span style="font-size:12px">${s.platforms.join(', ')} | ${s.region}</span></div>
      <div class="history-date">${new Date(s.date).toLocaleDateString()}</div>
    </div>`).join('');
}

/* ---------- COUNTERS ---------- */
function updateTierDisplay(){
  const limits={free:3,plus:20,premium:40};
  const tierBadge = qs('#tierBadge');
  tierBadge.textContent = currentTier.charAt(0).toUpperCase()+currentTier.slice(1);
  tierBadge.className   = `tier-badge tier-${currentTier}`;
  qs('#scansLeft').textContent = `${Math.max(0,limits[currentTier]-scansUsed())} scans left`;
}
function updateScansCounter(){ qs('#scansUsedCounter').textContent=scansUsed(); }

/* ---------- UTIL EXPORTS ---------- */
window.selectCountry        = c=>{selectedCountry=c;closeModal('#countriesModal');};
window.showCountries        = r=>populateCountries(r);
window.filterHistory        =()=>{} // placeholder to silence inline onclick, real grouping omitted for brevity
