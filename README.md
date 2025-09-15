# Video Pace Master Lite

Video Pace Master Lite is a minimalistic Chrome extension that allows users to control video playback speed effortlessly. This extension is designed to work on popular platforms like YouTube and Amazon Prime Video.

Keyboard shortcuts are configurable per action (increase/decrease) and accept multiple keys.

## File Structure

- `src/background.js`: Manages the lifecycle of the Chrome extension.
- `src/content.js`: Injects functionality into web pages to control video playback speed.
- `src/popup/popup.html`: Minimal popup with a link to Options.
- `src/popup/popup.js`: Opens the Options page from the popup.
- `src/popup/popup.css`: Styles for the popup interface.
- `src/options/options.html`: Options page UI to edit keyboard shortcuts.
- `src/options/options.js`: Options page logic to save keyboard shortcuts with chrome.storage.
- `manifest.json`: Metadata and configuration for the Chrome extension.
- `images/`: Contains icons and screenshots for the extension.

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd super-simple-video-speed-controller
   ```

## Usage

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" in the top-right corner.
3. Click "Load unpacked" and select the project folder.
4. Play a video on a supported platform and use the following shortcuts (defaults, configurable):
   - Increase: **D** (you can add e.g. **F** in Options)
   - Decrease: **S**

A toast notification will display the current playback speed.

### Configure Keyboard Shortcuts

- Right-click the extension icon and choose "Options" or open the popup and click "Open Options…".
- Add keys as a comma-separated list per action. Case-insensitive (e.g., `d, f, arrowup`).
- A key belongs to only one action. If you assign the same key to both, it will be kept on the last-edited action.
- Shortcuts are ignored while typing in inputs or textareas.

### Configure Keyboard Shortcuts

- Open Options and scroll to the "キーボード操作" section.
- Add keys as comma-separated list per action. Case-insensitive (e.g., `d, f, arrowup`).
- A key belongs to only one action. If you assign the same key to both, it will be kept on the last-edited action.
- Shortcuts are ignored while typing in inputs or textareas.

## Commands for Development and Release

### Generate Icons
To resize the original icon to required sizes:
```bash
sips -z 16 16 images/icon.original.png --out images/icon16.png
sips -z 48 48 images/icon.original.png --out images/icon48.png
sips -z 128 128 images/icon.original.png --out images/icon128.png
```

### Generate Screenshots
To resize a screenshot to the required dimensions (1280x800):
```bash
sips -z 800 1280 images/screenshot.original.png --out images/screenshot1280x800.png
```

### Create Release Package
To create a ZIP file for Chrome Web Store submission:
```bash
zip -r video-pace-master-lite.zip manifest.json images/ src/ package.json
```

## License

This project is licensed under the MIT License.