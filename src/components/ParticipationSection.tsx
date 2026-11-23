import {MessageCircle, Heart, Users} from 'lucide-react';
import {COLLECTE_INFO, buildWhatsAppUrl} from '../data/collecteData';

export function ParticipationSection() {
  return (
    <section id="participer" aria-label="Comment participer" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#1E6B30] mb-2">
            Comment participer
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#3B1A12] text-balance">
            Deux façons simples de tendre la main
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="flex flex-col items-start gap-4 p-7 bg-white border border-[rgba(217,164,6,0.5)] rounded-[22px] shadow-[0_10px_30px_rgba(90,60,10,0.08)]">
            <div
              className="w-14 h-14 rounded-full bg-[#0F7A40] text-white flex items-center justify-center"
              aria-hidden="true"
            >
              <MessageCircle className="w-7 h-7" />
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-[1.75rem] text-[#3B1A12]">
              Parler avec nous
            </h3>

            <p className="text-[#5C4B38] leading-relaxed">
              Une question, un don en vêtements, livres, vivres ou jouets, ou l'envie de donner un coup de main sur place ? Écrivez-nous directement.
            </p>

            <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-12 px-6 py-3 rounded-full bg-[#0F7A40] text-white text-sm sm:text-base font-extrabold whitespace-nowrap hover:bg-[#0B6132] transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Écrire sur WhatsApp</span>
              </a>

              <a
                href={buildWhatsAppUrl(COLLECTE_INFO.volunteerWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 rounded-full border-2 border-[#1E6B30] text-[#1E6B30] text-sm font-extrabold whitespace-nowrap hover:bg-[#EFF7F0] transition-colors"
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Devenir bénévole</span>
              </a>
            </div>
          </article>

          <article className="flex flex-col items-start gap-4 p-7 bg-white border border-[rgba(217,164,6,0.5)] rounded-[22px] shadow-[0_10px_30px_rgba(90,60,10,0.08)]">
            <div
              className="w-14 h-14 rounded-full bg-[#D93030] text-white flex items-center justify-center"
              aria-hidden="true"
            >
              <Heart className="w-7 h-7" />
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-[1.75rem] text-[#3B1A12]">
              Faire un don
            </h3>

            <p className="text-[#5C4B38] leading-relaxed">
              Donnez depuis votre téléphone en quelques secondes avec le moyen de paiement que vous utilisez déjà, partout où vous êtes.
            </p>

            <div className="mt-auto pt-2">
              <a
                href="#don"
                className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full bg-[#F4C623] text-[#2B1A00] text-base font-extrabold whitespace-nowrap hover:bg-[#E2AC0B] transition-colors"
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
                <span>Donner maintenant</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
