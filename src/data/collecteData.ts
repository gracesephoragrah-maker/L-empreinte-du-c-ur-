export type NeedCategory = 'vetements' | 'vivres' | 'livres' | 'jouets' | 'fonds';

export interface NeedCategoryInfo {
  id: NeedCategory;
  title: string;
  subtitle: string;
  accentColor: string;
  surfaceTint: string;
}

export interface DonationOptionItem {
  id: string;
  label: string;
  detail?: string;
}

export const COLLECTE_INFO = {
  organization: "L'Empreinte du Cœur",
  tagline: "L'amour qui inspire, la compassion qui transforme.",
  pillars: ['Aider', 'Soutenir', 'Partager', 'Espérer'],
  eventTitle: 'Grande Collecte Solidaire',
  leadQuote:
    'Parce que chaque vie est précieuse aux yeux de Dieu, partageons Son amour avec ceux qui en ont besoin.',
  slogan: 'Une main tendue change une vie.',
  verse: "« N'aimons pas en paroles et avec la langue, mais en actions et avec vérité. »",
  verseRef: '1 Jean 3:18',
  locationCity: 'Grand-Lahou',
  locationStreet: 'Rue Princesse',
  schedules: [
    {day: 'Samedi 26 décembre 2026', hours: '11h à 16h'},
    {day: 'Dimanche 27 décembre 2026', hours: '10h à 16h'},
  ],
  jekoUrl: 'https://pay.jeko.africa/pl/fcf749f0-279d-4176-b1be-4b149dc75575',
  whatsappNumber: '2250720019428',
  defaultWhatsAppMessage: "Bonjour, puis-je avoir des informations sur l'événement",
  volunteerWhatsAppMessage:
    "Bonjour L'Empreinte du Cœur, je souhaite devenir bénévole pour aider lors de la Grande Collecte Solidaire à Grand-Lahou.",
  phones: [
    {display: '+225 07 20 01 94 28', href: 'tel:+2250720019428'},
    {display: '+225 05 02 91 39 15', href: 'tel:+2250502913915'},
  ],
  assets: {
    logo: `${import.meta.env.BASE_URL}assets/aistudio/logo_166b8566.png`,
    hands: `${import.meta.env.BASE_URL}assets/aistudio/hands_88094938.jpg`,
  },
} as const;

export const NEED_CATEGORIES: NeedCategoryInfo[] = [
  {
    id: 'vetements',
    title: 'Vêtements',
    subtitle: 'Habits, chaussures, sacs et linge pour tous les âges',
    accentColor: '#1E7A34',
    surfaceTint: '#EFF7F0',
  },
  {
    id: 'vivres',
    title: 'Vivres & matériel',
    subtitle: 'Denrées non périssables, produits d’hygiène et ustensiles',
    accentColor: '#D98A00',
    surfaceTint: '#FDF6E7',
  },
  {
    id: 'livres',
    title: 'Livres & fournitures',
    subtitle: 'Manuels scolaires, romans jeunesse, cahiers et crayons',
    accentColor: '#3B1A12',
    surfaceTint: '#F6F1EA',
  },
  {
    id: 'jouets',
    title: 'Jeux & jouets',
    subtitle: 'Jeux éducatifs, poupées, ballons et matériel créatif',
    accentColor: '#D93030',
    surfaceTint: '#FDF0F0',
  },
  {
    id: 'fonds',
    title: 'Fonds',
    subtitle: 'Soutien financier pour acquérir des biens essentiels sur place',
    accentColor: '#1E78D2',
    surfaceTint: '#EFF5FB',
  },
];

export const CLOTHES_AUDIENCES: DonationOptionItem[] = [
  {id: 'aud-bebes', label: 'Bébés (0–2 ans)'},
  {id: 'aud-enfants', label: 'Enfants (3–12 ans)'},
  {id: 'aud-ados', label: 'Adolescents et jeunes (13–25 ans)'},
  {id: 'aud-adultes', label: 'Adultes'},
];

