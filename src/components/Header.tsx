const nav = [
  { href: '#solution', label: 'Принцип' },
  { href: '#benefits', label: 'Преимущества' },
  { href: '#proof', label: 'Характеристики' },
  { href: '#construction', label: 'Конструкция' },
  { href: '#applications', label: 'Применение' },
]

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-center gap-6">
        <a href="#top" className="flex items-center gap-3 absolute left-40" aria-label="МЖУ — на главную">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="12" stroke="#3ee0c8" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="5" fill="#a9b6c3" />
          </svg>
          <span className="font-display text-base font-semibold tracking-tight text-text">МЖУ</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-text">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
