type MzhuAssemblyProps = {
  className?: string
}

/* Schematic axial half-section (upper half is drawn, lower half is mirrored). Not to scale: the 0,1 мм gap is exaggerated. */
const AXIS_Y = 280
const SHAFT_TOP = 252
const TOOTH_BASE_Y = 228
const TOOTH_TIP_Y = 240

const LEFT_POLE = { x: 258, w: 112 }
const RIGHT_POLE = { x: 530, w: 112 }
const MAGNET = { x: 370, w: 160, y: 96, h: 100 }

const PITCH = 28
const toothCenters = (x0: number) => [0, 1, 2, 3].map((i) => x0 + PITCH / 2 + i * PITCH)
const leftTeeth = toothCenters(LEFT_POLE.x)
const rightTeeth = toothCenters(RIGHT_POLE.x)

const toothPath = (c: number) =>
  `M${c - 9} ${TOOTH_BASE_Y} L${c - 3} ${TOOTH_TIP_Y} L${c + 3} ${TOOTH_TIP_Y} L${c + 9} ${TOOTH_BASE_Y} Z`

const fluidPath = (c: number) =>
  `M${c - 4} ${TOOTH_TIP_Y - 1} L${c + 4} ${TOOTH_TIP_Y - 1} Q${c + 6} ${SHAFT_TOP - 3} ${c + 10} ${SHAFT_TOP} L${c - 10} ${SHAFT_TOP} Q${c - 6} ${SHAFT_TOP - 3} ${c - 4} ${TOOTH_TIP_Y - 1} Z`

/* Closed flux loop: through the magnet (S→N), down the right pole + teeth, along the shaft, up the left teeth. */
const fluxLoop = (top: number, xr: number, xl: number, depth: number) =>
  `M${xl + 20} ${top} H${xr - 20} Q${xr} ${top} ${xr} ${top + 20} V${depth - 6} Q${xr} ${depth} ${xr - 6} ${depth} H${xl + 6} Q${xl} ${depth} ${xl} ${depth - 6} V${top + 20} Q${xl} ${top} ${xl + 20} ${top} Z`

const loops = [
  { top: 180, xr: rightTeeth[0], xl: leftTeeth[3], depth: 260 },
  { top: 158, xr: rightTeeth[1], xl: leftTeeth[2], depth: 266 },
  { top: 134, xr: rightTeeth[2], xl: leftTeeth[1], depth: 271 },
  { top: 112, xr: rightTeeth[3], xl: leftTeeth[0], depth: 276 },
]

const callouts = [
  { n: '01', x: 800, y: 268, tx: 830, ty: 226 },
  { n: '02', x: 450, y: 120, tx: 450, ty: 34 },
  { n: '03', x: 314, y: 150, tx: 176, ty: 124 },
  { n: '04', x: 628, y: 236, tx: 770, ty: 150 },
  { n: '05', x: 656, y: 84, tx: 770, ty: 34 },
  { n: '06', x: 572, y: 247, tx: 740, ty: 242 },
  { n: '07', x: 244, y: 62, tx: 176, ty: 34 },
]

