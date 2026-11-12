import { Banner } from "@/components/banner"
import { Footer } from "@/components/footer"
import { Features } from "@/components/features"

export default function Page() {
  return (
    <div className="relative">
      <Banner />
      <Features />
      <Footer />
    </div>
  )
}
