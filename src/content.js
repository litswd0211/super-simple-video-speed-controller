const DEFAULT_KEYS = { increase: ['d'], decrease: ['s'] };

function getSiteKey() {
    try {
        return new URL(location.href).origin;
    } catch {
        return location.hostname || 'global';
    }
}

function applySpeedToVideos(rate) {
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        v.playbackRate = rate;
    });
}

function restoreLastSpeed() {
    const key = `lastSpeed:${getSiteKey()}`;
    chrome.storage.local.get([key], (data) => {
        const rate = data[key];
        if (typeof rate === 'number' && rate > 0) {
            applySpeedToVideos(rate);
        }
    });
}

const observeVideos = () => {
    const observer = new MutationObserver(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.hasAttribute('data-speed-controller')) {
                video.setAttribute('data-speed-controller', 'true');
            }
        });
        // If new videos appeared, re-apply last known speed
        restoreLastSpeed();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

observeVideos();
restoreLastSpeed();

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '20px';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '10000';
    toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 1000);
};

let keymap = { ...DEFAULT_KEYS };

function loadKeys() {
    chrome.storage.sync.get({ keys: DEFAULT_KEYS }, (data) => {
        const k = data.keys || DEFAULT_KEYS;
        // 正規化（小文字）
        keymap = {
            increase: (k.increase || []).map(k => String(k).toLowerCase()),
            decrease: (k.decrease || []).map(k => String(k).toLowerCase())
        };
    });
}

loadKeys();
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.keys) {
        loadKeys();
    }
});

document.addEventListener('keydown', (event) => {
    // 入力要素でのタイプ中は無視
    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
    const isEditable = (
        tag === 'input' || tag === 'textarea' || tag === 'select' ||
        (target && target.isContentEditable)
    );
    if (isEditable) return;

    const videos = document.querySelectorAll('video');
    if (!videos.length) return;
    const key = String(event.key || '').toLowerCase();
    const isInc = keymap.increase?.includes(key);
    const isDec = keymap.decrease?.includes(key);
    if (!isInc && !isDec) return;

    let latestRate;
    videos.forEach(video => {
        if (isInc) {
            video.playbackRate = Math.min(video.playbackRate + 0.1, 16); // 最大速度16倍
        } else if (isDec) {
            video.playbackRate = Math.max(video.playbackRate - 0.1, 0.1); // 最小速度0.1倍
        }
        latestRate = video.playbackRate;
        showToast(`Speed: ${video.playbackRate.toFixed(1)}x`);
    });
    if (typeof latestRate === 'number') {
        const key = `lastSpeed:${getSiteKey()}`;
        chrome.storage.local.set({ [key]: latestRate });
    }
});

// Preset-based speed setting via popup has been removed.