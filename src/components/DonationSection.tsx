import {useState} from 'react';
import {ExternalLink, MessageCircle, ShieldCheck} from 'lucide-react';
import {COLLECTE_INFO, buildWhatsAppUrl} from '../data/collecteData';

export function DonationSection() {
  const [donorName, setDonorName] = useState('');
  const [openedJeko, setOpenedJeko] = useState(false);

  const trimmedName = donorName.trim();
  const confirmationText = trimmedName
    ? `Bonjour, je viens de faire un don pour la Grande Collecte Solidaire. Mon nom : ${trimmedName}`
    : 'Bonjour, je viens de faire un don pour la Grande Collecte Solidaire. Mon nom : ';

  const whatsappConfirmUrl = buildWhatsAppUrl(confirmationText);

  const steps = [
    {
      num: '01',
      text: 'Appuyez sur « Donner avec JEKO ».',
    },
    {
      num: '02',
      text: 'Sur la page de paiement sécurisée de JEKO, suivez les indications et validez sur votre téléphone.',
    },
    {
      num: '03',
      text: 'Une fois le don fait, écrivez-nous sur WhatsApp pour que nous puissions vous remercier.',
    },
  ];

  return (
    <section id="don" className="py-14 sm:py-20 bg-[#FFF6DA] border-y border-[rgba(217,164,6,0.4)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#1E6B30] mb-2">
              Don en ligne
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#3B1A12] text-balance">
              Un petit geste peut changer une grande vie
            </h2>
            <p className="mt-4 text-[#5C4B38] leading-relaxed max-w-xl">
              Chaque somme compte. Votre don aide à acheter des biens essentiels et à soutenir concrètement les familles de Grand-Lahou lors des journées de distribution.
            </p>

            <ol className="mt-8 space-y-5">
              {steps.map((step) => (
                <li key={step.num} className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-[#1E6B30] text-white text-sm font-extrabold flex items-center justify-center shrink-0 tabular-nums">
                    {step.num}
                  </span>
                  <span className="pt-1 text-[#2B2118] font-medium leading-relaxed">
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white border border-[rgba(217,164,6,0.5)] rounded-3xl p-6 sm:p-8 shadow-[0_14px_40px_rgba(90,60,10,0.12)]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h3 className="font-display font-bold text-2xl text-[#3B1A12]">
                  Donner en ligne
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6B30]">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Paiement JEKO</span>
                </span>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="donor-name"
                  className="block text-sm font-bold text-[#3B1A12] mb-1.5"
                >
                  Votre nom pour le message de confirmation (facultatif)
                </label>
                <input
                  id="donor-name"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Ex. Kouassi Jean"
                  autoComplete="name"
                  className="w-full min-h-12 px-4 rounded-xl border-2 border-[#CDBB93] bg-white text-[#2B2118] text-base placeholder:text-[#8E7C64] focus:outline-none focus:border-[#1E6B30]"
                />
              </div>

              <div className="grid gap-3">
                <a
                  href={COLLECTE_INFO.jekoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenedJeko(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 min-h-13 px-6 py-3.5 rounded-full bg-[#1E6B30] text-white text-base font-extrabold hover:bg-[#14451F] transition-colors"
                >
                  <span>Donner avec JEKO</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={whatsappConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 min-h-13 px-6 py-3.5 rounded-full bg-[#0F7A40] text-white text-base font-extrabold hover:bg-[#0B6132] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>J'ai donné : prévenir sur WhatsApp</span>
                </a>
              </div>

              {openedJeko && (
                <p
                  role="status"
                  className="mt-4 p-3.5 rounded-xl bg-[#E3F4E6] text-[#1E6B30] text-sm font-semibold"
                >
                  La page sécurisée JEKO a été ouverte dans un nouvel onglet. Une fois votre paiement validé, appuyez sur le bouton WhatsApp ci-dessus pour nous prévenir.
                </p>
              )}

              <p className="mt-4 text-center text-xs sm:text-sm text-[#5C4B38] leading-relaxed">
                Paiement sécurisé par JEKO. Vous quittez ce site pour la page de paiement, puis vous pouvez revenir ici.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
