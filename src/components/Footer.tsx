const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">
          <span className="font-display font-semibold text-text">МЖУ</span>
          <span className="mx-2 text-line">/</span>
          Магнитожидкостное уплотнение
        </p>
        <p className="m-0">Инженерные расчёты и прототип · {YEAR}</p>
      </div>
    </footer>
  )
}
