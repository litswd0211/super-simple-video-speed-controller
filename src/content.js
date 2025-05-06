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

document.addEventListener('keydown', (event) => {
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    videos.forEach(video => {
        if (event.key === 'D' || event.key === 'd') {
            video.playbackRate = Math.min(video.playbackRate + 0.1, 16); // 最大速度16倍
            console.log(`Video speed increased to: ${video.playbackRate.toFixed(1)}x`);
        } else if (event.key === 'S' || event.key === 's') {
            video.playbackRate = Math.max(video.playbackRate - 0.1, 0.1); // 最小速度0.1倍
            console.log(`Video speed decreased to: ${video.playbackRate.toFixed(1)}x`);
        }
    });
});