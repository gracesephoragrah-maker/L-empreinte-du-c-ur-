import {Calendar, MapPin, MessageCircle, ArrowRight} from 'lucide-react';
import {COLLECTE_INFO, buildWhatsAppUrl} from '../data/collecteData';
import {ResilientImage} from './ResilientImage';
import {CountdownTimer} from './CountdownTimer';

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden hero-surface border-b border-[rgba(217,164,6,0.35)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Identity, Headline, Lead, Operational Schedule & Location */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-[0_14px_40px_rgba(120,70,20,0.2)] ring-[6px] ring-[#F4C623]/60 shrink-0">
                <ResilientImage
                  src={COLLECTE_INFO.assets.logo}
                  alt="Logo L'Empreinte du Cœur : l'amour qui inspire, la compassion qui transforme"
                  className="w-full h-full object-contain rounded-full"
                  width={112}
                  height={112}
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold tracking-wide text-[#1E6B30]">
                  {COLLECTE_INFO.pillars.join(' · ')}
                </p>
                <p className="mt-1 font-display italic text-sm sm:text-base text-[#5C4B38]">
                  {COLLECTE_INFO.tagline}
                </p>
              </div>
            </div>

            <h1 className="font-display font-bold text-[#3B1A12] text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.08] tracking-tight text-balance">
              Grande Collecte{' '}
              <span className="inline-block text-[#1E6B30] underline decoration-[#E2AC0B] decoration-4 underline-offset-8">
                Solidaire
              </span>
            </h1>

            <p className="mt-6 max-w-xl font-display italic font-medium text-xl sm:text-2xl leading-snug text-[#3B1A12]">
              {COLLECTE_INFO.leadQuote}
            </p>

            {/* Operational Facts: Dates & Location */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-6 border-t border-[rgba(217,164,6,0.5)]">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#14451F] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="text-sm leading-relaxed text-[#2B2118]">
                  {COLLECTE_INFO.schedules.map((item) => (
                    <p key={item.day}>
                      <strong className="font-extrabold text-[#1E6B30]">{item.day}</strong>
                      <span className="block text-[#5C4B38] tabular-nums">{item.hours}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#14451F] mt-0.5 shrink-0" aria-hidden="true" />
                <div className="text-sm leading-relaxed text-[#2B2118]">
                  <strong className="font-extrabold text-[#1E6B30] block">
                    {COLLECTE_INFO.locationCity}
                  </strong>
                  <span className="text-[#5C4B38]">{COLLECTE_INFO.locationStreet}</span>
                </div>
              </div>
            </div>

            <CountdownTimer />

            {/* Primary CTA & Secondary Link */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#don"
                className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full bg-[#F4C623] text-[#2B1A00] text-base font-extrabold whitespace-nowrap hover:bg-[#E2AC0B] transition-colors shadow-sm"
              >
                <span>Faire un don</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#0F7A40] text-white text-sm font-extrabold whitespace-nowrap hover:bg-[#0B6132] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Écrire sur WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right column: Full-height visual anchor with hands & heart photo */}
          <div className="lg:col-span-5 flex flex-col">
            <figure className="flex-1 flex flex-col justify-between bg-white rounded-2xl p-3 border border-[rgba(217,164,6,0.5)] shadow-[0_12px_32px_rgba(90,60,10,0.08)]">
              <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-0 rounded-xl overflow-hidden bg-[#F5EFE0]">
                <ResilientImage
                  src={COLLECTE_INFO.assets.hands}
                  alt="Deux mains qui se tendent autour d'un cœur rouge"
                  className="w-full h-full object-cover"
                  width={409}
                  height={642}
                />
              </div>
              <figcaption className="pt-3 px-2 pb-1 flex items-center justify-between gap-4 text-xs text-[#5C4B38]">
                <span className="font-display italic text-sm text-[#3B1A12]">
                  « {COLLECTE_INFO.slogan} »
                </span>
                <span className="font-semibold whitespace-nowrap shrink-0">
                  {COLLECTE_INFO.verseRef}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
