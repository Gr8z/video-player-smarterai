# Video Player Application

This project is a custom video player built with React and TypeScript. It sequentially plays a series of video recordings, allowing users to play, pause, and seek through the combined timeline seamlessly. The application is intended for interview purposes only and should not be used in production environments.

## **Live Demo**

![status](https://github.com/Gr8z/video-player-smarterai/actions/workflows/gh-pages.yml/badge.svg)

You can view the live application on GitHub Pages:

[Video Player Demo](https://Gr8z.github.io/video-player-smarterai/)

## **Features**

- **Sequential Playback**: Automatically plays a series of videos in order.
- **Custom Controls**: Play/pause button, seek bar, and current time display.
- **Seeking Functionality**: Allows users to seek to any point in the combined video timeline.
- **Responsive Design**: Adjusts to different screen sizes for optimal viewing.

## **Getting Started**

Follow these instructions to set up and run the project locally.

### **Installation**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/video-player-smarterai/video-player-smarterai.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd video-player-smarterai
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

### **Running the Application**

To start the development server, run:

```bash
npm start
```

The application will open in your default browser at http://localhost:3000.

### **Building for Production**

To build the app for production to the build folder, run:

```bash
npm run build
```

### Deploying to GitHub Pages

The application is configured to deploy to GitHub Pages using GitHub Actions. Any changes pushed to the `master` branch will automatically build and deploy the app to the `gh-pages` branch.

## Project Structure

```
src/
┣ data/
┃ ┣ recordings.ts
┃ ┗ ...
┣ hooks/
┃ ┣ usePlaybackTime.ts
┃ ┗ useVideoControls.ts
┣ recordings/
┃ ┣ ...
┣ utils/
┃ ┣ formatTime.ts
┃ ┣ handleSeek.ts
┃ ┗ togglePlayPause.ts
┣ VideoPlayer.scss
┗ VideoPlayer.tsx
```

- `data`: Contains JSON data for the videos with timestamps.
- `hooks`: Custom React hooks for managing playback time and video controls.
- `recordings`: Directory for videos of recordings.
- `utils`: Utility functions such as time formatting, handing seeking, etc.
- `VideoPlayer.tsx`: Main video player component.
- `VideoPlayer.scss`: Styles for the video player.

## License and Disclaimer

> The code in this repository is intended for interview and educational purposes only. It may **not** be used, copied, modified, merged, published, distributed, sublicensed, or sold for commercial or production use without explicit permission.
>
> **Restrictions**:
>
> - **No Production Use**: The code is not intended for production environments.
> - **No Redistribution**: You may not redistribute the code in any form.
> - **No Commercial Use**: The code may not be used for commercial purposes.
>
> **Liability**:
>
> The author is not responsible for any damage or loss caused by the use of this code.
