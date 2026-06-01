import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroSection from '@/components/HeroSection'
import EncartesSection from '@/components/EncartesSection'
import SorteiosSection from '@/components/SorteiosSection'
import ProdutosSection from '@/components/ProdutosSection'
import VerifiedBanner from '@/components/VerifiedBanner'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <VerifiedBanner />
        <EncartesSection />
        <SorteiosSection />
        <ProdutosSection />
      </main>
      <SiteFooter />
    </div>
  )
}
