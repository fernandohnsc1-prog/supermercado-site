import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroSection from '@/components/HeroSection'
import VerificadosSection from '@/components/VerificadosSection'
import EncartesSection from '@/components/EncartesSection'
import SorteiosSection from '@/components/SorteiosSection'
import ProdutosSection from '@/components/ProdutosSection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <VerificadosSection />
        <EncartesSection />
        <SorteiosSection />
        <ProdutosSection />
      </main>
      <SiteFooter />
    </div>
  )
}
