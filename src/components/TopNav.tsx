import {COLLECTE_INFO} from '../data/collecteData';

const NAV_LINKS = [
  {href: '#accueil', label: 'La collecte'},
  {href: '#participer', label: 'Participer'},
  {href: '#don', label: 'Don en ligne'},
  {href: '#besoins', label: 'Liste des besoins'},
  {href: '#contacts', label: 'Contacts'},
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF4]/95 backdrop-blur-sm border-b border-[rgba(217,164,6,0.35)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#accueil"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#3B1A12] whitespace-nowrap shrink-0 hover:text-[#1E6B30] transition-colors"
        >
          {COLLECTE_INFO.organization}
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C4B38]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#1E6B30] hover:underline underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href="#don"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1E6B30] text-[#FFFDF4] text-sm font-bold whitespace-nowrap shrink-0 hover:bg-[#14451F] transition-colors"
          >
            Faire un don
          </a>
        </div>
      </div>
    </header>
  );
}
