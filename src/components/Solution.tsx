import { GapDiagram } from './GapDiagram'

const chain = [
  { title: 'Вал', detail: 'Вращающийся вал диаметром 15,2 мм. С ним контактирует только жидкость.' },
  { title: 'Полюсные наконечники', detail: 'Шесть трапециевидных зубьев концентрируют магнитное поле.' },
  { title: 'Постоянный магнит', detail: 'Кольцевой NdFeB N35 создаёт и направляет магнитный поток.' },
  { title: 'Ярмо', detail: 'Магнитопровод из стали 10 замыкает поток, усиливая поле в зазоре.' },
  { title: 'Магнитная жидкость', detail: 'Стягивается к зубьям, создавая герметичный барьер 0,1 мм.' },
  { title: 'Корпус', detail: 'Пластиковый корпус с болтами M6 изолирует уплотнение.' },
]

export function Solution() {
  return (
    <section id="solution" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow">Принцип</p>
          <h2 className="h2">Поле держит жидкость. Жидкость держит давление.</h2>
          <p className="lead">
            Неоднородное магнитное поле (1,93 Тл над зубьями, 0,8–0,9 Тл во впадинах) удерживает магнитную жидкость в
            рабочем зазоре 0,1 мм. С&nbsp;валом контактирует только жидкость — механический износ исключён.
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
