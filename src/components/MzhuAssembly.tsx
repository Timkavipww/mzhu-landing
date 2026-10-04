type MzhuAssemblyProps = {
  className?: string
}

/* ============================================================
 * MZHU ASSEMBLY
 * Schematic axial half-section.
 * Upper half is defined explicitly and mirrored below the shaft.
 * ============================================================ */

const AXIS_Y = 280

const SHAFT_TOP = 254
const SHAFT_BOTTOM = AXIS_Y * 2 - SHAFT_TOP

const TOOTH_BASE_Y = 228
const TOOTH_TIP_Y = 240

/*
 * The real gap is intentionally exaggerated visually.
 * The actual dimension is shown separately as δ = 0,1 мм.
 */
const GAP_VALUE = 'δ = 0,1 мм'

/* Shift the complete sealing assembly relative to the shaft. */
const ASSEMBLY_SHIFT_X = -140

/* ------------------------------------------------------------
 * Main geometry
 * ------------------------------------------------------------ */

const LEFT_POLE = {
  x: 258 + ASSEMBLY_SHIFT_X,
  w: 112,
}

const RIGHT_POLE = {
  x: 530 + ASSEMBLY_SHIFT_X,
  w: 112,
}

const YOKE = {
  x: 370 + ASSEMBLY_SHIFT_X,
  w: 160,
  y: 96,
  h: 20,
}

const MAGNET = {
  x: 370 + ASSEMBLY_SHIFT_X,
  w: 160,
  y: 116,
  h: 90,
}

/*
 * Housing is calculated from the pole-piece dimensions.
 * Therefore the pole pieces and their teeth always remain
 * inside the housing.
 */
const HOUSING = {
  left: LEFT_POLE.x - 28,
  right: RIGHT_POLE.x + RIGHT_POLE.w + 28,
  outerTop: 70,
  innerTop: 96,
  bottom: 248,
  innerLeft: LEFT_POLE.x,
  innerRight: RIGHT_POLE.x + RIGHT_POLE.w,
}

const BOLTS = [
  HOUSING.left + 14,
  HOUSING.right - 14,
]

/* ------------------------------------------------------------
 * Teeth
 *
 * Six teeth fill the entire pole-piece width.
 *
 * Important:
 *   first tooth starts exactly at x
 *   last tooth ends exactly at x + w
 * ------------------------------------------------------------ */

const TOOTH_COUNT = 6

const getToothPitch = (poleWidth: number) =>
  poleWidth / TOOTH_COUNT

const getToothCenters = (pole: { x: number; w: number }) => {
  const pitch = getToothPitch(pole.w)

  return Array.from(
    { length: TOOTH_COUNT },
    (_, index) => pole.x + pitch * (index + 0.5),
  )
}

const leftTeeth = getToothCenters(LEFT_POLE)
const rightTeeth = getToothCenters(RIGHT_POLE)

const toothPath = (
  poleX: number,
  poleWidth: number,
  index: number,
) => {
  const pitch = poleWidth / TOOTH_COUNT

  const x0 = poleX + index * pitch
  const x1 = x0 + pitch
  const center = (x0 + x1) / 2

  const tipHalfWidth = Math.min(3.5, pitch * 0.22)

  return `
    M${x0} ${TOOTH_BASE_Y}
    L${center - tipHalfWidth} ${TOOTH_TIP_Y}
    L${center + tipHalfWidth} ${TOOTH_TIP_Y}
    L${x1} ${TOOTH_BASE_Y}
    Z
  `
}

/* ------------------------------------------------------------
 * Magnetic fluid
 * ------------------------------------------------------------ */

const fluidPath = (c: number) =>
  `
    M${c - 4} ${TOOTH_TIP_Y - 1}
    L${c + 4} ${TOOTH_TIP_Y - 1}
    Q${c + 6} ${SHAFT_TOP - 3} ${c + 10} ${SHAFT_TOP}
    L${c - 10} ${SHAFT_TOP}
    Q${c - 6} ${SHAFT_TOP - 3} ${c - 4} ${TOOTH_TIP_Y - 1}
    Z
  `

