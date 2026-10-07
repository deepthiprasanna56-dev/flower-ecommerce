import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#161E17] text-[#FAF8F5]">
      {/* High-Resolution Hero Visual with subtle luxury gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=2000&q=88"
          alt="Haute Luxury Botanical Blooms"
          className="w-full h-full object-cover object-center scale-105 animate-float opacity-40 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141B15] via-[#141B15]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141B15] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-28 md:pt-32 md:pb-36 flex flex-col items-start justify-center min-h-[82vh]">
        
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E0D7C9] font-medium">
            Autumn / Winter Botanical Haute Collection
          </span>
        </div>

        {/* Grand Headline with refined serif */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-[#FAF8F5] leading-[1.08] max-w-3xl mb-7">
          Botanical poetry, <br />
          <span className="italic font-normal text-[#E2C799]">sculpted for eternity.</span>
        </h1>

        {/* Narrative Description */}
        <p className="text-[#CCC4B4] text-sm sm:text-base max-w-xl font-light leading-relaxed mb-10 tracking-wide">
          Handcrafted by master florists using stems flown directly from heritage gardens in Ecuador, Grasse, and Kyoto. Wrapped in pure archival silk and sealed with warm wax.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <a
            href="#shop"
            className="inline-flex items-center justify-center gap-3 bg-[#C49B5C] hover:bg-[#B38747] text-[#141B15] font-semibold px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#C49B5C]/20"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#collections"
            className="inline-flex items-center justify-center gap-2 border border-[#FAF8F5]/30 hover:border-[#FAF8F5] text-[#FAF8F5] px-7 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 hover:bg-white/5"
          >
            <span>View Lookbook</span>
          </a>
        </div>

        {/* Heritage Trust Badges */}
        <div className="mt-16 pt-10 border-t border-[#FAF8F5]/15 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 w-full text-left">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#C49B5C] shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]">White-Glove Delivery</p>
              <p className="text-[11px] text-[#A69F91]">Chilled temperature transit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C49B5C] shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]">Hand-Tied Couture</p>
              <p className="text-[11px] text-[#A69F91]">Artisan bespoke arrangements</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C49B5C] shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]">7-Day Bloom Guarantee</p>
              <p className="text-[11px] text-[#A69F91]">Direct farm-to-vase vitality</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-5 h-5 text-[#C49B5C] shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]">Ethical Botanicals</p>
              <p className="text-[11px] text-[#A69F91]">Rainforest Alliance certified</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
