# Sweet Seventeen (React + Vite)

Countdown to **25 October 2026 00:00 local time**, then the birthday animation plays automatically (11 scenes).

## Run
```bash
npm install
npm run dev      # development
npm run build    # production output in dist/
```

## What needs to be filled in
Everything is in `src/config.js`:
- `NAME_1`, `NAME_2` — twin names
- `MUSIC_FILE` — path to the local audio file
- `TWIN_PHOTOS` — the two photos shown alongside each twin's name
- `FINALE_PHOTOS` — the photos shown in the final scene
- `PHOTOS` — gallery photos used in the other photo scenes and background
- `TARGET` — animation start time

## Add your photos
1. Put image files in `public/photos/`. JPEG, PNG, and other browser-supported image formats work.
2. Add gallery photo paths to `PHOTOS` in `src/config.js`; these appear in the other photo scenes, strips, and background collage.
3. Set the two name-scene photos in `TWIN_PHOTOS` and the final-scene photos in `FINALE_PHOTOS`.
   ```js
   export const PHOTOS = [
     '/photos/1.jpg',
     '/photos/2.jpg',
     '/photos/3.jpg',
   ]
   ```
   Keep the paths in the same order you want them to appear.

## Animated background
The photos listed in `PHOTOS` form a moving photo wall. Halfway through the animation, the photo wall fades into the video at `VIDEO_FILE`; the video starts from the beginning and plays muted at half speed.

## Gallery video
Scene 4 plays `GALLERY_VIDEO_FILE` in the center, surrounded by the six latest gallery photos. Change that setting in `src/config.js` to use a different video from `public/videos/`.

## Add a song
1. Put an audio file in `public/music/` and name it `birthday-song.mp3`.
2. The site will use `/music/birthday-song.mp3` from `src/config.js`. If you use another name or format, update `MUSIC_FILE` to match, for example `/music/song.ogg`.
3. The player attempts to start automatically, but browsers may block autoplay with sound. If that happens, press play on the visible audio controls.

## Structure
- `src/useBirthdayShow.js` — timer, countdown, scene selection, balloon logic
- `src/Scenes.jsx` — 11 animated scenes
- `src/Parts.jsx` — polaroids, stars, marquee, balloons, confetti
- `src/styles.css` — animation keyframes and classes
