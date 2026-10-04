import { Applications } from './components/Applications'
import { Benefits } from './components/Benefits'
import { Construction } from './components/Construction'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Proof } from './components/Proof'
import { Solution } from './components/Solution'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Proof />
        <Construction />
        <Applications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
