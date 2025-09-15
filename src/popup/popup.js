document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('open-options');
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
            }
        });
    }
});