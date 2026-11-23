import {useState} from 'react';
import {Phone, MapPin, MessageCircle, Share2, Check} from 'lucide-react';
import {COLLECTE_INFO, buildWhatsAppUrl} from '../data/collecteData';

export function Footer() {
  const [shareFeedback, setShareFeedback] = useState<'idle' | 'copied' | 'shared'>('idle');

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${COLLECTE_INFO.organization} — ${COLLECTE_INFO.eventTitle}`;
    const shareText = `Rejoignez la Grande Collecte Solidaire les 26 et 27 décembre 2026 à ${COLLECTE_INFO.locationCity}, ${COLLECTE_INFO.locationStreet}.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareFeedback('shared');
        window.setTimeout(() => setShareFeedback('idle'), 3000);
        return;
      }
    } catch {
      // L'utilisateur a annulé ou le partage natif n'est pas disponible : on copie le lien.
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareFeedback('copied');
        window.setTimeout(() => setShareFeedback('idle'), 3000);
      }
    } catch {
      // Clipboard indisponible : pas d'erreur bloquante.
    }
  };

  return (
    <footer id="contacts">
      <div className="bg-[#1E6B30] text-[#FFF6D8] py-12 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="font-display font-bold text-2xl sm:text-3xl text-white">
              {COLLECTE_INFO.slogan}
            </p>
            <p className="mt-3 font-display italic text-base sm:text-lg text-[#F3E6B5] leading-relaxed max-w-lg">
              {COLLECTE_INFO.verse} {COLLECTE_INFO.verseRef}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-[#F4C623] text-[#2B1A00] text-sm font-extrabold whitespace-nowrap hover:bg-[#E2AC0B] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Écrire sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full border border-[#F3E6B5]/45 bg-[#14451F]/60 text-white text-sm font-bold whitespace-nowrap hover:bg-[#14451F] transition-colors cursor-pointer"
              >
                {shareFeedback === 'idle' ? (
                  <>
                    <Share2 className="w-4 h-4 text-[#F4C623] shrink-0" aria-hidden="true" />
                    <span>Partager l'événement</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#F4C623] shrink-0" aria-hidden="true" />
                    <span>
                      {shareFeedback === 'copied' ? 'Lien copié !' : 'Merci du partage !'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="text-xs font-extrabold tracking-[0.14em] uppercase text-[#E2AC0B] mb-3">
              Informations et contacts
            </h3>
            <div className="space-y-2">
              {COLLECTE_INFO.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="inline-flex md:justify-end items-center gap-2.5 w-full font-bold text-xl sm:text-2xl text-white hover:text-[#F4C623] transition-colors tabular-nums"
                >
                  <Phone className="w-5 h-5 text-[#E2AC0B] shrink-0" aria-hidden="true" />
                  <span>{phone.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0F3B1A] text-[#E6D9A8] py-4 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <span className="font-semibold">
            {COLLECTE_INFO.organization} · {COLLECTE_INFO.tagline}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E2AC0B]" aria-hidden="true" />
            <span>
              {COLLECTE_INFO.locationCity}, {COLLECTE_INFO.locationStreet} · 26 &amp; 27 déc. 2026
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
