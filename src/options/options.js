const DEFAULT_KEYS = {
  increase: ['d'],
  decrease: ['s']
};

function load() {
  chrome.storage.sync.get({ keys: DEFAULT_KEYS }, (data) => {
    renderKeys(data.keys || DEFAULT_KEYS);
  });
}

function showStatus(msg) {
  const el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(() => (el.textContent = ''), 1500);
}

window.addEventListener('DOMContentLoaded', () => {
  load();
  setupKeyHandlers();
});

// --- 以下 キーバインド設定 ---

function normalizeKey(k) {
  return String(k).trim().toLowerCase();
}

function renderKeys(keys) {
  const incEl = document.getElementById('keys-increase');
  const decEl = document.getElementById('keys-decrease');
  incEl.innerHTML = '';
  decEl.innerHTML = '';

  (keys.increase || []).forEach(k => incEl.appendChild(makeChip(k, 'increase')));
  (keys.decrease || []).forEach(k => decEl.appendChild(makeChip(k, 'decrease')));
}

function makeChip(key, action) {
  const chip = document.createElement('span');
  chip.className = 'chip';
  const label = document.createElement('span');
  label.textContent = key;
  const del = document.createElement('button');
  del.setAttribute('aria-label', `Remove ${key}`);
  del.textContent = '×';
  del.addEventListener('click', () => removeKey(action, key));
  chip.appendChild(label);
  chip.appendChild(del);
  return chip;
}

function setupKeyHandlers() {
  document.getElementById('btn-add-increase').addEventListener('click', () => addKeysFromInput('increase', 'add-key-increase'));
  document.getElementById('btn-add-decrease').addEventListener('click', () => addKeysFromInput('decrease', 'add-key-decrease'));
  document.getElementById('reset-keys').addEventListener('click', () => {
    chrome.storage.sync.set({ keys: DEFAULT_KEYS }, () => {
      renderKeys(DEFAULT_KEYS);
      showStatus('Keyboard shortcuts reset to defaults');
    });
  });
}

function addKeysFromInput(action, inputId) {
  const input = document.getElementById(inputId);
  const raw = input.value;
  if (!raw) return;
  const newKeys = raw.split(',').map(normalizeKey).filter(Boolean);
  input.value = '';

  chrome.storage.sync.get({ keys: DEFAULT_KEYS }, ({ keys }) => {
    const k = { ...DEFAULT_KEYS, ...keys };
    // 重複排除＆他アクションからの排他
    newKeys.forEach(nk => {
      // 他方から除去
      const other = action === 'increase' ? 'decrease' : 'increase';
      k[other] = (k[other] || []).filter(x => x !== nk);
      // 当該に追加
      if (!(k[action] || []).includes(nk)) {
        k[action] = [ ...(k[action] || []), nk ];
      }
    });
    chrome.storage.sync.set({ keys: k }, () => {
      renderKeys(k);
      showStatus('Keyboard shortcuts updated');
    });
  });
}

function removeKey(action, key) {
  chrome.storage.sync.get({ keys: DEFAULT_KEYS }, ({ keys }) => {
    const k = { ...DEFAULT_KEYS, ...keys };
    k[action] = (k[action] || []).filter(x => x !== key);
    chrome.storage.sync.set({ keys: k }, () => {
      renderKeys(k);
      showStatus(`Removed ${key}`);
    });
  });
}
