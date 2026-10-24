import { useCallback, useEffect, useState } from 'react'
import { TARGET, DURATIONS, GALLERY_PHOTOS, TOTAL } from './config.js'

const pad = (n) => String(n).padStart(2, '0')
const BC = ['#E9C46A', '#6F8FE8', '#E8708A', '#6FE8D0', '#C09BFF', '#F4EFE3']

export function useBirthdayShow() {
  const [galleryVideoDuration, setGalleryVideoDuration] = useState(DURATIONS[4])
  const [t, setT] = useState(() => {
    const n = Date.now()
    return { now: n, mode: n >= TARGET ? 'show' : 'count', showStart: n }
  })
  const [fx, setFx] = useState({ popped: {}, slots: [null, null, null, null], cnt: 0 })

  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        const now = Date.now()
        return p.mode === 'count' && now >= TARGET
          ? { now, mode: 'show', showStart: now }
          : { ...p, now }
      })
    }, 100)
    return () => clearInterval(id)
  }, [])

  const popBalloon = useCallback((i) => {
    const born = Date.now()
    setFx((f) => {
      const c = f.cnt
      const slots = f.slots.slice()
      const bx = ((i * 83) % 92) + 2
      slots[c % 4] = { born, n: (c % GALLERY_PHOTOS.length) + 1, x: Math.min(84, Math.max(16, bx)), y: 30 + ((c * 37) % 40), rot: ((c % 5) - 2) * 4 }
      return { popped: { ...f.popped, [i]: born }, slots, cnt: c + 1 }
    })
  }, [])

  const play = useCallback(() => setT((p) => ({ ...p, mode: 'show', showStart: Date.now() })), [])
  const onGalleryVideoMetadata = useCallback((seconds) => {
    if (Number.isFinite(seconds) && seconds > 0) {
      setGalleryVideoDuration(Math.ceil(seconds * 1000))
    }
  }, [])

  const { now, mode, showStart } = t
  const durations = DURATIONS.map((duration, index) => index === 4 ? galleryVideoDuration : duration)
  const total = TOTAL + galleryVideoDuration - DURATIONS[4]
  const skip = useCallback(() => setT((p) => ({ ...p, showStart: Date.now() - total })), [total])
  const left = Math.max(0, TARGET - now)
  const units = [
    { v: pad(Math.floor(left / 86400000)), l: 'DAYS' },
    { v: pad(Math.floor(left / 3600000) % 24), l: 'HOURS' },
    { v: pad(Math.floor(left / 60000) % 60), l: 'MINUTES' },
    { v: pad(Math.floor(left / 1000) % 60), l: 'SECONDS' },
  ]

  const el = mode === 'show' ? now - showStart : 0
  let idx = -1, acc = 0, sceneEl = 0
  for (let i = 0; i < durations.length; i++) {
    if (el < acc + durations[i]) { idx = i; sceneEl = el - acc; break }
    acc += durations[i]
  }

  const balloons = Array.from({ length: 12 }, (_, i) => {
    const w = 54 + (i % 4) * 10
    const gone = fx.popped[i] && now - fx.popped[i] < 9000
    return {
      i,
      style: {
        ...(gone ? { display: 'none' } : null),
        left: `${((i * 83) % 92) + 2}%`, width: w, height: Math.round(w * 1.25), background: BC[i % 6],
        animationDuration: `${8 + (i % 4) * 2}s`, animationDelay: `-${i * 1.3}s`,
      },
    }
  })

  const slots = fx.slots.map((q) => (q && now - q.born < 4600 ? q : null))

  return {
    mode, units, idx, slots, balloons, popBalloon, play, skip, onGalleryVideoMetadata,
    count17: Math.min(17, 1 + Math.floor(sceneEl / 230)),
    progress: Math.min(1, el / total) * 100,
  }
}
