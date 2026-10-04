import { GapDiagram } from './GapDiagram'

const chain = [
  { title: 'Магнит', detail: 'Кольцевой NdFeB N35 создаёт магнитный поток.' },
  { title: 'Ярмо', detail: 'Магнитопровод из стали 10 замыкает поток на рабочий зазор.' },
  { title: 'Зубья', detail: 'Четыре трапециевидных зуба концентрируют поле на вершинах.' },
  { title: 'Градиент поля', detail: 'Над вершиной 1,93 Тл, во впадине 0,8–0,9 Тл. Перепад ≈ 1,0 Тл.' },
  { title: 'Жидкостный барьер', detail: 'Магнитная жидкость стягивается под зубья и запирает зазор 0,1 мм.' },
]

export function Solution() {
  return (
    <section id="solution" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow">Принцип</p>
          <h2 className="h2">Поле держит жидкость. Жидкость держит давление.</h2>
          <p className="lead">
            Неоднородное поле постоянного магнита и зубчатых полюсных наконечников удерживает магнитную жидкость в
            рабочем зазоре. С&nbsp;валом контактирует только жидкость.
          </p>

          <ol className="mt-10 border-l border-line">
            {chain.map((step, i) => (
              <li key={step.title} className="relative py-3 pl-7">
                <span
                  className="absolute top-[1.2rem] left-[-4px] h-[7px] w-[7px] rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="flex items-baseline gap-3">
                  <span className="num text-xs text-accent">0{i + 1}</span>
                  <span className="font-medium text-text">{step.title}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="m-0">
          <GapDiagram className="h-auto w-full" />
          <figcaption className="mt-4 font-mono text-xs text-muted">
            Рабочий зазор крупным планом: профиль индукции над зубьями и жидкостные мостики. Схема, не в масштабе.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
