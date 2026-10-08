import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

/** Revision day: a handful of connector words, then a big test built from Days 1–6. */
const vocab = [
  v("mattu", "ಮತ್ತು", "Mattu", "And", "और", { pos: "particle", tags: ["grammar"],
    context: bi("In speech, 'mattu' is often dropped: 'kaafi, tea' or '-u ... -u' (kaafiu teau).", "बोलचाल में 'mattu' अक्सर छूट जाता है: 'kaafi, tea'।"),
    example: ex("ಕಾಫಿ ಮತ್ತು ಟೀ.", "Kaafi mattu tea.", "Coffee and tea.", "कॉफ़ी और चाय।") }),
  v("aadre", "ಆದ್ರೆ", "Aadre", "But", "लेकिन", { pos: "particle", tags: ["grammar"],
    example: ex("ಚೆನ್ನಾಗಿದೆ, ಆದ್ರೆ ದುಬಾರಿ.", "Chennagide, aadre dubaari.", "It's good, but expensive.", "अच्छा है, लेकिन महँगा।") }),
  v("eega", "ಈಗ", "Eega", "Now", "अभी", { pos: "adverb", tags: ["time"],
    example: ex("ಈಗ ಬನ್ನಿ.", "Eega banni.", "Come now.", "अभी आइए।") }),
  v("aamele", "ಆಮೇಲೆ", "Aamele", "Later / Afterwards", "बाद में", { pos: "adverb", tags: ["time"],
    example: ex("ಆಮೇಲೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ.", "Aamele call maadtini.", "I'll call later.", "बाद में कॉल करूँगा।") }),
  v("saaku", "ಸಾಕು", "Saaku", "Enough", "बस / काफ़ी", { pos: "expression", tags: ["basic", "food"],
    example: ex("ಸಾಕು, ಬೇಡ.", "Saaku, beda.", "Enough, no more.", "बस, और नहीं।") }),
  v("innu", "ಇನ್ನೂ", "Innu", "Still / More", "और / अभी भी", { pos: "adverb", tags: ["basic"],
    example: ex("ಇನ್ನೂ ಸ್ವಲ್ಪ ಕೊಡಿ.", "Innu swalpa kodi.", "Give a little more.", "थोड़ा और दीजिए।") }),
];

const sentences = [
  s("d7s1", "ಈಗ ಊಟ ಮಾಡಿ, ಆಮೇಲೆ ಹೋಗಿ.", "Eega oota maadi, aamele hogi.", "Eat now, go later.", "अभी खाना खाइए, बाद में जाइए।", {
    formality: "polite", words: ["Eega", "oota", "maadi,", "aamele", "hogi"], wordsKn: ["ಈಗ", "ಊಟ", "ಮಾಡಿ,", "ಆಮೇಲೆ", "ಹೋಗಿ"],
  }),
  s("d7s2", "ಕಾಫಿ ಚೆನ್ನಾಗಿದೆ, ಆದ್ರೆ ಸಕ್ಕರೆ ಜಾಸ್ತಿ.", "Kaafi chennagide, aadre sakkare jaasti.", "The coffee is good, but too much sugar.", "कॉफ़ी अच्छी है, लेकिन चीनी ज़्यादा है।", {
    words: ["Kaafi", "chennagide,", "aadre", "sakkare", "jaasti"], wordsKn: ["ಕಾಫಿ", "ಚೆನ್ನಾಗಿದೆ,", "ಆದ್ರೆ", "ಸಕ್ಕರೆ", "ಜಾಸ್ತಿ"],
  }),
  s("d7s3", "ಇನ್ನೂ ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ.", "Innu swalpa neeru kodi.", "Give a little more water.", "थोड़ा और पानी दीजिए।", {
    formality: "polite", words: ["Innu", "swalpa", "neeru", "kodi"], wordsKn: ["ಇನ್ನೂ", "ಸ್ವಲ್ಪ", "ನೀರು", "ಕೊಡಿ"],
  }),
  s("d7s4", "ಸಾಕು ಅಣ್ಣ, ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", "Saaku anna, ille nillisi.", "That's enough brother, stop right here.", "बस भैया, यहीं रोकिए।", {
    formality: "polite", words: ["Saaku", "anna,", "ille", "nillisi"], wordsKn: ["ಸಾಕು", "ಅಣ್ಣ,", "ಇಲ್ಲೇ", "ನಿಲ್ಲಿಸಿ"], tags: ["auto"],
  }),
];

