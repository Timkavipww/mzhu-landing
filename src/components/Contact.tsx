import { useState, type FormEvent } from 'react'

type FormState = { name: string; company: string; email: string; comment: string }
type Errors = Partial<Record<keyof FormState, string>>

const initial: FormState = { name: '', company: '', email: '', comment: '' }

const inputs = ['Диаметр вала', 'Рабочие обороты', 'Рабочая среда', 'Перепад давления']

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Укажите имя'
  if (!values.email.trim()) errors.email = 'Укажите email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Проверьте формат email'
  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    // No backend yet: the request is only logged.
    console.log('Запрос расчёта МЖУ', values)
    setSent(true)
    setValues(initial)
  }

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Расчёт</p>
          <h2 className="h2">Рассчитаем МЖУ под ваш вал</h2>
          <p className="lead max-w-lg">
            Опишите узел, и мы подберём геометрию зазора, зубьев и магнитной системы и оценим герметичность и трение
            для ваших условий.
          </p>

          <div className="mt-10">
            <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">Что пригодится для расчёта</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 border-t border-line">
              {inputs.map((item) => (
                <li key={item} className="border-b border-line py-3 text-steel-light">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[var(--radius-md)] border border-line bg-bg-elevated/80 p-6 backdrop-blur-sm sm:p-9">
          {sent ? (
            <div role="status" className="flex min-h-[22rem] flex-col justify-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="19" stroke="#3ee0c8" strokeWidth="1.5" />
                <path d="M12 20.5l5.5 5.5L28 15" stroke="#3ee0c8" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <h3 className="mt-6 text-xl text-text">Запрос принят</h3>
              <p className="mt-3 text-muted">Свяжемся с вами по email и уточним параметры узла.</p>
              <button type="button" className="btn btn-ghost mt-8 self-start" onClick={() => setSent(false)}>
                Отправить ещё один запрос
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-label="Запрос расчёта">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="contact-name">Имя *</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="contact-name-error" className="field-error">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="contact-company">Компания</label>
                  <input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    onChange={update('company')}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <span id="contact-email-error" className="field-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-comment">Задача</label>
                <textarea
                  id="contact-comment"
                  name="comment"
                  placeholder="Нужен расчёт под диаметр вала, обороты и среду…"
                  value={values.comment}
                  onChange={update('comment')}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto sm:justify-self-start">
                Запросить расчёт
                <span aria-hidden="true">→</span>
              </button>
              <p className="text-xs text-muted">* обязательные поля</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
