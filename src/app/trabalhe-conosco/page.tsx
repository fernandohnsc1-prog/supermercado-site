import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import TrabalheConoscoSection from '@/components/TrabalheConoscoSection'

export default function TrabalheConoscoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <TrabalheConoscoSection />
      </main>
      <SiteFooter />
    </div>
  )
}
