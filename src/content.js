const observeVideos = () => {
    const observer = new MutationObserver(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.hasAttribute('data-speed-controller')) {
                video.setAttribute('data-speed-controller', 'true');
                console.log('Video element detected and ready for speed control.');
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

observeVideos();

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '20px';
    toast.style.bottom = '';
    toast.style.right = '';
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

document.addEventListener('keydown', (event) => {
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    videos.forEach(video => {
        if (event.key === 'D' || event.key === 'd') {
            video.playbackRate = Math.min(video.playbackRate + 0.1, 16); // 最大速度16倍
            showToast(`Speed: ${video.playbackRate.toFixed(1)}x`);
            console.log(`Video speed increased to: ${video.playbackRate.toFixed(1)}x`);
        } else if (event.key === 'S' || event.key === 's') {
            video.playbackRate = Math.max(video.playbackRate - 0.1, 0.1); // 最小速度0.1倍
            showToast(`Speed: ${video.playbackRate.toFixed(1)}x`);
            console.log(`Video speed decreased to: ${video.playbackRate.toFixed(1)}x`);
        }
    });
});