import {useState, useMemo} from 'react';
import {
  Shirt,
  Utensils,
  BookOpen,
  Gamepad2,
  Coins,
  Check,
  MessageCircle,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import {
  COLLECTE_INFO,
  NEED_CATEGORIES,
  CLOTHES_AUDIENCES,
  CLOTHES_ITEMS,
  BOOKS_ITEMS,
  BOOKS_AGE_RANGES,
  TOYS_ITEMS,
  TOYS_AGE_RANGES,
  OTHER_ITEMS,
  FUNDS_ITEMS,
  NeedCategory,
  DonationOptionItem,
  buildWhatsAppUrl,
} from '../data/collecteData';

type FilterValue = 'all' | NeedCategory;
type DropoffPreference = 'Samedi 26 décembre' | 'Dimanche 27 décembre' | 'À convenir ensemble';

const CATEGORY_ICONS: Record<NeedCategory, typeof Shirt> = {
  vetements: Shirt,
  vivres: Utensils,
  livres: BookOpen,
  jouets: Gamepad2,
  fonds: Coins,
};

interface CheckboxChipProps {
  label: string;
  detail?: string;
  checked: boolean;
  onToggle: () => void;
}

function CheckboxRow({label, detail, checked, onToggle}: CheckboxChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
        checked
          ? 'bg-[#E3F4E6]/65 border-[#1E6B30]'
          : 'bg-[#FFFDF8] border-[#E8DDC5] hover:border-[#D8CBA9]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
          checked
            ? 'bg-[#1E6B30] border-[#1E6B30] text-white'
            : 'bg-white border-[#B9A782]'
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm font-bold text-[#231A14] leading-snug">{label}</strong>
        {detail && <span className="block mt-0.5 text-xs text-[#5C4B38]">{detail}</span>}
      </span>
    </button>
  );
}

export function NeedsChecklistSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const [selectedAudienceIds, setSelectedAudienceIds] = useState<string[]>([]);
  const [selectedClothesIds, setSelectedClothesIds] = useState<string[]>([]);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [booksAgeRange, setBooksAgeRange] = useState<string>('Non précisé');
  const [selectedToyIds, setSelectedToyIds] = useState<string[]>([]);
  const [toysAgeRange, setToysAgeRange] = useState<string>('Non précisé');
  const [selectedOtherIds, setSelectedOtherIds] = useState<string[]>([]);
  const [selectedFundIds, setSelectedFundIds] = useState<string[]>([]);

  const [dropoffDay, setDropoffDay] = useState<DropoffPreference>('Samedi 26 décembre');
  const [customNote, setCustomNote] = useState('');

  const toggleInList = (
    id: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const resolveLabels = (ids: string[], source: DonationOptionItem[]) =>
    source.filter((item) => ids.includes(item.id)).map((item) => item.label);

  const selectedAudiences = useMemo(
    () => resolveLabels(selectedAudienceIds, CLOTHES_AUDIENCES),
    [selectedAudienceIds]
  );
  const selectedClothes = useMemo(
    () => resolveLabels(selectedClothesIds, CLOTHES_ITEMS),
    [selectedClothesIds]
  );
  const selectedBooks = useMemo(
    () => resolveLabels(selectedBookIds, BOOKS_ITEMS),
    [selectedBookIds]
  );
  const selectedToys = useMemo(
    () => resolveLabels(selectedToyIds, TOYS_ITEMS),
    [selectedToyIds]
  );
  const selectedOthers = useMemo(
    () => resolveLabels(selectedOtherIds, OTHER_ITEMS),
    [selectedOtherIds]
  );
  const selectedFunds = useMemo(
    () => resolveLabels(selectedFundIds, FUNDS_ITEMS),
    [selectedFundIds]
  );

  const totalSelectedCount =
    selectedClothes.length +
    selectedBooks.length +
    selectedToys.length +
    selectedOthers.length +
    selectedFunds.length +
    (selectedClothes.length === 0 ? selectedAudiences.length : 0);

  const hasAnyContent =
    totalSelectedCount > 0 ||
    selectedAudiences.length > 0 ||
    customNote.trim().length > 0;

  const resetSelection = () => {
    setSelectedAudienceIds([]);
    setSelectedClothesIds([]);
    setSelectedBookIds([]);
    setBooksAgeRange('Non précisé');
    setSelectedToyIds([]);
    setToysAgeRange('Non précisé');
    setSelectedOtherIds([]);
    setSelectedFundIds([]);
    setCustomNote('');
  };

  const whatsappListUrl = useMemo(() => {
    const lines: string[] = [
      "Bonjour L'Empreinte du Cœur, je souhaite participer à la Grande Collecte Solidaire avec les dons suivants :",
      '',
    ];

    if (selectedClothes.length > 0 || selectedAudiences.length > 0) {
      lines.push('Vêtements et accessoires :');
      if (selectedAudiences.length > 0) {
        lines.push(`- Pour qui : ${selectedAudiences.join(', ')}`);
      }
      if (selectedClothes.length > 0) {
        lines.push(`- Articles : ${selectedClothes.join(', ')}`);
      }
      lines.push('');
    }

    if (selectedOthers.length > 0) {
      lines.push('Vivres, hygiène et matériel :');
      lines.push(`- Éléments : ${selectedOthers.join(', ')}`);
      lines.push('');
    }

    if (selectedBooks.length > 0) {
      lines.push('Livres et fournitures :');
      lines.push(`- Articles : ${selectedBooks.join(', ')}`);
      if (booksAgeRange !== 'Non précisé') {
        lines.push(`- Tranche d’âge : ${booksAgeRange}`);
      }
      lines.push('');
    }

    if (selectedToys.length > 0) {
      lines.push('Jeux et jouets :');
      lines.push(`- Articles : ${selectedToys.join(', ')}`);
      if (toysAgeRange !== 'Non précisé') {
        lines.push(`- Pour quel âge : ${toysAgeRange}`);
      }
      lines.push('');
    }

    if (selectedFunds.length > 0) {
      lines.push('Fonds (dons financiers) :');
      lines.push(`- Soutien : ${selectedFunds.join(', ')}`);
      lines.push('');
    }

    if (customNote.trim()) {
      lines.push(`Précision / proposition : ${customNote.trim()}`);
      lines.push('');
    }

    lines.push(`Disponibilité / dépôt souhaité : ${dropoffDay}`);
    return buildWhatsAppUrl(lines.join('\n'));
  }, [
    selectedAudiences,
    selectedClothes,
    selectedOthers,
    selectedBooks,
    booksAgeRange,
    selectedToys,
    toysAgeRange,
    selectedFunds,
    customNote,
    dropoffDay,
  ]);

  const showGroup = (group: NeedCategory) =>
    activeFilter === 'all' || activeFilter === group;

  return (
    <section
      id="besoins"
      className="py-14 sm:py-20 bg-[#FFFAF0] border-t border-[rgba(217,164,6,0.3)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#1E6B30] mb-2">
            Nous avons besoin de
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#3B1A12] text-balance">
            Cinq façons d'aider et liste des besoins
          </h2>
          <p className="mt-3 text-[#5C4B38] leading-relaxed">
            Vêtements, vivres et matériel, livres et fournitures scolaires, jeux et jouets ou fonds : cochez ce que vous souhaitez offrir pour préparer votre message en un clic.
          </p>
        </div>

        {/* 5 Ways to Help Summary Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {NEED_CATEGORIES.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isActive = activeFilter === category.id;
            const isLastOddMobile = index === NEED_CATEGORIES.length - 1;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setActiveFilter((prev) => (prev === category.id ? 'all' : category.id))
                }
                aria-pressed={isActive}
                className={`flex flex-col items-center text-center gap-3 p-5 rounded-[20px] border transition-all cursor-pointer ${
                  isLastOddMobile ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isActive
                    ? 'bg-[#FFFDF4] border-[#1E6B30] shadow-sm ring-2 ring-[#1E6B30]/20'
                    : 'bg-white border-[rgba(217,164,6,0.5)] hover:border-[#E2AC0B]'
                }`}
              >
                <div
                  className="w-15 h-15 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{backgroundColor: category.accentColor}}
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <strong className="block font-display text-lg sm:text-xl font-bold text-[#3B1A12]">
                    {category.title}
                  </strong>
                  <span className="mt-1 block text-xs text-[#5C4B38] leading-snug">
                    {category.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Structured Donation List */}
        <div className="mt-10 bg-white border border-[rgba(217,164,6,0.5)] rounded-3xl p-6 sm:p-8 shadow-[0_12px_34px_rgba(90,60,10,0.08)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(217,164,6,0.35)]">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#3B1A12]">
                Préparer ma liste de dons
              </h3>
              <p className="text-sm text-[#5C4B38] mt-1">
                Sélectionnez les articles ou les fonds que vous pouvez offrir afin de coordonner votre geste avec l'équipe à Grand-Lahou, Rue Princesse.
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              role="group"
              aria-label="Filtrer par catégorie de besoins"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FFF6DA] rounded-xl shrink-0 border border-[rgba(217,164,6,0.3)]"
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white text-[#1E6B30] shadow-sm'
                    : 'text-[#5C4B38] hover:text-[#2B2118]'
                }`}
              >
                Tout voir
              </button>
              {NEED_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeFilter === cat.id
                      ? 'bg-white text-[#1E6B30] shadow-sm'
                      : 'text-[#5C4B38] hover:text-[#2B2118]'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Group 1: Vêtements et accessoires */}
            {showGroup('vetements') && (
              <fieldset className="rounded-2xl border border-[#E8DDC5] bg-[#FFFDF8] p-5 sm:p-6">
                <legend className="px-2 font-display font-bold text-lg sm:text-xl text-[#3B1A12] flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-[#1E7A34]" aria-hidden="true" />
                  <span>Vêtements et accessoires</span>
                </legend>

                <div className="mt-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#1E6B30] mb-2.5">
                    Pour qui ?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CLOTHES_AUDIENCES.map((aud) => {
                      const active = selectedAudienceIds.includes(aud.id);
                      return (
                        <button
                          key={aud.id}
                          type="button"
                          role="checkbox"
                          aria-checked={active}
                          onClick={() => toggleInList(aud.id, setSelectedAudienceIds)}
                          className={`inline-flex items-center gap-2 min-h-10 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1E6B30] border-[#1E6B30] text-white'
                              : 'bg-white border-[#D8CBA9] text-[#3B1A12] hover:border-[#1E6B30]'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
                          <span>{aud.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#1E6B30] mb-2.5">
                    Quels articles ?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CLOTHES_ITEMS.map((item) => (
                      <CheckboxRow
                        key={item.id}
                        label={item.label}
                        detail={item.detail}
                        checked={selectedClothesIds.includes(item.id)}
                        onToggle={() => toggleInList(item.id, setSelectedClothesIds)}
                      />
                    ))}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Group 2: Vivres, hygiène et matériel */}
            {showGroup('vivres') && (
              <fieldset className="rounded-2xl border border-[#E8DDC5] bg-[#FFFDF8] p-5 sm:p-6">
                <legend className="px-2 font-display font-bold text-lg sm:text-xl text-[#3B1A12] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#D98A00]" aria-hidden="true" />
                  <span>Vivres, hygiène et matériel</span>
                </legend>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {OTHER_ITEMS.map((item) => (
                    <CheckboxRow
                      key={item.id}
                      label={item.label}
                      detail={item.detail}
                      checked={selectedOtherIds.includes(item.id)}
                      onToggle={() => toggleInList(item.id, setSelectedOtherIds)}
                    />
                  ))}
                </div>
              </fieldset>
            )}

            {/* Group 3: Livres et fournitures */}
            {showGroup('livres') && (
              <fieldset className="rounded-2xl border border-[#E8DDC5] bg-[#FFFDF8] p-5 sm:p-6">
                <legend className="px-2 font-display font-bold text-lg sm:text-xl text-[#3B1A12] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#3B1A12]" aria-hidden="true" />
                  <span>Livres et fournitures</span>
                </legend>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {BOOKS_ITEMS.map((item) => (
                    <CheckboxRow
                      key={item.id}
                      label={item.label}
                      detail={item.detail}
                      checked={selectedBookIds.includes(item.id)}
                      onToggle={() => toggleInList(item.id, setSelectedBookIds)}
                    />
                  ))}
                </div>

                <div className="mt-4 max-w-xs">
                  <label
                    htmlFor="books-age-range"
                    className="block text-xs font-extrabold uppercase tracking-[0.08em] text-[#3B1A12] mb-1.5"
                  >
                    Tranche d’âge concernée
                  </label>
                  <select
                    id="books-age-range"
                    value={booksAgeRange}
                    onChange={(e) => setBooksAgeRange(e.target.value)}
                    className="w-full min-h-11 px-3.5 rounded-xl border border-[#CDBB93] bg-white text-sm font-semibold text-[#231A14] focus:outline-none focus:border-[#1E6B30]"
                  >
                    {BOOKS_AGE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range === 'Non précisé' ? 'Choisir si vous le savez (optionnel)' : range}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            )}

            {/* Group 4: Jeux et jouets */}
            {showGroup('jouets') && (
              <fieldset className="rounded-2xl border border-[#E8DDC5] bg-[#FFFDF8] p-5 sm:p-6">
                <legend className="px-2 font-display font-bold text-lg sm:text-xl text-[#3B1A12] flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-[#D93030]" aria-hidden="true" />
                  <span>Jeux et jouets</span>
                </legend>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TOYS_ITEMS.map((item) => (
                    <CheckboxRow
                      key={item.id}
                      label={item.label}
                      detail={item.detail}
                      checked={selectedToyIds.includes(item.id)}
                      onToggle={() => toggleInList(item.id, setSelectedToyIds)}
                    />
                  ))}
                </div>

                <div className="mt-4 max-w-xs">
                  <label
                    htmlFor="toys-age-range"
                    className="block text-xs font-extrabold uppercase tracking-[0.08em] text-[#3B1A12] mb-1.5"
                  >
                    Pour quel âge ?
                  </label>
                  <select
                    id="toys-age-range"
                    value={toysAgeRange}
                    onChange={(e) => setToysAgeRange(e.target.value)}
                    className="w-full min-h-11 px-3.5 rounded-xl border border-[#CDBB93] bg-white text-sm font-semibold text-[#231A14] focus:outline-none focus:border-[#1E6B30]"
                  >
                    {TOYS_AGE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range === 'Non précisé' ? 'Choisir si vous le savez (optionnel)' : range}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            )}

            {/* Group 5: Fonds (dons financiers) */}
            {showGroup('fonds') && (
              <fieldset className="rounded-2xl border border-[#BDD6EF] bg-[#F5F9FE] p-5 sm:p-6">
                <legend className="px-2 font-display font-bold text-lg sm:text-xl text-[#3B1A12] flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#1E78D2]" aria-hidden="true" />
                  <span>Fonds (dons financiers)</span>
                </legend>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FUNDS_ITEMS.map((item) => (
                    <CheckboxRow
                      key={item.id}
                      label={item.label}
                      detail={item.detail}
                      checked={selectedFundIds.includes(item.id)}
                      onToggle={() => toggleInList(item.id, setSelectedFundIds)}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#BDD6EF]">
                  <p className="text-xs sm:text-sm text-[#3B1A12]">
                    Vous souhaitez régler immédiatement par Mobile Money ou carte ?
                  </p>
                  <a
                    href={COLLECTE_INFO.jekoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#1E78D2] text-white text-xs sm:text-sm font-extrabold whitespace-nowrap hover:bg-[#175EA6] transition-colors"
                  >
                    <span>Faire un don financier via JEKO</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </fieldset>
            )}
          </div>

          {/* Pledge Summary & WhatsApp Send Bar */}
          <div className="mt-8 pt-6 border-t border-[rgba(217,164,6,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
            <div className="lg:col-span-4">
              <label
                htmlFor="dropoff-day"
                className="block text-sm font-bold text-[#3B1A12] mb-1.5"
              >
                Jour souhaité pour le dépôt
              </label>
              <select
                id="dropoff-day"
                value={dropoffDay}
                onChange={(e) => setDropoffDay(e.target.value as DropoffPreference)}
                className="w-full min-h-12 px-3.5 rounded-xl border border-[#CDBB93] bg-[#FFFDF8] text-sm font-semibold text-[#231A14] focus:outline-none focus:border-[#1E6B30]"
              >
                <option value="Samedi 26 décembre">Samedi 26 décembre (11h – 16h)</option>
                <option value="Dimanche 27 décembre">Dimanche 27 décembre (10h – 16h)</option>
                <option value="À convenir ensemble">À convenir ensemble par message</option>
              </select>
            </div>

            <div className="lg:col-span-4">
              <label
                htmlFor="custom-note"
                className="block text-sm font-bold text-[#3B1A12] mb-1.5"
              >
                Précisez votre proposition (facultatif)
              </label>
              <input
                id="custom-note"
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ex. : montant, quantité, autre idée de don…"
                className="w-full min-h-12 px-3.5 rounded-xl border border-[#CDBB93] bg-[#FFFDF8] text-sm text-[#231A14] placeholder:text-[#8E7C64] focus:outline-none focus:border-[#1E6B30]"
              />
            </div>

            <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap items-center gap-3">
              {hasAnyContent && (
                <button
                  type="button"
                  onClick={resetSelection}
                  className="inline-flex items-center justify-center gap-1.5 min-h-12 px-4 py-2.5 rounded-full border border-[#CDBB93] text-sm font-bold text-[#5C4B38] hover:text-[#231A14] hover:bg-[#F5EFE0] transition-colors cursor-pointer shrink-0"
                  title="Réinitialiser la liste"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Effacer</span>
                </button>
              )}

              <a
                href={
                  hasAnyContent
                    ? whatsappListUrl
                    : buildWhatsAppUrl(
                        "Bonjour L'Empreinte du Cœur, je souhaite proposer un don pour la Grande Collecte Solidaire."
                      )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 rounded-full bg-[#0F7A40] text-white text-sm font-extrabold whitespace-nowrap hover:bg-[#0B6132] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">
                  {totalSelectedCount > 0
                    ? `Envoyer sur WhatsApp (${totalSelectedCount})`
                    : 'Proposer un don sur WhatsApp'}
                </span>
              </a>
            </div>
          </div>

          <p className="mt-6 pt-5 border-t border-[#E8DDC5] text-sm text-[#5C4B38] leading-relaxed">
            Chaque don compte et peut faire la différence dans la vie d'une personne. Faites votre choix parmi les articles proposés ou partagez librement votre idée de don. Ensemble, faisons de cette collecte un véritable élan de solidarité.
          </p>
        </div>
      </div>
    </section>
  );
}
