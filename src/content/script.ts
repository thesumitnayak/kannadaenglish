import type { ScriptLetter } from "./types";

const L = (id: string, kn: string, roman: string, group: ScriptLetter["group"], exKn: string, exRoman: string, exEn: string): ScriptLetter =>
  ({ id, kn, roman, group, example: { kn: exKn, roman: exRoman, en: exEn } });

/** Kannada aksharas, ordered for gradual introduction. */
export const SCRIPT: ScriptLetter[] = [
  L("a", "ಅ", "a", "vowel", "ಅಮ್ಮ", "amma", "mother"),
  L("aa", "ಆ", "aa", "vowel", "ಆಟೋ", "aato", "auto"),
  L("i", "ಇ", "i", "vowel", "ಇಲ್ಲಿ", "illi", "here"),
  L("ii", "ಈ", "ee", "vowel", "ಈಗ", "eega", "now"),
  L("u", "ಉ", "u", "vowel", "ಉಪ್ಪು", "uppu", "salt"),
  L("uu", "ಊ", "oo", "vowel", "ಊಟ", "oota", "meal"),
  L("e", "ಎ", "e", "vowel", "ಎಡ", "eda", "left"),
  L("ee", "ಏ", "ē", "vowel", "ಏನು", "enu", "what"),
  L("o", "ಒ", "o", "vowel", "ಒಂದು", "ondu", "one"),
  L("oo", "ಓ", "ō", "vowel", "ಓದು", "odu", "read"),
  L("ai", "ಐ", "ai", "vowel", "ಐದು", "aidu", "five"),
  L("au", "ಔ", "au", "vowel", "ಔಷಧಿ", "aushadhi", "medicine"),
  L("ka", "ಕ", "ka", "consonant", "ಕಾಫಿ", "kaafi", "coffee"),
  L("ga", "ಗ", "ga", "consonant", "ಗಂಟೆ", "ghante", "hour"),
  L("cha", "ಚ", "cha", "consonant", "ಚಟ್ನಿ", "chutney", "chutney"),
  L("ja", "ಜ", "ja", "consonant", "ಜನ", "jana", "people"),
  L("ta", "ತ", "ta", "consonant", "ತಮ್ಮ", "thamma", "younger brother"),
  L("da", "ದ", "da", "consonant", "ದಿನ", "dina", "day"),
  L("na", "ನ", "na", "consonant", "ನೀರು", "neeru", "water"),
  L("pa", "ಪ", "pa", "consonant", "ಪಕ್ಕ", "pakka", "beside"),
  L("ba", "ಬ", "ba", "consonant", "ಬಸ್", "bus", "bus"),
  L("ma", "ಮ", "ma", "consonant", "ಮನೆ", "mane", "house"),
  L("ya", "ಯ", "ya", "consonant", "ಯಾರು", "yaaru", "who"),
  L("ra", "ರ", "ra", "consonant", "ರಸ್ತೆ", "raste", "road"),
  L("la", "ಲ", "la", "consonant", "ಲೇಟ್", "late", "late"),
  L("va", "ವ", "va", "consonant", "ವಾರ", "vaara", "week"),
  L("sa", "ಸ", "sa", "consonant", "ಸರಿ", "sari", "okay"),
  L("ha", "ಹ", "ha", "consonant", "ಹಾಲು", "haalu", "milk"),
  L("kha", "ಖ", "kha", "consonant", "ಖಾರ", "khaara", "spicy"),
  L("gha", "ಘ", "gha", "consonant", "ಘಂಟೆ", "ghante", "bell"),
  L("chha", "ಛ", "chha", "consonant", "ಛತ್ರಿ", "chhatri", "umbrella"),
  L("jha", "ಝ", "jha", "consonant", "ಝರಿ", "jhari", "stream"),
  L("tta", "ಟ", "ṭa", "consonant", "ಟೀ", "tea", "tea"),
  L("dda", "ಡ", "ḍa", "consonant", "ಡಬ್ಬಿ", "dabbi", "box"),
  L("nna", "ಣ", "ṇa", "consonant", "ಅಣ್ಣ", "anna", "elder brother"),
  L("pha", "ಫ", "pha", "consonant", "ಫೋನ್", "phone", "phone"),
  L("tha", "ಥ", "tha", "consonant", "ಕಥೆ", "kathe", "story"),
  L("dha", "ಧ", "dha", "consonant", "ಧನ್ಯವಾದ", "dhanyavaada", "thank you"),
  L("bha", "ಭ", "bha", "consonant", "ಭೇಟಿ", "bheti", "meeting"),
  L("sha", "ಶ", "sha", "consonant", "ಶನಿವಾರ", "shanivaara", "Saturday"),
  L("ssa", "ಷ", "ṣa", "consonant", "ಎಷ್ಟು", "eshtu", "how much"),
  L("lla", "ಳ", "ḷa", "consonant", "ಏಳು", "elu", "seven"),
  L("ru", "ಋ", "ru", "vowel", "ಋಷಿ", "rushi", "sage"),
  L("am", "ಅಂ", "am", "vowel", "ಅಂಗಡಿ", "angadi", "shop"),
  L("ri", "ರಿ", "ri", "matra", "ರಿಕ್ಷಾ", "riksha", "rickshaw"),
  L("ah", "ಅಃ", "ah", "vowel", "ಬಹುಶಃ", "bahushah", "maybe"),
  L("nga", "ಙ", "ṅa", "consonant", "ಙ", "nga", "(rare)"),
  L("nya", "ಞ", "ña", "consonant", "ಜ್ಞಾನ", "jnaana", "knowledge"),
];

/** Vowel signs (matras) shown on ಕ. */
export const MATRAS = [
  { kn: "ಕ", roman: "ka" }, { kn: "ಕಾ", roman: "kaa" }, { kn: "ಕಿ", roman: "ki" }, { kn: "ಕೀ", roman: "kee" },
  { kn: "ಕು", roman: "ku" }, { kn: "ಕೂ", roman: "koo" }, { kn: "ಕೆ", roman: "ke" }, { kn: "ಕೇ", roman: "kē" },
  { kn: "ಕೈ", roman: "kai" }, { kn: "ಕೊ", roman: "ko" }, { kn: "ಕೋ", roman: "kō" }, { kn: "ಕೌ", roman: "kau" },
  { kn: "ಕಂ", roman: "kam" }, { kn: "ಕ್", roman: "k (no vowel)" },
];
