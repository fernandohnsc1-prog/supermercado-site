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
        {/* Banner Verificados */}
        <section className="bg-orange-50 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <img
              src="/verificados.png"
              alt="Agora somos verificados — Nos siga para acompanhar tudo nessa nova etapa"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </section>
        <EncartesSection />
        <SorteiosSection />
        <ProdutosSection />
      </main>
      <SiteFooter />
    </div>
  )
}
