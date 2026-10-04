const benefits = [
  {
    value: '∞',
    label: 'Ресурс по контакту',
    text: 'Сухого трения нет. Нет и износа вала и уплотнения от контакта.',
  },
  {
    value: '−90%',
    label: 'Момент трения',
    text: '0,005 Н·м у МЖУ против 0,05 Н·м у армированной манжеты, примерно в 10 раз меньше.',
  },
  {
    value: '1,5 бар',
    label: 'Герметичность на ходу',
    text: '1,504 бар при 3000 об/мин, в статике 1,648 бар.',
  },
  {
    value: '↺',
    label: 'Самовосстановление',
    text: 'После частичного пробоя поле снова стягивает жидкость в зазор, и барьер восстанавливается сам.',
  },
  {
    value: '+6,3 °C',
    label: 'Нагрев в зазоре',
    text: 'Вязкостные потери 0,82 Вт. Отдельное охлаждение не нужно.',
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="section">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Преимущества</p>
            <h2 className="h2">Пять причин заменить манжету</h2>
          </div>
          <p className="lead lg:mt-0 lg:max-w-md lg:justify-self-end">
            Меньше трения, нет износа, стабильная герметичность и простое обслуживание.
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
          {benefits.map((item) => (
            <li
              key={item.label}
              className="group grid gap-2 border-b border-line py-7 md:grid-cols-[13rem_15rem_1fr] md:items-baseline md:gap-10 md:py-9"
            >
              <span className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none font-medium tracking-tight text-accent">
                {item.value}
              </span>
              <h3 className="text-lg text-text">{item.label}</h3>
              <p className="max-w-xl text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
