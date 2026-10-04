const parts = [
  { name: 'Вал', material: 'Сталь 45, диаметр 15,2 мм' },
  { name: 'Полюсные наконечники', material: 'Сталь 10, 6 трапециевидных зубьев' },
  { name: 'Постоянный магнит', material: 'NdFeB N35, D40 × d20 × 10 мм, аксиальная намагниченность' },
  { name: 'Ярмо', material: 'Сталь 10, кольцо замыкания потока' },
  { name: 'Магнитная жидкость', material: 'Ферромагнитная, основа керосин, плотность ≈ 1,2 г/см³' },
  { name: 'Корпус и крышки', material: 'ПЛА (диэлектрик), болты M6×20' },
]

const geometry = [
  { symbol: 'd', label: 'Диаметр вала', value: '15,2 мм' },
  { symbol: 'δ', label: 'Радиальный рабочий зазор', value: '0,1 мм' },
  { symbol: 'L', label: 'Осевая длина наконечника', value: '10 мм' },
  { symbol: 't', label: 'Профиль зуба', value: '0,2 мм' },
  { symbol: 'hz', label: 'Высота зуба', value: '1,15 мм' },
  { symbol: 'b', label: 'Профиль зуба', value: '2,3 мм' },
]

export function Construction() {
  return (
    <section id="construction" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">Конструкция</p>
          <h2 className="h2">Шесть компонентов в совершенной гармонии</h2>
          <p className="lead">Каждый номер на схеме соответствует компоненту в таблице. Магнитное поле направляет жидкость, жидкость запирает зазор.</p>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Состав магнитожидкостного уплотнения</caption>
            <thead>
              <tr className="border-b border-line font-mono text-xs tracking-[0.12em] text-muted uppercase">
                <th scope="col" className="w-14 py-3 font-normal">Поз.</th>
                <th scope="col" className="py-3 font-normal">Деталь</th>
                <th scope="col" className="hidden py-3 font-normal sm:table-cell">Материал</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p, i) => (
                <tr key={p.name} className="border-b border-line align-baseline">
                  <td className="num py-4 text-sm text-accent">0{i + 1}</td>
                  <th scope="row" className="py-4 pr-6 font-medium text-text">
                    {p.name}
                    <span className="mt-1 block text-sm font-normal text-muted sm:hidden">{p.material}</span>
                  </th>
                  <td className="hidden py-4 text-muted sm:table-cell">{p.material}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h3 className="font-mono text-xs font-normal tracking-[0.12em] text-muted uppercase">
              Ключевая геометрия
            </h3>
            <dl className="mt-3 border-t border-line">
              {geometry.map((g) => (
                <div key={g.symbol} className="flex items-baseline gap-4 border-b border-line py-4">
                  <dt className="flex flex-1 items-baseline gap-4">
                    <span className="num w-8 text-accent italic">{g.symbol}</span>
                    <span className="text-muted">{g.label}</span>
                  </dt>
                  <dd className="num m-0 text-text">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
