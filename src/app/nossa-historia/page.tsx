import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import NossaHistoriaSection from '@/components/NossaHistoriaSection'

export default function NossaHistoriaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <NossaHistoriaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
