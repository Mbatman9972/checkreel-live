if (!window.safeStorage) {
  window.safeStorage = {
    getItem:  (k) => { try { return localStorage.getItem(k); } catch { return null } },
    setItem:  (k,v)=> { try { localStorage.setItem(k,v) } catch {} },
    removeItem:(k)  => { try { localStorage.removeItem(k) } catch {} }
  };
}
const safeStorage = window.safeStorage;