const consequences = [
  { title: 'Износ вала', text: 'Кромка манжеты трёт посадочную поверхность и стирает её вместе с собой.' },
  { title: 'Высокий момент трения', text: 'Контакт под натягом съедает мощность привода и греет узел.' },
  { title: 'Падение герметичности', text: 'По мере износа уплотнение начинает пропускать среду, и узел уходит в ремонт.' },
]

export function Problem() {
  return (
    <section id="problem" className="section">
      <div className="wrap">
        <p className="eyebrow text-danger">Проблема</p>
        <h2 className="h2 max-w-4xl">
          Манжета герметизирует вал трением. За&nbsp;это вы&nbsp;платите ресурсом.
        </h2>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {consequences.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <span className="num text-xs text-danger">0{i + 1}</span>
              <h3 className="mt-3 text-lg text-text">{item.title}</h3>
              <p className="mt-2 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
