import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroSection from '@/components/HeroSection'
import EncartesSection from '@/components/EncartesSection'
import SorteiosSection from '@/components/SorteiosSection'
import ProdutosSection from '@/components/ProdutosSection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <EncartesSection />
        <SorteiosSection />
        <ProdutosSection />
        {/* Banner Verificados */}
        <section className="w-full">
          <img
            src="/verificados.png"
            alt="Agora somos verificados — Nos siga para acompanhar tudo nessa nova etapa"
            className="w-full h-auto"
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
