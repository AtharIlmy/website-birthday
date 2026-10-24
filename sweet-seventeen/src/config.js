// ====== EDIT HERE ======
export const NAME_1 = 'Muhammad Athar Ilmy Putra Defa'
export const NAME_2 = 'Raisya Azzahra Puti Defa'

// Put the audio file in public/music and update this path if it has a different name
export const MUSIC_FILE = '/music/birthday-song.mp3'

// Finale background video in public/videos
export const VIDEO_FILE = '/videos/WhatsApp%20Video%202026-10-24%20at%2022.41.58%20%281%29.mp4'
export const GALLERY_VIDEO_FILE = '/videos/WhatsApp%20Video%202026-10-24%20at%2022.41.58%20%282%29.mp4'

// 25 Oct 2026 01:00 local time (= 24 Oct 2026 18:00 UTC)
export const TARGET = Date.UTC(2026, 9, 24, 18, 0, 0)

// Original photos shown alongside the twins' names
export const TWIN_PHOTOS = ['/photos/1.jpeg', '/photos/2.jpeg']

// Gallery photos, shown in the photo scenes and animated background
export const PHOTOS = [
  '/photos/WhatsApp%20Image%202026-02-23%20at%2008.50.02.jpeg',
  '/photos/WhatsApp%20Image%202026-05-18%20at%2013.03.00.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.47.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.48%20%281%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.48.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.49%20%282%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.49.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.52%20%281%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.52%20%282%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.52.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.56%20%281%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.56.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.57%20%281%29.jpeg',
  '/photos/WhatsApp%20Image%202026-10-24%20at%2022.53.57.jpeg',
]
export const GALLERY_PHOTOS = PHOTOS
export const FINALE_PHOTOS = [
  GALLERY_PHOTOS[0],
  GALLERY_PHOTOS[1],
  GALLERY_PHOTOS[13],
  GALLERY_PHOTOS[12],
]

// Duration of each scene (ms); the last scene never ends
export const DURATIONS = [3500, 3500, 4500, 5000, 5000, 5800, 5000, 5600, 4500, 7000, Infinity]
export const TOTAL = 49400
