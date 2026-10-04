import { MzhuAssembly } from './MzhuAssembly'

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <div className="wrap relative z-10 flex flex-col justify-center pt-14 pb-6 lg:min-h-[calc(100svh-4rem)] lg:py-20">
        <div className="max-w-[35rem]">
          <p className="hero-animate font-mono text-xs tracking-[0.18em] text-steel-light uppercase">
            Магнитожидкостное уплотнение
          </p>
          <p
            className="hero-animate hero-animate-delay-1 mt-3 font-display text-[clamp(4rem,11vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-text"
            aria-hidden="true"
          >
            МЖУ
          </p>
          <h1 className="hero-animate hero-animate-delay-1 mt-7 text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.15] font-medium text-text">
            <span className="sr-only">МЖУ — </span>
            Герметизация вала без&nbsp;контакта и&nbsp;износа
          </h1>
          <p className="hero-animate hero-animate-delay-2 mt-5 max-w-[30rem] text-lg leading-relaxed text-muted">
            Магнитная жидкость держит давление в зазоре 0,1&nbsp;мм, пока классическая манжета трёт вал и стареет.
          </p>
          <div className="hero-animate hero-animate-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            {/* <a href="#contact" className="btn btn-primary">
              Запросить расчёт
              <span aria-hidden="true">→</span>
            </a> */}
            <a href="#proof" className="btn btn-ghost">
              Смотреть характеристики
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-visual relative h-[72vw] max-h-[460px] min-h-[260px] w-full lg:absolute lg:top-16 lg:right-0 lg:bottom-0 lg:left-[35%] lg:h-auto lg:max-h-none"
      >
        <MzhuAssembly className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-bg/60" aria-hidden="true" />
    </section>
  )
}
