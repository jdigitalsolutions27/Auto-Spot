import type { Metadata } from "next";
import Link from "next/link";

import { GalleryLightbox } from "@/components/gallery-lightbox";
import { PageHero } from "@/components/page-hero";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Reviews & Results",
  description: "Customer reviews and before/after gallery results from AUTO SPOT service and detailing sessions.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Reviews & Real Outcomes"
        description="See trusted customer feedback and visual before/after work samples."
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <Tabs defaultValue="reviews" className="space-y-6">
            <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
              <TabsTrigger value="reviews" className="border border-white/15 bg-slate-900/70 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="gallery" className="border border-white/15 bg-slate-900/70 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
                Before/After
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              <ReviewsCarousel />
            </TabsContent>
            <TabsContent value="gallery">
              <GalleryLightbox />
            </TabsContent>
          </Tabs>

          <div className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-6">
            <h2 className="text-2xl font-semibold text-amber-100">Ready for your own before/after result?</h2>
            <p className="mt-2 text-sm text-amber-50/90">Book your service today and receive a reference number with progress tracking.</p>
            <div className="mt-4">
              <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                <Link href="/booking">Book Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

