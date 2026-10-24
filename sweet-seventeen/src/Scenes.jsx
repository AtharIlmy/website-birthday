import { FINALE_PHOTOS, GALLERY_PHOTOS, GALLERY_VIDEO_FILE, NAME_1, NAME_2 } from './config.js'
import { Ph, Pol, label, Balloons, Confetti } from './Parts.jsx'

const Scn = ({ anim, style, children }) => (
  <div className="scn" style={{ animation: anim, ...style }}>{children}</div>
)
const pfFont = { fontFamily: "'Playfair Display',serif", fontWeight: 600 }
const rise = (d) => ({ animationDelay: d + 's' })

// 0 — right at midnight
const S0 = () => (
  <Scn anim="sIn .5s both,sOut .5s 3s forwards">
    <div className="flash" />
    {[0.1, 0.6, 1.1].map((d) => <div key={d} className="rg" style={rise(d)} />)}
    <div style={{ animation: 'zoomIn 1.2s cubic-bezier(.2,.9,.2,1) .2s both' }}>
      <div className="gold" style={{ ...pfFont, fontSize: 'clamp(90px,16vw,200px)', lineHeight: 1 }}>00:00</div>
    </div>
    <div className="z2 eye">HAPPY BIRTHDAY</div>
  </Scn>
)

// 1 — 25 October
const S1 = () => (
  <Scn anim="sIn .5s both,sOut .5s 3s forwards">
    <div className="z2 eye" style={rise(0.2)}>TODAY</div>
    <div style={{ animation: 'slideUp 1.1s cubic-bezier(.2,.9,.2,1) .4s both' }}>
      <div className="gold" style={{ ...pfFont, fontSize: 'clamp(140px,26vw,320px)', lineHeight: 0.9 }}>25</div>
    </div>
    <div style={{ animation: 'track 2s ease-out .9s both', fontSize: 'clamp(20px,3vw,34px)', color: '#C9D2F0', fontWeight: 300 }}>OCTOBER 2026</div>
  </Scn>
)

// 2 — counting to 17
const S2 = ({ count17 }) => (
  <Scn anim="sIn .5s both,sOut .5s 4s forwards" style={{ gap: 8 }}>
    <div className="z2 eye" style={rise(0.2)}>YOUR AGE NOW</div>
    <div className="num" style={{ fontSize: 'clamp(130px,22vw,270px)' }}>{count17}</div>
    <div className="z2 cap" style={{ ...rise(0.8), fontSize: 'clamp(32px,4.5vw,52px)' }}>years of your life.</div>
  </Scn>
)

// 3 — twins, split-screen
const Half = ({ n, name, side, delay, rot }) => (
  <div className="half" style={{
    background: `linear-gradient(${side === 'L' ? 90 : 270}deg,rgba(5,10,30,.84),rgba(14,27,72,.72))`,
    animation: `${side === 'L' ? 'inL' : 'inR'} .9s cubic-bezier(.2,.9,.2,1) both`,
  }}>
    <div className="twin-tag">{side === 'L' ? 'TWIN ONE' : 'TWIN TWO'} <span>✦</span></div>
    <Pol n={n} twin style={{ transform: `rotate(${rot}deg)` }} />
    <div className="gold" style={{ ...pfFont, fontSize: 17, animation: `rise .8s ${delay}s both` }}>{name}</div>
  </div>
)
const S3 = () => (
  <Scn anim="sIn .4s both,sOut .5s 4.5s forwards" style={{ flexDirection: 'row', gap: 0, padding: 0 }}>
    <div className="twin-spark twin-spark-a">✦</div>
    <div className="twin-spark twin-spark-b">✧</div>
    <div className="twin-spark twin-spark-c">✦</div>
    <div className="twin-spark twin-spark-d">✧</div>
    <div className="twin-spark twin-spark-e">✦</div>
    <Half n={1} name={NAME_1} side="L" delay={1} rot={-4} />
    <Half n={2} name={NAME_2} side="R" delay={1.2} rot={4} />
    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, marginLeft: -1, background: '#E9C46A', transformOrigin: 'top', animation: 'grow .8s .7s both' }} />
    <div className="twin-divider-label">17 <span>✦</span> 17</div>
    <div className="cap" style={{ position: 'absolute', left: 0, right: 0, bottom: 60, animation: 'rise .8s 2.2s both' }}>one day, two stories.</div>
  </Scn>
)