export const day07: DayLesson = {
  day: 7, week: 1, type: "revision", emoji: "🏆", minutes: 25,
  title: bi("Week 1 revision", "हफ्ता 1 की दोहराई"),
  subtitle: bi("No new concepts. One big test over Days 1–6.", "कोई नया concept नहीं। Days 1–6 पर एक बड़ा टेस्ट।"),
  vocab, sentences,
  plan: ["warmup", "words", "learn", "listen", "build", "translate", "speak", "conversation", "boss", "result"],
  emphasis: { warmup: 2, listen: 2, build: 1.5, translate: 2 },
  concept: {
    title: bi("What you can already do", "आप अभी क्या-क्या कर सकते हैं"),
    intro: bi(
      "Six days in, you can greet, introduce yourself, count, name your family, order food and direct an auto. That's real survival Kannada.",
      "छह दिन में आप अभिवादन, परिचय, गिनती, परिवार, खाना ऑर्डर और ऑटो को रास्ता बता सकते हैं। यही असली survival कन्नड़ है।",
    ),
    sections: [
      {
        heading: bi("The three patterns of Week 1", "हफ्ता 1 के तीन पैटर्न"),
        body: bi(
          "1. Nanage ___ beku / beda — I want / don't want.\n2. ___ ellide? — Where is ___?\n3. [number] ___ kodi — Give me [number] ___.\nIf you can produce these three on demand, Week 1 is done.",
          "1. Nanage ___ beku / beda — मुझे ___ चाहिए / नहीं चाहिए।\n2. ___ ellide? — ___ कहाँ है?\n3. [संख्या] ___ kodi — [संख्या] ___ दीजिए।\nअगर ये तीनों तुरंत बोल सकते हो, हफ्ता 1 पूरा।",
        ),
      },
      {
        heading: bi("Polite endings recap", "विनम्र अंत की दोहराई"),
        body: bi("banni, hogi, kodi, nillisi, tirugi, heli, maadi, kaayiri — all polite. You'll hear the casual forms (baa, hogu, kodu) from friends; reply politely until you're sure.", "banni, hogi, kodi, nillisi, tirugi, heli, maadi, kaayiri — सब विनम्र। दोस्तों से casual रूप (baa, hogu, kodu) सुनोगे; पक्का होने तक विनम्र ही जवाब दो।"),
      },
      {
        heading: bi("Two tiny connectors", "दो छोटे जोड़ने वाले शब्द"),
        body: bi("mattu (and), aadre (but). And two time words: eega (now), aamele (later). They turn two short sentences into one natural one.", "mattu (और), aadre (लेकिन)। और दो समय शब्द: eega (अभी), aamele (बाद में)। ये दो छोटे वाक्यों को एक स्वाभाविक वाक्य बना देते हैं।"),
      },
    ],
    tip: bi("Revision beats new words. Every word you review today becomes permanent.", "दोहराई नए शब्दों से बेहतर है। आज दोहराया हर शब्द पक्का हो जाता है।"),
  },
  conversation: {
    id: "d7c1",
    title: bi("A full morning in Kannada", "कन्नड़ में पूरी सुबह"),
    setting: bi("Neighbour, then a darshini, then an auto.", "पड़ोसी, फिर दर्शिनी, फिर ऑटो।"),
    speakers: { A: "Them", B: "You" },
    lines: [
      line("A", "ನಮಸ್ಕಾರ! ಊಟ ಆಯ್ತಾ?", "Namaskara! Oota aaytaa?", "Hello! Have you eaten?", "नमस्ते! खाना खाया?"),
      line("B", "ಇನ್ನೂ ಇಲ್ಲ. ಈಗ ಹೋಗ್ತಾ ಇದ್ದೀನಿ.", "Innu illa. Eega hogta iddini.", "Not yet. Going now.", "अभी नहीं। अभी जा रहा हूँ।"),
      line("A", "ಏನು ಬೇಕು?", "Enu beku?", "What would you like?", "क्या चाहिए?"),
      line("B", "ಎರಡು ಇಡ್ಲಿ ಮತ್ತು ಒಂದು ಕಾಫಿ ಕೊಡಿ.", "Eradu idli mattu ondu kaafi kodi.", "Two idlis and one coffee, please.", "दो इडली और एक कॉफ़ी दीजिए।"),
      line("A", "ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು?", "Ellige hogbeku?", "Where to?", "कहाँ जाना है?"),
      line("B", "ಮೆಟ್ರೋ ಸ್ಟೇಷನ್. ಎಷ್ಟು ಆಗುತ್ತೆ?", "Metro station. Eshtu aagutte?", "Metro station. How much will it be?", "मेट्रो स्टेशन। कितना होगा?"),
      line("A", "ಅರವತ್ತು.", "Aravattu.", "Sixty.", "साठ।"),
      line("B", "ಸರಿ, ಬನ್ನಿ.", "Sari, banni.", "Okay, let's go.", "ठीक है, चलिए।"),
    ],
    prompts: [
      {
        afterLine: 2,
        question: bi("Order two idlis and one coffee:", "दो इडली और एक कॉफ़ी ऑर्डर करें:"),
        options: [
          { kn: "ಎರಡು ಇಡ್ಲಿ ಮತ್ತು ಒಂದು ಕಾಫಿ ಕೊಡಿ.", roman: "Eradu idli mattu ondu kaafi kodi.", en: "Two idlis and one coffee please.", correct: true },
          { kn: "ಒಂದು ಇಡ್ಲಿ ಮತ್ತು ಎರಡು ಕಾಫಿ ಕೊಡಿ.", roman: "Ondu idli mattu eradu kaafi kodi.", en: "One idli and two coffees please.", correct: false, feedback: bi("Numbers swapped: eradu = 2, ondu = 1.", "संख्याएँ उलट गईं: eradu = 2, ondu = 1।") },
          { kn: "ಇಡ್ಲಿ ಬೇಡ, ಕಾಫಿ ಬೇಡ.", roman: "Idli beda, kaafi beda.", en: "No idli, no coffee.", correct: false },
        ],
      },
      {
        afterLine: 6,
        question: bi("Sixty is fair. Accept and get in:", "साठ ठीक है। मानकर बैठ जाएँ:"),
        options: [
          { kn: "ಸರಿ, ಬನ್ನಿ.", roman: "Sari, banni.", en: "Okay, let's go.", correct: true },
          { kn: "ಅರವತ್ತು ಜಾಸ್ತಿ.", roman: "Aravattu jaasti.", en: "Sixty is too much.", correct: false, feedback: bi("You could bargain, but 60 to the metro is fair — take it!", "मोल-भाव कर सकते हैं, पर मेट्रो तक 60 ठीक है — मान लें!") },
          { kn: "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", roman: "Illi nillisi.", en: "Stop here.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d7boss", type: "typein", skill: "grammar",
    prompt: bi("Type in Kannada (roman): 'Where is the bus stop? Is it far?'", "कन्नड़ में टाइप करें (रोमन): 'बस स्टॉप कहाँ है? दूर है?'"),
    answer: "Bus stop ellide? Doora ideya?",
    acceptable: ["Bus stop ellide doora ideya", "Bus stop ellide? Doora ide?", "Bus nildaana ellide? Doora ideya?", "Bus stop ellide, doora ideya"],
    explanation: bi("ellide = where is it; doora ideya = is it far (ide + -ya makes a yes/no question).", "ellide = कहाँ है; doora ideya = दूर है क्या (ide + -ya से हाँ/नहीं वाला सवाल बनता है)।"),
  },
  dailyPhrase: {
    kn: "ಸಾಕು", roman: "Saaku",
    meaning: bi("Enough / That's enough (food, bargaining, anything)", "बस / काफ़ी है (खाना, मोल-भाव, कुछ भी)"),
    example: ex("ಇನ್ನೂ ಅನ್ನ ಬೇಕಾ? — ಸಾಕು, ಸಾಕು!", "Innu anna beka? — Saaku, saaku!", "More rice? — Enough, enough!", "और चावल? — बस, बस!"),
    mini: [
      line("A", "ಇನ್ನೂ ಸ್ವಲ್ಪ?", "Innu swalpa?", "A little more?", "थोड़ा और?"),
      line("B", "ಸಾಕು, ಧನ್ಯವಾದ.", "Saaku, dhanyavaada.", "Enough, thank you.", "बस, धन्यवाद।"),
    ],
  },
};
