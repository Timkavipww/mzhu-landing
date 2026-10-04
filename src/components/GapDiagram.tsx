/* Zoomed schematic of the working gap: 4 teeth, fluid bridges and the induction profile above them. Not to scale. */
const teeth = [150, 270, 390, 510]
const POLE_BOTTOM = 196
const TIP_Y = 262
const SHAFT_Y = 286

const PEAK_Y = 44
const TROUGH_Y = 96
const BASE_Y = 124

const tooth = (c: number) => `M${c - 34} ${POLE_BOTTOM} L${c - 8} ${TIP_Y} L${c + 8} ${TIP_Y} L${c + 34} ${POLE_BOTTOM} Z`

const bridge = (c: number) =>
  `M${c - 9} ${TIP_Y - 2} L${c + 9} ${TIP_Y - 2} Q${c + 12} ${SHAFT_Y - 6} ${c + 22} ${SHAFT_Y} L${c - 22} ${SHAFT_Y} Q${c - 12} ${SHAFT_Y - 6} ${c - 9} ${TIP_Y - 2} Z`

const profile = (() => {
  const half = 60
  let d = `M60 ${BASE_Y - 6} C${teeth[0] - 50} ${BASE_Y - 10}, ${teeth[0] - 22} ${PEAK_Y}, ${teeth[0]} ${PEAK_Y}`
  teeth.forEach((c, i) => {
    const next = teeth[i + 1]
    if (next === undefined) {
      d += ` C${c + 22} ${PEAK_Y}, ${c + 50} ${BASE_Y - 10}, 600 ${BASE_Y - 6}`
      return
    }
    const mid = c + half
    d += ` C${c + 24} ${PEAK_Y}, ${mid - 26} ${TROUGH_Y}, ${mid} ${TROUGH_Y}`
    d += ` C${mid + 26} ${TROUGH_Y}, ${next - 24} ${PEAK_Y}, ${next} ${PEAK_Y}`
  })
  return d
})()

export function GapDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Рабочий зазор: над вершинами зубьев индукция достигает 1,93 Тл, во впадинах 0,8–0,9 Тл; магнитная жидкость собирается под зубьями и образует барьер"
    >
      <defs>
        <linearGradient id="gd-shaft" x1="0" y1={SHAFT_Y} x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9d2db" />
          <stop offset="1" stopColor="#5d6a77" />
        </linearGradient>
        <linearGradient id="gd-steel" x1="0" y1="150" x2="0" y2={TIP_Y} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#323c47" />
          <stop offset="1" stopColor="#262e37" />
        </linearGradient>
        <linearGradient id="gd-profile" x1="0" y1={PEAK_Y} x2="0" y2={BASE_Y} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ee0c8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#3ee0c8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Induction profile */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11">
        <line x1="60" y1={BASE_Y} x2="600" y2={BASE_Y} stroke="#a9b6c3" strokeOpacity="0.25" />
        <line x1="60" y1={PEAK_Y} x2="600" y2={PEAK_Y} stroke="#3ee0c8" strokeOpacity="0.3" strokeDasharray="2 4" />
        <line x1="60" y1={TROUGH_Y} x2="600" y2={TROUGH_Y} stroke="#a9b6c3" strokeOpacity="0.25" strokeDasharray="2 4" />
        <path d={`${profile} L600 ${BASE_Y} L60 ${BASE_Y} Z`} fill="url(#gd-profile)" />
        <path d={profile} stroke="#3ee0c8" strokeWidth="1.6" />
        <text x="0" y={PEAK_Y + 4} fill="#3ee0c8">1,93 Тл</text>
        <text x="0" y={TROUGH_Y + 4} fill="#a9b6c3">0,8–0,9</text>
        <text x="0" y={BASE_Y + 4} fill="#8794a2">B</text>
      </g>

      {/* Pole piece with teeth */}
      <rect x="60" y="150" width="540" height={POLE_BOTTOM - 150} fill="url(#gd-steel)" stroke="#6f7f8f" />
      {teeth.map((c) => (
        <path key={c} d={tooth(c)} fill="url(#gd-steel)" stroke="#8a99a8" />
      ))}

      {/* Flux concentrating into each tooth tip */}
      {teeth.map((c) =>
        [-22, 0, 22].map((dx) => (
          <path
            key={`${c}${dx}`}
            d={`M${c + dx * 1.4} 158 L${c + dx * 0.25} ${TIP_Y} L${c + dx * 0.6} 330`}
            className={dx === 0 ? 'flux' : 'flux flux-slow'}
            stroke="#3ee0c8"
            strokeOpacity={dx === 0 ? 0.8 : 0.45}
            strokeWidth="1.2"
          />
        )),
      )}

      {/* Shaft */}
      <rect x="0" y={SHAFT_Y} width="640" height={360 - SHAFT_Y} fill="url(#gd-shaft)" />

      {/* Fluid bridges */}
      {teeth.map((c) => (
        <path key={c} d={bridge(c)} fill="#3ee0c8" className="fluid" />
      ))}

      {/* Dimensions */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a9b6c3" stroke="#a9b6c3" strokeOpacity="0.6">
        <line x1="560" y1={TIP_Y} x2="620" y2={TIP_Y} strokeDasharray="2 3" />
        <line x1="612" y1={TIP_Y - 10} x2="612" y2={SHAFT_Y + 10} />
        <text x="540" y={TIP_Y - 16} stroke="none">δ = 0,1 мм</text>

        <line x1="26" y1={POLE_BOTTOM} x2="110" y2={POLE_BOTTOM} strokeDasharray="2 3" />
        <line x1="34" y1={POLE_BOTTOM} x2="34" y2={TIP_Y} />
        <line x1="26" y1={TIP_Y} x2="140" y2={TIP_Y} strokeDasharray="2 3" />
        <text x="0" y={POLE_BOTTOM + 40} stroke="none" fill="#8794a2">hz</text>
      </g>

      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8794a2">
        <text x="66" y="176">ПОЛЮСНЫЙ НАКОНЕЧНИК</text>
        <text x="16" y="330" fill="#28323c">ВАЛ</text>
      </g>
    </svg>
  )
}
