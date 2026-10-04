import { useEffect, useRef } from 'react'

const metrics = [
  { value: '1,93', unit: 'Тл', label: 'Bmax над вершиной зуба', note: 'ΔB ≈ 1,0 Тл, без перенасыщения' },
  { value: '1,648', unit: 'бар', label: 'Статическая герметичность', note: 'Вал неподвижен' },
  { value: '1,504', unit: 'бар', label: 'Динамическая герметичность', note: 'При 3000 об/мин' },
  { value: '4,23', unit: '', label: 'Запас прочности зубьев', note: 'σизг max = 49,6 МПа' },
]

const methods = [
  { title: 'Магнитное поле', text: 'Численное моделирование МКЭ в FEMM и ANSYS.' },
  { title: 'Трение', text: 'Момент трения измерен на стенде, для сравнения измерена и армированная манжета.' },
  { title: 'Тепло и прочность', text: 'Расчёт вязкостных потерь, перегрева и изгибных напряжений в зубьях.' },
]

function Bar({ label, value, ratio, accent }: { label: string; value: string; ratio: number; accent?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className={accent ? 'text-text' : 'text-muted'}>{label}</span>
        <span className={`num ${accent ? 'text-accent' : 'text-steel-light'}`}>{value}</span>
      </div>
      <div className="mt-2 h-2 bg-line">
        <div
          className={`h-full ${accent ? 'bg-accent' : 'bg-steel'}`}
          style={{ width: `${Math.max(ratio * 100, 1.5)}%` }}
        />
      </div>
    </div>
  )
}

export function Proof() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="proof" ref={ref} className="section reveal">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">Характеристики</p>
          <h2 className="h2">Цифры получены расчётом и на стенде</h2>
          <p className="lead">
            Подтверждено численным моделированием (МКЭ) и стендовыми испытаниями.
          </p>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="reveal-child border-t border-line pt-6">
              <dt className="text-sm text-steel-light">{m.label}</dt>
              <dd className="m-0 mt-3">
                <span className="num text-[length:var(--text-metric)] leading-none font-medium tracking-tight text-text">
                  {m.value}
                </span>
                {m.unit && <span className="ml-2 font-mono text-base text-muted">{m.unit}</span>}
                <span className="mt-3 block text-sm text-muted">{m.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal-child">
            <h3 className="text-lg text-text">Момент трения: в 10 раз меньше</h3>
            <div className="mt-6 grid gap-5">
              <Bar label="Армированная манжета" value="0,05 Н·м" ratio={1} />
              <Bar label="МЖУ" value="0,005 Н·м" ratio={0.1} accent />
            </div>
          </div>
          <div className="reveal-child">
            <h3 className="text-lg text-text">Скорость: запас больше 3×</h3>
            <div className="mt-6 grid gap-5">
              <Bar label="Критическая скорость разрушения пробки" value="1063,3 рад/с" ratio={1} />
              <Bar label="Рабочая, 3000 об/мин" value="314,16 рад/с" ratio={314.16 / 1063.3} accent />
            </div>
          </div>
        </div>

        <div className="reveal-child mt-20 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          {methods.map((m) => (
            <div key={m.title}>
              <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{m.title}</p>
              <p className="mt-3 text-muted">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
