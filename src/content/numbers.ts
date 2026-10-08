/** Kannada numbers 1–100 (+1000), generated with correct sandhi for compounds. */
export interface KnNumber { n: number; kn: string; roman: string }

const units: { kn: string; roman: string; knSuffix: string; romanSuffix: string }[] = [
  { kn: "", roman: "", knSuffix: "", romanSuffix: "" },
  { kn: "ಒಂದು", roman: "Ondu", knSuffix: "ೊಂದು", romanSuffix: "ondu" },
  { kn: "ಎರಡು", roman: "Eradu", knSuffix: "ೆರಡು", romanSuffix: "eradu" },
  { kn: "ಮೂರು", roman: "Mooru", knSuffix: "ಮೂರು", romanSuffix: "amooru" },
  { kn: "ನಾಲ್ಕು", roman: "Naalku", knSuffix: "ನಾಲ್ಕು", romanSuffix: "anaalku" },
  { kn: "ಐದು", roman: "Aidu", knSuffix: "ೈದು", romanSuffix: "aidu" },
  { kn: "ಆರು", roman: "Aaru", knSuffix: "ಾರು", romanSuffix: "aaru" },
  { kn: "ಏಳು", roman: "Elu", knSuffix: "ೇಳು", romanSuffix: "elu" },
  { kn: "ಎಂಟು", roman: "Entu", knSuffix: "ೆಂಟು", romanSuffix: "entu" },
  { kn: "ಒಂಬತ್ತು", roman: "Ombattu", knSuffix: "ೊಂಬತ್ತು", romanSuffix: "ombattu" },
];

const teens: { kn: string; roman: string }[] = [
  { kn: "ಹತ್ತು", roman: "Hattu" },
  { kn: "ಹನ್ನೊಂದು", roman: "Hannondu" },
  { kn: "ಹನ್ನೆರಡು", roman: "Hanneradu" },
  { kn: "ಹದಿಮೂರು", roman: "Hadimooru" },
  { kn: "ಹದಿನಾಲ್ಕು", roman: "Hadinaalku" },
  { kn: "ಹದಿನೈದು", roman: "Hadinaidu" },
  { kn: "ಹದಿನಾರು", roman: "Hadinaaru" },
  { kn: "ಹದಿನೇಳು", roman: "Hadinelu" },
  { kn: "ಹದಿನೆಂಟು", roman: "Hadinentu" },
  { kn: "ಹತ್ತೊಂಬತ್ತು", roman: "Hattombattu" },
];

const tens: { kn: string; roman: string; knStem: string; romanStem: string }[] = [
  { kn: "", roman: "", knStem: "", romanStem: "" },
  { kn: "", roman: "", knStem: "", romanStem: "" },
  { kn: "ಇಪ್ಪತ್ತು", roman: "Ippattu", knStem: "ಇಪ್ಪತ್ತ", romanStem: "Ippatt" },
  { kn: "ಮೂವತ್ತು", roman: "Moovattu", knStem: "ಮೂವತ್ತ", romanStem: "Moovatt" },
  { kn: "ನಲವತ್ತು", roman: "Nalavattu", knStem: "ನಲವತ್ತ", romanStem: "Nalavatt" },
  { kn: "ಐವತ್ತು", roman: "Aivattu", knStem: "ಐವತ್ತ", romanStem: "Aivatt" },
  { kn: "ಅರವತ್ತು", roman: "Aravattu", knStem: "ಅರವತ್ತ", romanStem: "Aravatt" },
  { kn: "ಎಪ್ಪತ್ತು", roman: "Eppattu", knStem: "ಎಪ್ಪತ್ತ", romanStem: "Eppatt" },
  { kn: "ಎಂಬತ್ತು", roman: "Embattu", knStem: "ಎಂಬತ್ತ", romanStem: "Embatt" },
  { kn: "ತೊಂಬತ್ತು", roman: "Tombattu", knStem: "ತೊಂಬತ್ತ", romanStem: "Tombatt" },
];

export function kannadaNumber(n: number): KnNumber {
  if (n === 0) return { n, kn: "ಸೊನ್ನೆ", roman: "Sonne" };
  if (n === 100) return { n, kn: "ನೂರು", roman: "Nooru" };
  if (n === 1000) return { n, kn: "ಸಾವಿರ", roman: "Saavira" };
  if (n >= 1 && n <= 9) return { n, kn: units[n].kn, roman: units[n].roman };
  if (n >= 10 && n <= 19) return { n, kn: teens[n - 10].kn, roman: teens[n - 10].roman };
  if (n >= 20 && n <= 99) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return { n, kn: tens[t].kn, roman: tens[t].roman };
    return { n, kn: tens[t].knStem + units[u].knSuffix, roman: tens[t].romanStem + units[u].romanSuffix };
  }
  return { n, kn: String(n), roman: String(n) };
}

export const NUMBERS_1_100: KnNumber[] = Array.from({ length: 100 }, (_, i) => kannadaNumber(i + 1));
