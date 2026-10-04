const areas = [
  { title: 'Центробежные машины', text: 'Узлы вращения, в которых нужны долгий ресурс и стабильная герметичность на рабочих оборотах.' },
  { title: 'Валы непрерывной работы', text: 'Контакта нет, поэтому нечему изнашиваться на длинной дистанции.' },
  { title: 'Узлы, чувствительные к трению и нагреву', text: 'Момент трения 0,005 Н·м и перегрев +6,3 °C без системы охлаждения.' },
  { title: 'Экстремальные условия', text: 'Там, где обслуживание затруднено, а отказ уплотнения недопустим.' },
]

export function Applications() {
  return (
    <section id="applications" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Применение</p>
          <h2 className="h2">Где манжета уже не справляется</h2>
          <p className="lead">
            Геометрию зазора, зубьев и магнитной системы рассчитываем под ваш диаметр вала, обороты и среду.
          </p>
        </div>

        <ul className="border-t border-line">
          {areas.map((a) => (
            <li key={a.title} className="border-b border-line py-8">
              <h3 className="text-[clamp(1.15rem,2vw,1.45rem)] text-text">{a.title}</h3>
              <p className="mt-3 max-w-xl text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