export const CLOTHES_ITEMS: DonationOptionItem[] = [
  {id: 'clo-habits', label: 'Habits', detail: 'T-shirts, robes, pantalons, pagnes, chemises'},
  {id: 'clo-chaussures', label: 'Chaussures', detail: 'Sandales, baskets et paires en bon état'},
  {id: 'clo-sacs', label: 'Sacs', detail: 'Sacs à dos, sacs scolaires ou sacs de voyage'},
  {id: 'clo-draps', label: 'Draps et linge de maison', detail: 'Serviettes, couvertures et taies propres'},
];

export const BOOKS_ITEMS: DonationOptionItem[] = [
  {id: 'boo-toutpetits', label: 'Livres pour tout-petits', detail: 'Albums illustrés et imagiers'},
  {id: 'boo-scolaires', label: 'Livres scolaires', detail: 'Manuels primaires et secondaires'},
  {id: 'boo-romans', label: 'Lecture et romans jeunesse', detail: 'Contes, BD et récits'},
  {id: 'boo-educatifs', label: 'Livres éducatifs', detail: 'Dictionnaires et cahiers d’exercices'},
  {id: 'boo-cahiers', label: 'Cahiers et fournitures', detail: 'Stylos, trousses, règles, ardoises'},
  {id: 'boo-dessin', label: 'Dessin et coloriage', detail: 'Crayons de couleur, feutres, feuilles'},
];

export const BOOKS_AGE_RANGES = [
  'Non précisé',
  '0–5 ans',
  '6–10 ans',
  '11–15 ans',
  '16 ans et plus',
  'Tous âges',
] as const;

export const TOYS_ITEMS: DonationOptionItem[] = [
  {id: 'toy-educatifs', label: 'Jeux éducatifs', detail: 'Éveil, lettres, chiffres et logique'},
  {id: 'toy-societe', label: 'Jeux de société et puzzles', detail: 'Jeux complets en bon état'},
  {id: 'toy-poupees', label: 'Jouets et poupées', detail: 'Peluches, figurines et petites voitures'},
  {id: 'toy-construction', label: 'Jeux de construction', detail: 'Briques et cubes d’assemblage'},
  {id: 'toy-ballons', label: 'Ballons et jeux sportifs', detail: 'Ballons de foot, cordes à sauter'},
  {id: 'toy-creatif', label: 'Matériel créatif', detail: 'Pâte à modeler, perles et bricolage'},
];

export const TOYS_AGE_RANGES = [
  'Non précisé',
  '0–2 ans',
  '3–5 ans',
  '6–9 ans',
  '10–13 ans',
  '14 ans et plus',
  'Tous âges',
] as const;

export const OTHER_ITEMS: DonationOptionItem[] = [
  {id: 'oth-vivres', label: 'Vivres non périssables', detail: 'Riz, huile, pâtes, conserves, lait, sucre'},
  {id: 'oth-hygiene', label: 'Produits d’hygiène', detail: 'Savons, brosses à dents, couches, serviettes'},
  {id: 'oth-ustensiles', label: 'Ustensiles et matériel de maison', detail: 'Assiettes, casseroles, bassines, bidons'},
  {id: 'oth-equipement', label: 'Matériel ou équipement', detail: 'Équipement utile aux familles ou bénévoles'},
  {id: 'oth-autre', label: 'Autre proposition', detail: 'Précisez votre idée de don ci-dessous'},
];

export const FUNDS_ITEMS: DonationOptionItem[] = [
  {
    id: 'fnd-alimentaire',
    label: 'Fonds pour achats alimentaires',
    detail: 'Pour acheter du riz, de l’huile et des denrées essentielles sur place',
  },
  {
    id: 'fnd-hygiene',
    label: 'Fonds pour kits d’hygiène et soins',
    detail: 'Savons, brosses à dents, couches et produits de première nécessité',
  },
  {
    id: 'fnd-scolaire',
    label: 'Fonds pour fournitures scolaires',
    detail: 'Cahiers, stylos, sacs et manuels pour les enfants',
  },
  {
    id: 'fnd-libre',
    label: 'Fonds libre (selon les priorités)',
    detail: 'Contribution financière via JEKO, Mobile Money ou remise à l’équipe',
  },
];

export function buildWhatsAppUrl(
  message: string = COLLECTE_INFO.defaultWhatsAppMessage
): string {
  const base = `https://wa.me/${COLLECTE_INFO.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
