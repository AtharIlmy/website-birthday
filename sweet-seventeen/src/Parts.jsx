import { GALLERY_PHOTOS, TWIN_PHOTOS } from './config.js'

const photo = (n, twin) => {
  const photos = twin ? TWIN_PHOTOS : GALLERY_PHOTOS
  return photos.length ? photos[(n - 1) % photos.length] : null
}
export const Ph = ({ n, style, twin = false }) => (
  <i className={'v' + n} style={photo(n, twin) ? { background: `center/cover url(${photo(n, twin)})`, ...style } : style} />
)
export const label = (n, twin = false) => (photo(n, twin) ? '' : `PHOTO ${n}`)
export const Pol = ({ n, cls = '', style, ist, twin = false }) => (
  <div className={'pol ' + cls} style={style}><Ph n={n} style={ist} twin={twin} /><b>{label(n, twin)}</b></div>
)

const STARS = [[8,12,0],[22,70,-1],[36,22,-2],[64,14,-.5],[78,62,-1.6],[90,20,-2.4],[50,86,-1.2],[14,45,-.8],[86,44,-2.1],[44,8,-1.9],[70,80,-.3]]
export const Stars = () => STARS.map(([l, t, d], i) => (
  <div key={i} className="st" style={{ left: l + '%', top: t + '%', animationDelay: d + 's' }} />
))

const MQ = 'HAPPY SWEET SEVENTEEN ✦ TWINS ✦ 25 · 10 · 2026 ✦ HAPPY BIRTHDAY ✦ '.repeat(10)
export const Marquees = () => (
  <>
    <div className="mqw" style={{ bottom: 70 }}><div className="mqr">{MQ}</div></div>
    <div className="mqw" style={{ bottom: 28 }}><div className="mq">{MQ}</div></div>
  </>
)

export const Balloons = ({ balloons, onPop }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
    {balloons.map((b) => (
      <button key={b.i} className="bl" aria-label="Photo balloon" onClick={() => onPop(b.i)} style={b.style} />
    ))}
  </div>
)

const COLS = ['#F6E3A1', '#6F8FE8', '#FFFFFF', '#B8893A']
const gen = (count, base, step, mod) => Array.from({ length: count }, (_, i) => ({
  left: `${(i * 37) % 100}%`, top: -20, width: 6 + (i % 4) * 3, height: 10 + (i % 3) * 4,
  background: COLS[i % 4], animationDelay: `${base + (i % mod) * step}s`,
}))
const CONF2 = gen(30, 4.6, 0.12, 8)
const CONF4 = gen(40, -5, 0.5, 10)
export const Confetti = ({ loop }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    {(loop ? CONF4 : CONF2).map((s, i) => <div key={i} className={loop ? 'cfl' : 'cf'} style={s} />)}
  </div>
)