/* ------------------------------------------------------------
 * Magnetic flux
 * ------------------------------------------------------------ */

const fluxLoop = (
  top: number,
  xr: number,
  xl: number,
  depth: number,
) =>
  `
    M${xl + 20} ${top}
    H${xr - 20}

    Q${xr} ${top} ${xr} ${top + 20}

    V${depth - 6}

    Q${xr} ${depth} ${xr - 6} ${depth}

    H${xl + 6}

    Q${xl} ${depth} ${xl} ${depth - 6}

    V${top + 20}

    Q${xl} ${top} ${xl + 20} ${top}

    Z
  `

const loops = [
  {
    top: 180,
    xr: rightTeeth[0],
    xl: leftTeeth[5],
    depth: 260,
  },
  {
    top: 158,
    xr: rightTeeth[1],
    xl: leftTeeth[4],
    depth: 266,
  },
  {
    top: 136,
    xr: rightTeeth[2],
    xl: leftTeeth[3],
    depth: 271,
  },
  {
    top: 114,
    xr: rightTeeth[3],
    xl: leftTeeth[2],
    depth: 276,
  },
]

/* ------------------------------------------------------------
 * ГОСТ-style callout geometry
 *
 * A leader consists of:
 *
 *     element → inclined/vertical segment → elbow → shelf → text
 *
 * Lines are intentionally routed through different zones so
 * they do not cross each other.
 * ------------------------------------------------------------ */

const callouts = [
  /* 01 — Shaft */
  {
    n: '01',
    label: 'ВАЛ',
    anchor: {
      x: 90,
      y: AXIS_Y - 10,
    },
    elbow: {
      x: 45,
      y: 210,
    },
    shelf: {
      x1: 45,
      x2: 8,
      y: 210,
    },
    text: {
      x: 8,
      y: 206,
      anchor: 'start' as const,
    },
  },

  /* 02 — Magnet */
  {
    n: '03',
    label: 'ПОСТОЯННЫЙ МАГНИТ',
    anchor: {
      x: MAGNET.x + 42,
      y: MAGNET.y + 30,
    },
    elbow: {
      x: MAGNET.x + 64,
      y: 42,
    },
    shelf: {
      x1: MAGNET.x + 64,
      x2: MAGNET.x + 184,
      y: 42,
    },
    text: {
      x: MAGNET.x + 64,
      y: 38,
      anchor: 'start' as const,
    },
  },

  /* 03 — Pole pieces */
  {
    n: '02',
    label: 'ПОЛЮСНЫЕ НАКОНЕЧНИКИ',
    anchor: {
      x: LEFT_POLE.x + 38,
      y: 150,
    },
    elbow: {
      x: 180,
      y: 30,
    },
    shelf: {
      x1: 36,
      x2: 36,
      y: 30,
    },
    text: {
      x: 36,
      y: 26,
      anchor: 'start' as const,
    },
  },

  /* 04 — Housing */
  {
    n: '06',
    label: 'КОРПУС',
    anchor: {
      x: HOUSING.right - 10,
      y: 180 + 210,
    },
    elbow: {
      x: 570,
      y: 105 + 240,
    },
    shelf: {
      x1: 570,
      x2: 626,
      y: 105 + 240,
    },
    text: {
      x: 570,
      y: 101 + 240,
      anchor: 'start' as const,
    },
  },

  /* 05 — Magnetic fluid */
  {
    n: '05',
    label: 'МАГНИТНАЯ ЖИДКОСТЬ',
    anchor: {
      x: rightTeeth[4] + 2,
      y: SHAFT_TOP - 8,
    },
    elbow: {
      x: 555 - 18,
      y: 215 - 40,
    },
    shelf: {
      x1: 555 - 18,
      x2: 662,
      y: 215 - 40,
    },
    text: {
      x: 555 - 18,
      y: 211 - 40,
      anchor: 'start' as const,
    },
  },

  /* 06 — Yoke */
  {
    n: '04',
    label: 'ЯРМО',
    anchor: {
      x: YOKE.x + YOKE.w - 25,
      y: YOKE.y + YOKE.h / 2,
    },
    elbow: {
      x: 435,
      y: 52,
    },
    shelf: {
      x1: 435,
      x2: 485,
      y: 52,
    },
    text: {
      x: 435,
      y: 48,
      anchor: 'start' as const,
    },
  },

  /* 07 — Flux direction */

]

