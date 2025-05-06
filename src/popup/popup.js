document.addEventListener('DOMContentLoaded', function() {
    const speedInput = document.getElementById('speedInput');
    const setSpeedButton = document.getElementById('setSpeedButton');

    setSpeedButton.addEventListener('click', function() {
        const speed = parseFloat(speedInput.value);
        if (!isNaN(speed) && speed > 0) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'setSpeed', speed: speed });
            });
        } else {
            alert('Please enter a valid speed greater than 0.');
        }
    });
});