// 4 — memory gallery with a video centerpiece
const VIDEO_PHOTOS = GALLERY_PHOTOS.slice(-6)
const S4 = ({ onGalleryVideoMetadata }) => (
  <Scn anim="sIn .5s both">
    <div className="memory-gallery">
      {VIDEO_PHOTOS.map((_, index) => (
        <div key={index} className={`memory-photo memory-photo-${index + 1}`} style={{ animationDelay: `${index * 0.12}s` }}>
          <Pol n={GALLERY_PHOTOS.length - VIDEO_PHOTOS.length + index + 1} />
        </div>
      ))}
      <div className="memory-video-wrap">
        <video
          className="memory-video"
          src={GALLERY_VIDEO_FILE}
          autoPlay
          muted
          playsInline
          controls
          preload="auto"
          onLoadedMetadata={(event) => onGalleryVideoMetadata(event.currentTarget.duration)}
          onError={() => console.error(`Could not load the gallery video: ${GALLERY_VIDEO_FILE}`)}
        />
      </div>
    </div>
    <div className="z2 cap" style={{ animationDelay: '2.8s' }}>Every memory, every laugh, belongs to both of you.</div>
  </Scn>
)

// 5 — words + photos alternating
const WORDS = ['LAUGHTER', 'STORIES', 'DREAMS', 'FRIENDSHIP', 'MEMORIES', '17']
const ROT5 = [-6, 5, -3, 7, -8, 4]
const S5 = () => (
  <Scn anim="sIn .5s both,sOut .5s 5.3s forwards">
    <div style={{ position: 'relative', width: '100%', height: 600 }}>
      {WORDS.map((w, i) => {
        const left = i % 2 === 0
        return <div key={w} className="wd" style={{ [left ? 'left' : 'right']: '2%', '--wx': (left ? -300 : 300) + 'px', animationDelay: i * 0.9 + 's' }}>{w}</div>
      })}
      {ROT5.map((r, i) => (
        <Pol key={i} n={i + 1} cls="big" style={{ position: 'absolute', left: 'calc(50% - 170px)', top: 20, '--r': r + 'deg', animation: `phCycle 1s ${i * 0.9}s both` }} />
      ))}
    </div>
  </Scn>
)

// 6 — moving photo strip
const seq = (start) => Array.from({ length: 24 }, (_, i) => ((start - 1 + i) % GALLERY_PHOTOS.length) + 1)
const Strip = ({ cls, start, dur }) => (
  <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
    <div className={cls} style={dur ? { animationDuration: dur } : undefined}>
      {seq(start).map((n, i) => <div key={i} className="fr"><Ph n={n} /></div>)}
    </div>
  </div>
)
const S6 = () => (
  <Scn anim="sIn .5s both,sOut .5s 4.5s forwards" style={{ padding: 0 }}>
    <div className="eye" style={{ animation: 'track 1.6s ease-out .2s both', marginBottom: 10 }}>MEMORIES TOGETHER</div>
    <Strip cls="strip" start={1} />
    <Strip cls="stripr" start={4} />
    <Strip cls="strip" start={2} dur="12s" />
  </Scn>
)

// 7 — 17 years · 17 stories (tile flip)
const S7 = () => (
  <Scn anim="sIn .5s both,sOut .5s 5.1s forwards">
    <div className="eye" style={{ animation: 'track 1.6s ease-out .2s both' }}>17 YEARS · 17 STORIES</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, width: 900, maxWidth: '100%', justifyContent: 'center', perspective: 900 }}>
      {GALLERY_PHOTOS.map((_, index) => {
        const n = index + 1
        return (
          <div key={n} className="tile" style={{ animationDelay: index * 0.12 + 's' }}>
            <Ph n={n} />
            <i className={'top v' + (((index + 2) % GALLERY_PHOTOS.length) + 1)} style={{ animationDelay: (1.2 + index * 0.1) + 's' }} />
            <b>{label(n)}</b>
          </div>
        )
      })}
    </div>
  </Scn>
)

