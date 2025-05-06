# Video Pace Master Lite

Video Pace Master Lite is a minimalistic Chrome extension that allows users to control video playback speed effortlessly. This extension is designed to work on popular platforms like YouTube and Amazon Prime Video.

## File Structure

- `src/background.js`: Manages the lifecycle of the Chrome extension.
- `src/content.js`: Injects functionality into web pages to control video playback speed.
- `src/popup/popup.html`: Defines the popup's user interface.
- `src/popup/popup.js`: Handles the logic for user interactions in the popup.
- `src/popup/popup.css`: Styles for the popup interface.
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
4. Play a video on a supported platform and use the following shortcuts:
   - Press **D** to increase playback speed by 0.1x.
   - Press **S** to decrease playback speed by 0.1x.

A toast notification will display the current playback speed.

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