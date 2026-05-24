import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import FaleConoscoSection from '@/components/FaleConoscoSection'

export default function FaleConoscoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <FaleConoscoSection />
      </main>
      <SiteFooter />
    </div>
  )
}