// 8 — big words
const KW = [
  ['HAPPY', 0, 0, 'clamp(120px,22vw,320px)', true],
  ['BIRTHDAY', -4, 0.85, 'clamp(100px,18vw,260px)', false],
  ['TWINS', 3, 1.7, 'clamp(120px,22vw,320px)', true],
  ['×2', -3, 2.55, 'clamp(200px,38vw,520px)', false],
  ['17 ✦ 17', 0, 3.4, 'clamp(100px,20vw,300px)', true],
]
const S8 = () => (
  <Scn anim="sIn .3s both,sOut .5s 4s forwards">
    {[0.2, 1.5, 2.8].map((d) => <div key={d} className="rg" style={rise(d)} />)}
    {KW.map(([txt, k, d, size, gold]) => (
      <div key={txt} className="kwd" style={{ '--k': k + 'deg', animation: `kw .9s ease-out ${d}s both` }}>
        <div className={gold ? 'gold' : undefined} style={gold ? { fontSize: size } : { fontSize: size, WebkitTextStroke: '2px #E9C46A', color: 'transparent' }}>{txt}</div>
      </div>
    ))}
  </Scn>
)

// 9 — cake + candles
const cakeBar = (l, r, b, h, bg, br = 14) => ({ position: 'absolute', left: l, right: r, bottom: b, height: h, background: bg, borderRadius: br })
const CANDLES = [[120, 117, 1.6], [155, 152, 2.0], [190, 187, 2.4]]
const Cake = ({ delay }) => (
  <div className="bob" style={{ position: 'relative', width: 320, height: 290, ...(delay ? { animationDelay: delay } : null) }}>
    <div style={cakeBar(0, 0, 0, 16, '#8A6A2A', '50%')} />
    <div style={cakeBar(30, 30, 12, 90, 'linear-gradient(#16275C,#0E1C4D)')} />
    <div style={cakeBar(30, 30, 44, 6, '#B8893A', 0)} />
    <div style={cakeBar(30, 30, 92, 22, '#F4EFE3', '14px 14px 20px 20px')} />
    <div style={cakeBar(70, 70, 102, 80, 'linear-gradient(#2A4BA0,#1B3278)')} />
    <div style={cakeBar(70, 70, 164, 24, '#F4EFE3', '14px 14px 20px 20px')} />
    {CANDLES.map(([cl, fl, d]) => (
      <span key={cl}>
        <div style={{ position: 'absolute', left: cl, bottom: 188, width: 10, height: 52, borderRadius: 3, background: '#F6E3A1' }} />
        <div className="fl" style={{ left: fl, animation: `flick .35s ease-in-out infinite alternate,lit .4s ${d}s both,snuff .3s 4.4s forwards` }} />
      </span>
    ))}
  </div>
)
const S9 = ({ balloons, onPop }) => (
  <Scn anim="sIn .5s both,sOut .5s 6.5s forwards">
    <Balloons balloons={balloons} onPop={onPop} />
    <Confetti />
    <div className="z2 eye" style={rise(0.3)}>MAKE YOUR WISHES</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center', animation: 'slideUp 1.2s cubic-bezier(.2,.9,.2,1) .3s both' }}>
      <Cake /><Cake delay="-1.2s" />
    </div>
    <div className="z2 cap" style={{ animationDelay: '5s' }}>May all of it come true.</div>
  </Scn>
)

// 10 — finale
const S10 = ({ onReplay }) => (
  <Scn anim="sIn 1.2s both" style={{ gap: 22 }}>
    <div className="finale-content">
      <div className="finale-eyebrow">A CELEBRATION OF TWO</div>
      <h1 className="finale-title">Happy Birthday</h1>
      <div className="finale-divider"><span />✦<span /></div>
      <div className="finale-names">
        <span>{NAME_1}</span>
        <i>&amp;</i>
        <span>{NAME_2}</span>
      </div>
      <div className="finale-date">25 OCTOBER 2026</div>
      <div className="finale-photos">
        {FINALE_PHOTOS.map((photo) => (
          <div key={photo} className="finale-photo" style={{ backgroundImage: `url("${photo}")` }} />
        ))}
      </div>
      <button className="finale-replay" onClick={onReplay}>REPLAY</button>
    </div>
  </Scn>
)

export const SCENES = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]
