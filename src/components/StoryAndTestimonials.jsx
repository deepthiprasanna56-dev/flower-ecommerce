import { clientReviews } from '../data/products';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StoryAndTestimonials() {
  return (
    <div className="bg-[#FAF8F5]">
      
      {/* Maison Story Editorial Section */}
      <section id="story" className="py-20 md:py-28 border-b border-[#E8E1D5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Left (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl bg-[#EBE5DB]">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85"
                  alt="Artisan Master Florist at Work"
                  className="w-full h-full object-cover object-center filter saturate-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Artisan Seal */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-white/90 backdrop-blur-md border border-white/40 text-[#21281F]">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8D6B3E] mb-1">
                    Couture Atelier
                  </p>
                  <p className="font-serif-luxury text-base italic">
                    “We don't merely arrange flowers; we choreograph nature's finest sentiments.”
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[#797F72] mt-1.5">
                    Hélène De La Tour · Master Floral Directrice
                  </p>
                </div>
              </div>

              {/* Decorative Accent Frame */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 border border-[#C49B5C]/40 -z-10 rounded-sm" />
            </div>

            {/* Editorial Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8D6B3E] block">
                The Maison Philosophy
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1E261D] font-light leading-tight">
                Slow Floristry, <br />
                <span className="italic">Uncompromising Elegance.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5C6357] font-light leading-relaxed">
                Founded with a conviction that ordinary floristry had grown hurried and plastic, Maison Fleur returns to the golden era of botanical craft. We collaborate exclusively with multi-generational growers across volcanic highlands and misty French valleys.
              </p>

              <p className="text-xs sm:text-sm text-[#5C6357] font-light leading-relaxed">
                Every stem is inspected for stem diameter, petal density, and aromatic vibrancy before it ever meets our arranging tables. Our signature wrapping utilizes FSC-certified Japanese washi parchment, natural water hydration pods, and authentic sealing wax.
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
                <div className="border-l-2 border-[#8D6B3E] pl-4">
                  <h4 className="font-serif-luxury text-xl text-[#222920] mb-1">Zero Waste</h4>
                  <p className="text-[11px] text-[#71776B] font-light">
                    100% compostable stems and recyclable silk ribbons.
                  </p>
                </div>

                <div className="border-l-2 border-[#8D6B3E] pl-4">
                  <h4 className="font-serif-luxury text-xl text-[#222920] mb-1">Direct Flight</h4>
                  <p className="text-[11px] text-[#71776B] font-light">
                    Flowers reach your door within 24 hours of harvest.
                  </p>
                </div>

                <div className="border-l-2 border-[#8D6B3E] pl-4">
                  <h4 className="font-serif-luxury text-xl text-[#222920] mb-1">Bespoke Notes</h4>
                  <p className="text-[11px] text-[#71776B] font-light">
                    Calligraphy inscribed by hand with custom wax insignia.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Patron Voices / Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-[#F5F1EA] border-b border-[#E5DFD4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8D6B3E] block mb-2">
              Privileged Patron Testimonials
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#1E261D] font-light">
              Kind Words From <span className="italic">Our Circle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF8F5] p-8 rounded-sm border border-[#E3DBD0] shadow-sm flex flex-col justify-between hover:border-[#C49B5C] transition-colors relative"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#C49B5C]/30 mb-4 stroke-1" />
                  <div className="flex text-[#C49B5C] gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C49B5C] stroke-none" />
                    ))}
                  </div>
                  <p className="font-serif-luxury text-base text-[#20271E] leading-relaxed italic mb-6">
                    “{rev.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE5DB] flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-xs text-[#20261E]">{rev.author}</h5>
                    <p className="text-[10px] text-[#7B8274]">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#406847] bg-[#E8EFE8] px-2 py-0.5 rounded font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