/* ------------------------------------------------------------
 * Component
 * ------------------------------------------------------------ */

export function MzhuAssembly({
  className = '',
}: MzhuAssemblyProps) {
  return (
    <svg
      className={className}
      viewBox="-150 0 900 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Схема магнитожидкостного уплотнения в осевом сечении"
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        {/* =====================================================
         * SHAFT
         * ===================================================== */}

        <linearGradient
          id="mz-shaft"
          x1="0"
          y1={SHAFT_TOP}
          x2="0"
          y2={SHAFT_BOTTOM}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d5dde5" />
          <stop offset="0.18" stopColor="#9eabb8" />
          <stop offset="0.5" stopColor="#5d6a77" />
          <stop offset="0.82" stopColor="#8d9aa7" />
          <stop offset="1" stopColor="#4a5560" />
        </linearGradient>

        <linearGradient
          id="mz-shaft-fade"
          x1="-260"
          y1="0"
          x2="160"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#fff"
            stopOpacity="0"
          />

          <stop
            offset="1"
            stopColor="#fff"
            stopOpacity="1"
          />
        </linearGradient>

        <mask
          id="mz-shaft-mask"
          maskUnits="userSpaceOnUse"
          x="-2000"
          y="0"
          width="5000"
          height="560"
        >
          <rect
            x="-2000"
            y="0"
            width="5000"
            height="560"
            fill="url(#mz-shaft-fade)"
          />
        </mask>

        {/* =====================================================
         * STEEL
         * ===================================================== */}

        <linearGradient
          id="mz-steel"
          x1="0"
          y1="96"
          x2="0"
          y2="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#303a45" />
          <stop offset="1" stopColor="#1f2730" />
        </linearGradient>

        {/* =====================================================
         * MAGNET
         * ===================================================== */}

        <linearGradient
          id="mz-magnet"
          x1={MAGNET.x}
          y1="0"
          x2={MAGNET.x + MAGNET.w}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3a4048" />
          <stop offset="0.5" stopColor="#4c535c" />
          <stop offset="1" stopColor="#3a4048" />
        </linearGradient>

        {/* =====================================================
         * MAGNETIC FLUID
         * ===================================================== */}

        <linearGradient
          id="mz-fluid"
          x1="0"
          y1={TOOTH_TIP_Y}
          x2="0"
          y2={SHAFT_TOP}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3ee0c8" />
          <stop offset="1" stopColor="#1f9e8c" />
        </linearGradient>

        {/* =====================================================
         * GLOW
         * ===================================================== */}

        <radialGradient
          id="mz-glow"
          cx={450 + ASSEMBLY_SHIFT_X}
          cy={AXIS_Y}
          r="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#3ee0c8"
            stopOpacity="0.16"
          />

          <stop
            offset="1"
            stopColor="#3ee0c8"
            stopOpacity="0"
          />
        </radialGradient>

        {/* =====================================================
         * HOUSING HATCH
         * ===================================================== */}

        <pattern
          id="mz-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="#a9b6c3"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
        </pattern>

        {/* =====================================================
         * CALLOUT ARROW
         *
         * Filled arrowhead similar to technical-drawing
         * leader-line termination.
         * ===================================================== */}

        <marker
          id="mz-callout-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path
            d="M10 0L0 5L10 10Z"
            fill="#a9b6c3"
          />
        </marker>

        {/* =====================================================
         * DIMENSION ARROW
         * ===================================================== */}

        <marker
          id="mz-dimension-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M10 0 L0 5 L10 10 Z"
            fill="#a9b6c3"
          />
        </marker>

        {/* =====================================================
         * FLUX ARROW
         * ===================================================== */}

        <marker
          id="mz-flux-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path
            d="M0 0 L10 5 L0 10 Z"
            fill="#3ee0c8"
          />
        </marker>

        {/* =====================================================
         * UPPER HALF
         * ===================================================== */}

        <g id="mz-half">
          {/* -------------------------------------------------
           * 04 Housing
           * ------------------------------------------------- */}

          <path
            d={`
              M${HOUSING.left} ${HOUSING.outerTop}
              H${HOUSING.right}
              V${HOUSING.bottom}
              H${HOUSING.innerRight}
              V${HOUSING.innerTop}
              H${HOUSING.innerLeft}
              V${HOUSING.bottom}
              H${HOUSING.left}
              Z
            `}
            fill="#171d24"
            stroke="#3a4450"
            strokeWidth="1"
          />

          <path
            d={`
              M${HOUSING.left} ${HOUSING.outerTop}
              H${HOUSING.right}
              V${HOUSING.bottom}
              H${HOUSING.innerRight}
              V${HOUSING.innerTop}
              H${HOUSING.innerLeft}
              V${HOUSING.bottom}
              H${HOUSING.left}
              Z
            `}
            fill="url(#mz-hatch)"
          />

          {/* -------------------------------------------------
           * Housing bolts
           * ------------------------------------------------- */}

          {BOLTS.map((x) => (
            <g key={x}>
              <rect
                x={x - 7}
                y="60"
                width="14"
                height="10"
                rx="1.5"
                fill="#56616d"
              />

              <line
                x1={x}
                y1="70"
                x2={x}
                y2="150"
                stroke="#56616d"
                strokeWidth="3"
                strokeDasharray="3 2"
              />
            </g>
          ))}

          {/* -------------------------------------------------
           * 03 Pole pieces
           * ------------------------------------------------- */}

          {[LEFT_POLE, RIGHT_POLE].map((pole) => (
            <g key={pole.x}>
              {/* Pole piece base rectangle */}
              <rect
                x={pole.x}
                y="96"
                width={pole.w}
                height={TOOTH_BASE_Y - 96}
                fill="url(#mz-steel)"
                stroke="#6f7f8f"
                strokeWidth="1"
              />

              {/* Remove stroke at tooth base where teeth contact magnet */}
              <rect
                x={pole.x}
                y={TOOTH_BASE_Y - 1}
                width={pole.w}
                height="3"
                fill="url(#mz-steel)"
                stroke="none"
              />
            </g>
          ))}

          {/* -------------------------------------------------
           * Teeth
           *
           * Exactly fill each pole piece from edge to edge.
           * ------------------------------------------------- */}

          {Array.from(
            { length: TOOTH_COUNT },
            (_, index) => (
              <path
                key={`left-tooth-${index}`}
                d={toothPath(
                  LEFT_POLE.x,
                  LEFT_POLE.w,
                  index,
                )}
                fill="#2f3842"
                stroke="#8a99a8"
                strokeWidth="1"
              />
            ),
          )}

          {Array.from(
            { length: TOOTH_COUNT },
            (_, index) => (
              <path
                key={`right-tooth-${index}`}
                d={toothPath(
                  RIGHT_POLE.x,
                  RIGHT_POLE.w,
                  index,
                )}
                fill="#2f3842"
                stroke="#8a99a8"
                strokeWidth="1"
              />
            ),
          )}

          {/* -------------------------------------------------
           * 06 Yoke
           * ------------------------------------------------- */}

          <rect
            x={YOKE.x}
            y={YOKE.y}
            width={YOKE.w}
            height={YOKE.h}
            fill="url(#mz-steel)"
            stroke="#6f7f8f"
            strokeWidth="1"
          />

          {/* -------------------------------------------------
           * 02 Ring magnet
           * ------------------------------------------------- */}

          <rect
            x={MAGNET.x}
            y={MAGNET.y}
            width={MAGNET.w}
            height={MAGNET.h}
            fill="url(#mz-magnet)"
            stroke="#8794a2"
            strokeWidth="1"
          />

          <rect
            x={MAGNET.x}
            y={MAGNET.y}
            width={MAGNET.w / 2}
            height={MAGNET.h}
            fill="#6f7f8f"
            fillOpacity="0.08"
          />

          {/* -------------------------------------------------
           * Magnetic flux
           * ------------------------------------------------- */}

          {loops.map((loop, index) => (
            <path
              key={loop.top}
              d={fluxLoop(
                loop.top,
                loop.xr,
                loop.xl,
                loop.depth,
              )}
              className={
                index % 2
                  ? 'flux flux-slow'
                  : 'flux'
              }
              stroke="#3ee0c8"
              strokeOpacity={
                0.74 - index * 0.11
              }
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          ))}

          {/* -------------------------------------------------
           * 05 Magnetic fluid
           * ------------------------------------------------- */}

          {[
            ...leftTeeth,
            ...rightTeeth,
          ].map((center) => (
            <path
              key={`fluid-${center}`}
              d={fluidPath(center)}
              fill="url(#mz-fluid)"
              className="fluid"
            />
          ))}

          {/* -------------------------------------------------
           * Magnetic flux direction (from FEMM analysis)
           *
           * Flux circulates: magnet → all right teeth down → shaft
           *                → all left teeth up → magnet
           * No flux exits to yoke (stays within sealing circuit)
           * ------------------------------------------------- */}

          <g
            pointerEvents="none"
            stroke="#3ee0c8"
            strokeOpacity="0.8"
            strokeWidth="1.25"
          >
            {/* Right side: teeth downward */}
            {rightTeeth.map((tooth, idx) => (
              <line
                key={`right-flux-${idx}`}
                x1={tooth}
                y1="236"
                x2={tooth}
                y2="250"
                markerEnd="url(#mz-flux-arrow)"
              />
            ))}

            {/* Bottom: right to left along shaft */}
            <line
              x1={rightTeeth[5] - 20}
              y1="262"
              x2={leftTeeth[0] + 20}
              y2="262"
              markerEnd="url(#mz-flux-arrow)"
            />

            {/* Left side: teeth upward */}
            {leftTeeth.map((tooth, idx) => (
              <line
                key={`left-flux-${idx}`}
                x1={tooth}
                y1="250"
                x2={tooth}
                y2="236"
                markerEnd="url(#mz-flux-arrow)"
              />
            ))}
          </g>
        </g>
      </defs>

      {/* =======================================================
       * FIELD GLOW
       * ======================================================= */}

      <ellipse
        cx={450 + ASSEMBLY_SHIFT_X}
        cy={AXIS_Y}
        rx="340"
        ry="230"
        fill="url(#mz-glow)"
      />

      {/* =======================================================
       * 01 SHAFT
       * ======================================================= */}

      <g mask="url(#mz-shaft-mask)">
        <rect
          x="-320"
          y={SHAFT_TOP}
          width="1700"
          height={SHAFT_BOTTOM - SHAFT_TOP}
          fill="url(#mz-shaft)"
        />

        {/* Shaft centerline - stay within magnet bounds */}
        <line
          x1={MAGNET.x}
          y1={AXIS_Y}
          x2={MAGNET.x + MAGNET.w}
          y2={AXIS_Y}
          stroke="#e9eef2"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          strokeDasharray="28 6 4 6"
        />
      </g>

      {/* Magnetic field direction inside magnets (S → N) */}
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        fill="none"
        stroke="#3ee0c8"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      >
        {/* Upper magnet field arrow left (S-pole) to right (N-pole) */}
        <line
          x1={MAGNET.x + 20}
          y1={MAGNET.y + 25}
          x2={MAGNET.x + MAGNET.w - 20}
          y2={MAGNET.y + 25}
          markerEnd="url(#mz-flux-arrow)"
        />

        {/* Lower magnet field arrow left (S-pole) to right (N-pole) */}
        <line
          x1={MAGNET.x + 20}
          y1={AXIS_Y * 2 - MAGNET.y - 25}
          x2={MAGNET.x + MAGNET.w - 20}
          y2={AXIS_Y * 2 - MAGNET.y - 25}
          markerEnd="url(#mz-flux-arrow)"
        />
      </g>

      {/* =======================================================
       * UPPER HALF
       * ======================================================= */}

      <use href="#mz-half" />

      {/* =======================================================
       * LOWER HALF
       * ======================================================= */}

      <use
        href="#mz-half"
        transform={`translate(0 ${AXIS_Y * 2}) scale(1 -1)`}
      />

      {/* =======================================================
       * MAGNET POLARITY
       * ======================================================= */}

      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        fill="#a9b6c3"
      >
        {/* Upper magnet */}
        <text
          x={MAGNET.x + 14}
          y={MAGNET.y + 56}
        >
          S
        </text>

        <text
          x={MAGNET.x + MAGNET.w - 22}
          y={MAGNET.y + 56}
        >
          N
        </text>

        {/* Lower magnet */}
        <text
          x={MAGNET.x + 14}
          y={AXIS_Y * 2 - MAGNET.y - 50}
        >
          S
        </text>

        <text
          x={
            MAGNET.x +
            MAGNET.w -
            22
          }
          y={
            AXIS_Y * 2 -
            MAGNET.y -
            50
          }
        >
          N
        </text>
      </g>

      {/* =======================================================
       * GAP DIMENSION
       *
       * Tooth tip → shaft surface
       *
       * ГОСТ-style:
       *   extension lines
       *   dimension line
       *   two arrowheads
       *   dimension value
       * ======================================================= */}

      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        fill="#a9b6c3"
      >
        {/* Upper extension line */}
        <line
          x1={RIGHT_POLE.x + RIGHT_POLE.w - 8}
          y1={TOOTH_TIP_Y}
          x2="550"
          y2={TOOTH_TIP_Y}
          stroke="#a9b6c3"
          strokeOpacity="0.65"
          strokeWidth="0.8"
        />

        {/* Lower extension line */}
        <line
          x1={RIGHT_POLE.x + RIGHT_POLE.w - 8}
          y1={SHAFT_TOP}
          x2="520"
          y2={SHAFT_TOP}
          stroke="#a9b6c3"
          strokeOpacity="0.65"
          strokeWidth="0.8"
        />

        {/* Vertical dimension line */}
        <line
          x1="550"
          y1={TOOTH_TIP_Y}
          x2="550"
          y2={SHAFT_TOP}
          stroke="#a9b6c3"
          strokeWidth="0.9"
          markerStart="url(#mz-dimension-arrow)"
          markerEnd="url(#mz-dimension-arrow)"
        />

        {/* Dimension text */}
        <text
          x="555"
          y="249"
          textAnchor="start"
          fill="#a9b6c3"
        >
          {GAP_VALUE}
        </text>
      </g>

      {/* =======================================================
       * GOST-STYLE CALLOUTS
       *
       * Leaders do not cross each other.
       * Each leader terminates with an arrow at the element.
       * ======================================================= */}

      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
        fontWeight="500"
        fill="#a9b6c3"
      >
        {callouts.map((callout) => (
          <g key={callout.n}>
            {/* Main leader */}
            <polyline
              points={`
                ${callout.anchor.x},${callout.anchor.y}
                ${callout.elbow.x},${callout.elbow.y}
              `}
              fill="none"
              stroke="#a9b6c3"
              strokeOpacity="0.65"
              strokeWidth="0.8"
              markerStart="url(#mz-callout-arrow)"
            />

            {/* Horizontal shelf */}
            <line
              x1={callout.shelf.x1}
              y1={callout.shelf.y}
              x2={callout.shelf.x2}
              y2={callout.shelf.y}
              stroke="#a9b6c3"
              strokeOpacity="0.65"
              strokeWidth="0.8"
            />

            {/* Shelf connector */}
            <line
              x1={callout.elbow.x}
              y1={callout.elbow.y}
              x2={callout.shelf.x1}
              y2={callout.shelf.y}
              stroke="#a9b6c3"
              strokeOpacity="0.65"
              strokeWidth="0.8"
            />

            {/* Number + label */}
            <text
              x={callout.text.x}
              y={callout.text.y}
              textAnchor={callout.text.anchor}
              fill="#a9b6c3"
            >
              {callout.n} {callout.label}
            </text>
          </g>
        ))}
      </g>

    </svg>
  )
}