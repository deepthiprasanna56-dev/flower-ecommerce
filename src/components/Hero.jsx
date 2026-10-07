import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import FlowerCanvas3D from './FlowerCanvas3D';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#141C15] text-[#FAF8F5]">
      {/* Background Glows & Vignette */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C49B5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-[#8B2635]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141C15] via-transparent to-[#141C15]" />
      </div>

      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-16 md:pt-16 md:pb-20">
        
        {/* Main Grid: Left Copy & Right 3D Botanical */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left Editorial Copy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
            
            {/* Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 backdrop-blur-md mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#E0D7C9] font-medium">
                Real-Time 3D Botanical Atelier · Autumn / Winter 2026
              </span>
            </div>

            {/* Grand Headline with refined serif */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#FAF8F5] leading-[1.08] mb-6">
              A midnight bloom, <br />
              <span className="italic font-normal text-[#E2C799]">sculpted in real 3D.</span>
            </h1>

            {/* Narrative Description */}
            <p className="text-[#CCC4B4] text-xs sm:text-sm md:text-base max-w-xl font-light leading-relaxed mb-8 tracking-wide">
              Meet Lycoris radiata: the rare red spider lily, sculpted as an interactive 3D botanical specimen. Turn the bloom in the light, open its fine silken petals, and discover a dramatic centerpiece made for unforgettable gestures.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
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

            {/* Quick Interactive Instructions */}
            <div className="flex items-center gap-3 text-[11px] text-[#A8AFA3]">
              <span className="w-2 h-2 rounded-full bg-[#52B766] animate-ping" />
              <span>Rotate, inspect & bloom the real-time 3D flower with your mouse or touch.</span>
            </div>

          </div>

          {/* Right Column: 3D Interactive WebGL Flower (5 Cols) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            
            {/* Outer Luxury Halo Frame */}
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#212C22]/80 to-[#161F17]/90 border border-[#D4AF37]/25 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              <div className="absolute top-4 left-5 z-20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0D7C9] font-medium">
                  Lycoris radiata · 01
                </span>
              </div>

              {/* 3D Canvas */}
              <FlowerCanvas3D />
            </div>

          </div>

        </div>

        {/* Heritage Trust Badges */}
        <div className="mt-14 pt-8 border-t border-[#FAF8F5]/15 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 w-full text-left">
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