export function MzhuAssembly({ className = '' }: MzhuAssemblyProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Схема магнитожидкостного уплотнения в осевом сечении: вал, кольцевой магнит, полюсные наконечники с зубьями и магнитная жидкость в рабочем зазоре"
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mz-shaft" x1="0" y1={SHAFT_TOP} x2="0" y2={AXIS_Y * 2 - SHAFT_TOP} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d5dde5" />
          <stop offset="0.18" stopColor="#9eabb8" />
          <stop offset="0.5" stopColor="#5d6a77" />
          <stop offset="0.82" stopColor="#8d9aa7" />
          <stop offset="1" stopColor="#4a5560" />
        </linearGradient>
        <linearGradient id="mz-shaft-fade" x1="-260" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="mz-shaft-mask" maskUnits="userSpaceOnUse" x="-2000" y="0" width="5000" height="560">
          <rect x="-2000" y="0" width="5000" height="560" fill="url(#mz-shaft-fade)" />
        </mask>
        <linearGradient id="mz-steel" x1="0" y1="96" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3b4652" />
          <stop offset="1" stopColor="#252d36" />
        </linearGradient>
        <linearGradient id="mz-magnet" x1="370" y1="0" x2="530" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3a4048" />
          <stop offset="0.5" stopColor="#4c535c" />
          <stop offset="1" stopColor="#3a4048" />
        </linearGradient>
        <linearGradient id="mz-fluid" x1="0" y1={TOOTH_TIP_Y} x2="0" y2={SHAFT_TOP} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ee0c8" />
          <stop offset="1" stopColor="#1f9e8c" />
        </linearGradient>
        <radialGradient id="mz-glow" cx="450" cy={AXIS_Y} r="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ee0c8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#3ee0c8" stopOpacity="0" />
        </radialGradient>
        <pattern id="mz-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#a9b6c3" strokeOpacity="0.08" strokeWidth="2" />
        </pattern>

        <g id="mz-half">
          {/* 04 Housing (PLA) with M6 bolts */}
          <path
            d="M230 70 H670 V236 H642 V96 H258 V236 H230 Z"
            fill="#171d24"
            stroke="#3a4450"
            strokeWidth="1"
          />
          <path d="M230 70 H670 V236 H642 V96 H258 V236 H230 Z" fill="url(#mz-hatch)" />
          {[244, 656].map((x) => (
            <g key={x}>
              <rect x={x - 7} y="60" width="14" height="10" rx="1.5" fill="#56616d" />
              <line x1={x} y1="70" x2={x} y2="150" stroke="#56616d" strokeWidth="3" strokeDasharray="3 2" />
            </g>
          ))}

          {/* 03 Pole pieces / yoke (Сталь 10) with 4 trapezoid teeth each */}
          {[LEFT_POLE, RIGHT_POLE].map((p) => (
            <rect
              key={p.x}
              x={p.x}
              y="96"
              width={p.w}
              height={TOOTH_BASE_Y - 96}
              fill="url(#mz-steel)"
              stroke="#6f7f8f"
              strokeWidth="1"
            />
          ))}
          {[...leftTeeth, ...rightTeeth].map((c) => (
            <path key={c} d={toothPath(c)} fill="#2f3842" stroke="#8a99a8" strokeWidth="1" />
          ))}

          {/* 02 Ring magnet NdFeB N35, axial magnetization */}
          <rect
            x={MAGNET.x}
            y={MAGNET.y}
            width={MAGNET.w}
            height={MAGNET.h}
            fill="url(#mz-magnet)"
            stroke="#8794a2"
            strokeWidth="1"
          />
          <rect x={MAGNET.x} y={MAGNET.y} width={MAGNET.w / 2} height={MAGNET.h} fill="#6f7f8f" fillOpacity="0.08" />

          {/* Magnetic flux */}
          {loops.map((l, i) => (
            <path
              key={l.top}
              d={fluxLoop(l.top, l.xr, l.xl, l.depth)}
              className={i % 2 ? 'flux flux-slow' : 'flux'}
              stroke="#3ee0c8"
              strokeOpacity={0.75 - i * 0.12}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ))}

          {/* 05 Magnetic fluid bridges under each tooth */}
          {[...leftTeeth, ...rightTeeth].map((c) => (
            <path key={c} d={fluidPath(c)} fill="url(#mz-fluid)" className="fluid" />
          ))}
        </g>
      </defs>

      <ellipse cx="450" cy={AXIS_Y} rx="380" ry="230" fill="url(#mz-glow)" />

      {/* 01 Shaft, full bleed to the right */}
      <g mask="url(#mz-shaft-mask)">
        <rect x="-600" y={SHAFT_TOP} width="2400" height={(AXIS_Y - SHAFT_TOP) * 2} fill="url(#mz-shaft)" />
        <line
          x1="-600"
          y1={AXIS_Y}
          x2="1800"
          y2={AXIS_Y}
          stroke="#e9eef2"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          strokeDasharray="28 6 4 6"
        />
      </g>

      <use href="#mz-half" />
      <use href="#mz-half" transform={`translate(0 ${AXIS_Y * 2}) scale(1 -1)`} />

      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#a9b6c3">
        <text x={MAGNET.x + 14} y={MAGNET.y + 56}>S</text>
        <text x={MAGNET.x + MAGNET.w - 22} y={MAGNET.y + 56}>N</text>
        <text x={MAGNET.x + 14} y={AXIS_Y * 2 - MAGNET.y - 50}>S</text>
        <text x={MAGNET.x + MAGNET.w - 22} y={AXIS_Y * 2 - MAGNET.y - 50}>N</text>
      </g>

      {/* Position callouts; numbering matches the Construction section */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="500">
        {callouts.map((c) => (
          <g key={c.n}>
            <line x1={c.x} y1={c.y} x2={c.tx} y2={c.ty + 6} stroke="#a9b6c3" strokeOpacity="0.4" strokeWidth="0.8" />
            <circle cx={c.x} cy={c.y} r="2.5" fill="#3ee0c8" />
            <text x={c.tx} y={c.ty} textAnchor="middle" fill="#a9b6c3">
              {c.n}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
