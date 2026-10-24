import { useEffect, useRef, useState } from 'react'
import { GALLERY_PHOTOS, MUSIC_FILE, VIDEO_FILE } from './config.js'
import { useBirthdayShow } from './useBirthdayShow.js'
import { SCENES } from './Scenes.jsx'
import { Stars, Marquees, Pol } from './Parts.jsx'

function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const resumePlayback = () => {
      document.removeEventListener('pointerdown', resumePlayback)
      document.removeEventListener('keydown', resumePlayback)
      audio.play().catch((error) => {
        console.error('Could not start the birthday song:', error)
      })
    }

    audio.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        document.addEventListener('pointerdown', resumePlayback, { once: true })
        document.addEventListener('keydown', resumePlayback, { once: true })
      } else {
        console.error('Could not start the birthday song:', error)
      }
    })

    return () => {
      document.removeEventListener('pointerdown', resumePlayback)
      document.removeEventListener('keydown', resumePlayback)
    }
  }, [])

  return (
    <audio ref={audioRef} src={MUSIC_FILE} autoPlay loop preload="auto" />
  )
}

function SiteBackground({ showVideo, pauseWall = false }) {
  const photos = GALLERY_PHOTOS.filter(Boolean)
  const photoTiles = Array.from({ length: 24 }, (_, index) => photos[index % photos.length])
  const panels = [photoTiles, photoTiles]
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 0.5
    if (showVideo) {
      video.currentTime = 0
      video.play().catch((error) => {
        console.error('Could not start the finale background video:', error)
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [showVideo])

  return (
    <div className={`site-background${showVideo ? ' show-video' : ''}${pauseWall ? ' pause-wall' : ''}`} aria-hidden="true">
      {photos.length > 0 && (
        <div className="photo-wall">
          <div className="floating-photo-track">
          {panels.map((panel, panelIndex) => (
            <div className="floating-photo-grid" key={panelIndex}>
              {panel.map((photo, index) => (
                <div
                  key={`${panelIndex}-${index}`}
                  className="floating-photo-tile"
                  style={{ backgroundImage: `url("${photo}")` }}
                />
              ))}
            </div>
          ))}
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="finale-video"
        src={VIDEO_FILE}
        loop
        muted
        playsInline
        preload="auto"
        onError={() => console.error(`Could not load the background video: ${VIDEO_FILE}`)}
      />
      <div className="background-shade" />
    </div>
  )
}

function Splash({ units, onPlay }) {
  return (
    <div className="splash">
      <Stars />
      <div className="eye" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Sweet Seventeen · Twins</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
        {units.map((u) => (
          <div key={u.l} className="cd">
            <div className="gold pf" style={{ fontSize: 76, lineHeight: 1 }}>{u.v}</div>
            <div style={{ marginTop: 10, fontSize: 12, letterSpacing: '.3em', color: '#9FB0E6' }}>{u.l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontWeight: 300, letterSpacing: '.2em', fontSize: 14, color: '#9FB0E6', textAlign: 'center' }}>COUNTDOWN TO 25 OCTOBER 2026 · 00:00 LOCAL TIME</div>
      <button className="btn" onClick={onPlay} style={{ background: '#E9C46A', border: 0, color: '#0A1330', fontWeight: 500, fontSize: 13 }}>PREVIEW ANIMATION</button>
    </div>
  )
}

export default function App() {
  const s = useBirthdayShow()
  const Scene = SCENES[s.idx]
  const showVideo = s.mode === 'show' && s.progress >= 50

  if (s.mode === 'count') {
    return (
      <div className="stage">
        <SiteBackground showVideo={false} />
        <MusicPlayer />
        <Splash units={s.units} onPlay={s.play} />
      </div>
    )
  }

  return (
    <div className="stage">
      <SiteBackground showVideo={showVideo} pauseWall={s.idx === 4} />
      <MusicPlayer />
      <div className="show">
        <Stars />
        {s.idx < 10 && <Marquees />}
        {s.idx < 10 && (
          <button className="btn" onClick={s.skip} style={{ position: 'absolute', top: 24, right: 28, zIndex: 40, background: 'none', border: '1px solid #6B5322', color: '#F6E3A1' }}>SKIP TO END</button>
        )}
        {s.idx < 10 && <div style={{ position: 'absolute', left: 0, bottom: 0, height: 3, width: s.progress + '%', background: 'linear-gradient(90deg,#B8893A,#F6E3A1)', zIndex: 40 }} />}

        {/* photos that appear when the balloon is popped */}
        {s.idx < 10 && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
          {s.slots.map((q) => q && (
            <div key={q.born} style={{ position: 'absolute', left: q.x + '%', top: q.y + '%', margin: '-125px 0 0 -95px', animation: 'popIn .5s cubic-bezier(.2,.9,.2,1) both,sOut .5s 4.1s forwards' }}>
              <div className="fw" style={{ left: 'calc(50% - 10px)', top: 'calc(50% - 10px)', animationDuration: '.8s' }} />
              <div className="fw" style={{ left: 'calc(50% - 10px)', top: 'calc(50% - 10px)', animationDuration: '.8s', animationDelay: '.15s', borderColor: '#6F8FE8' }} />
              <div style={{ transform: `rotate(${q.rot}deg)` }}><Pol n={q.n} /></div>
            </div>
          ))}
        </div>}

        <Scene key={s.idx} count17={s.count17} balloons={s.balloons} onPop={s.popBalloon} onReplay={s.play} onGalleryVideoMetadata={s.onGalleryVideoMetadata} />
      </div>
    </div>
  )
}
